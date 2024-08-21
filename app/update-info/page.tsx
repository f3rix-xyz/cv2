"use client";
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface FormData {
    name: string;
    linkedin: string;
    about: string;
    contact?: string;
    github?: string;
}

const UpdateInfoPage: FC = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

    const onSubmit = async (formData: FormData) => {
        try {
            const response = await fetch('/api/update-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, email: session?.user?.email }),
            });

            if (response.ok) {
                router.push('/addEvent');
            } else {
                console.error('Failed to update info');
            }
        } catch (error) {
            console.error('An error occurred while updating info:', error);
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
            <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 overflow-hidden">
                <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_12px)]"></div>
            </div>
            <div className="absolute bottom-20 right-10 w-60 h-60 bg-red-400 transform rotate-45 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 overflow-hidden">
                <div className="w-full h-full bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,#000_10px,#000_12px)]"></div>
            </div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-green-400 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10"></div>

            {/* Back Arrow */}
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

            <div className="max-w-3xl mx-auto relative z-20 mt-20 md:mt-32">
                <h1 className="text-4xl font-bold text-black mb-8 bg-purple-400 p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    Update Your Information
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 space-y-6 relative">
                    {/* Zigzag pattern on top of the form */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(45deg,#FFD166,#FFD166_10px,#000_10px,#000_20px)]"></div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-black">Name</h2>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            placeholder="John Doe"
                            className="w-full p-2 border-2 border-black font-mono text-black"
                        />
                        {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-black">LinkedIn</h2>
                        <input
                            id="linkedin"
                            type="url"
                            {...register('linkedin', { required: 'LinkedIn URL is required' })}
                            placeholder="https://linkedin.com/in/your-profile"
                            className="w-full p-2 border-2 border-black font-mono text-black"
                        />
                        {errors.linkedin && <p className="text-red-500 mt-1">{errors.linkedin.message}</p>}
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-black">About</h2>
                        <textarea
                            id="about"
                            {...register('about', { required: 'About field is required' })}
                            placeholder="Describe your core values, motivations, and reasons for participating."
                            className="w-full p-2 border-2 border-black font-mono text-black"
                            rows={4}
                        />
                        {errors.about && <p className="text-red-500 mt-1">{errors.about.message}</p>}
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-black">Contact (Optional)</h2>
                        <input
                            id="contact"
                            type="text"
                            {...register('contact')}
                            placeholder="e.g., +1234567890"
                            className="w-full p-2 border-2 border-black font-mono text-black"
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-black">GitHub (Optional) (Recommended)</h2>
                        <input
                            id="github"
                            type="url"
                            {...register('github')}
                            placeholder="https://github.com/your-profile"
                            className="w-full p-2 border-2 border-black font-mono text-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-400 text-black font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        disabled={isSubmitting}
                    >
                        <span className="relative z-10">
                            {isSubmitting ? 'Submitting...' : 'Update Info'}
                        </span>
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#00000020_10px,#00000020_20px)]"></div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateInfoPage;
