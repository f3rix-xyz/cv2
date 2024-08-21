"use client";
import { useSession } from 'next-auth/react';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface FormData {
    message: string;
    competitionName: string;
    competitionLink: string;
    date: string;
    type: 'hackathon' | 'case comp';
}

const AddPostPage: FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

    useEffect(() => {
        const checkUserInfo = async () => {
            if (status === 'loading') return; // Wait until loading is complete

            if (!session) {
                router.push('/signin');
                return;
            }

            try {
                const response = await fetch(`/api/user-info?email=${session?.user?.email}`);
                const data = await response.json();
                if (!data.linkedin || !data.about) {
                    router.push('/update-info');
                }
            } catch (error) {
                console.error('An error occurred while fetching user info:', error);
            }
        };

        checkUserInfo();
    }, [status, router]);

    const validateDate = (date: string) => {
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate > today || "Date must be in the future";
    };

    const onSubmit = async (formData: FormData) => {
        try {
            const response = await fetch(`/api/user-id?email=${session?.user?.email}`);
            const data = await response.json();

            if (response.ok) {
                const userId = data.id;

                const postResponse = await fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        user_id: userId,
                    }),
                });

                if (postResponse.ok) {
                    router.push('/hackathons'); // Redirect to home page after successful post
                } else {
                    console.error('Failed to create post');
                }
            } else {
                console.error('Failed to fetch user ID:', data.error);
            }
        } catch (error) {
            console.error('An error occurred while fetching the user ID:', error);
        }
    };

    const handleBack = () => {
        router.push('/hackathons'); // Go back to the previous page
    };

    return (
        <div className="min-h-screen bg-yellow-200 p-4 md:p-8 font-mono relative overflow-hidden">
            {/* Checkered background */}
            <div className="absolute inset-0 bg-[linear-gradient(#00000010_1px,transparent_1px),linear-gradient(to_right,#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            {/* Decorative shapes */}
            <div className="hidden md:block absolute top-20 left-20 w-40 h-40 bg-blue-400 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 overflow-hidden">
                <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_12px)]"></div>
            </div>
            <div className="hidden md:block absolute bottom-20 right-10 w-60 h-60 bg-red-400 transform rotate-45 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 overflow-hidden">
                <div className="w-full h-full bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,#000_10px,#000_12px)]"></div>
            </div>
            <div className="hidden md:block absolute top-1/2 left-1/4 w-20 h-20 bg-green-400 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10"></div>

            {/* Back Button */}
            <button
                onClick={handleBack}
                className="absolute top-4 left-4 p-2 bg-[#FF6F61] border-4 border-black rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out z-30"
                style={{ zIndex: 100 }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <div className="max-w-3xl mx-auto relative z-20 mt-16">
                <h1 className="text-4xl font-bold text-black mb-8 bg-purple-400 p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    Add a New Post
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 space-y-6 relative">
                    {/* Zigzag pattern on top of the form */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(45deg,#FFD166,#FFD166_10px,#000_10px,#000_20px)]"></div>

                    {/* Form fields */}
                    <div>
                        <label className="block text-lg font-bold text-black mb-2" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            {...register('message', { required: 'Message is required' })}
                            className="w-full p-2 border-2 border-black text-black bg-white"
                            rows={4}
                        />
                        {errors.message && <p className="text-red-500 mt-1">{errors.message.message}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-bold text-black mb-2" htmlFor="competitionName">Competition Name</label>
                        <input
                            id="competitionName"
                            type="text"
                            {...register('competitionName', { required: 'Competition name is required' })}
                            className="w-full p-2 border-2 border-black text-black bg-white"
                        />
                        {errors.competitionName && <p className="text-red-500 mt-1">{errors.competitionName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-bold text-black mb-2" htmlFor="competitionLink">Competition Link</label>
                        <input
                            id="competitionLink"
                            type="url"
                            {...register('competitionLink', { required: 'Competition link is required' })}
                            className="w-full p-2 border-2 border-black text-black bg-white"
                        />
                        {errors.competitionLink && <p className="text-red-500 mt-1">{errors.competitionLink.message}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-bold text-black mb-2" htmlFor="date">Date</label>
                        <input
                            id="date"
                            type="date"
                            {...register('date', { required: 'Date is required', validate: validateDate })}
                            className="w-full p-2 border-2 border-black text-black bg-white"
                        />
                        {errors.date && <p className="text-red-500 mt-1">{errors.date.message}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-bold text-black mb-2" htmlFor="type">Type</label>
                        <select
                            id="type"
                            {...register('type', { required: 'Type is required' })}
                            className="w-full p-2 border-2 border-black text-black bg-white"
                        >
                            <option value="hackathon">Hackathon</option>
                            <option value="case comp">Case Competition</option>
                        </select>
                        {errors.type && <p className="text-red-500 mt-1">{errors.type.message}</p>}
                    </div>

                    {/* Submit button with decorative background */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-400 text-black font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        disabled={isSubmitting}
                    >
                        <span className="relative z-10">
                            {isSubmitting ? 'Submitting...' : 'Submit Post'}
                        </span>
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#00000020_10px,#00000020_20px)]"></div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPostPage;
