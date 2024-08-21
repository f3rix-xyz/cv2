"use client";
import { signIn } from 'next-auth/react';
import { FC } from 'react';
import Image from 'next/image';
import googleLogo from '@/componets/images/google.png'; // Adjust the path if needed
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const LoginPage: FC = () => {
    const router = useRouter(); // Initialize useRouter

    const handleSignIn = () => signIn('google', { callbackUrl: '/addEvent' });

    const handleBack = () => {
        router.push('/hackathons'); // Navigate to 'allPosts' page
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#B0E3E6]">
            {/* Background Shapes */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="absolute top-20 left-5 w-40 h-40 bg-[#FFD166] rounded-full shadow-shape"></div>
                <div className="absolute bottom-20 right-5 w-52 h-32 bg-[#06D6A0] shadow-shape rotate-12"></div>
                <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#EF476F] rounded-full shadow-shape"></div>
                <div className="absolute bottom-10 left-10 w-10 h-40 bg-[#118AB2] shadow-shape"></div>
            </div>
            {/* Black Checkered Background */}
            <div className="absolute inset-0 bg-checkered-pattern opacity-20 z-10"></div>
            {/* Back Arrow */}
            <button
                onClick={handleBack}
                className="absolute top-4 left-4 p-2 bg-[#FFD166] border-4 border-black rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out z-30"
                style={{ zIndex: 100 }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
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
            {/* Main Login Card */}
            <div className="relative z-30 bg-[#F5A9B8] p-4 border-4 border-black grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md max-w-lg w-full mx-4 sm:mx-8 lg:mx-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] transition-shadow duration-300">
                {/* Header */}
                <div className="col-span-1 md:col-span-2 bg-[#D8E2DC] border-4 border-black p-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-black text-center">SIGN IN WITH GOOGLE</h1>
                </div>
                {/* Left section (pattern box) */}
                <div className="bg-[#FFDAC1] border-4 border-black p-4">
                    <p className="font-semibold text-center text-black">Welcome back!</p>
                </div>
                {/* Right section (pattern box) */}
                <div className="bg-[#FFB7B2] border-4 border-black p-4 flex items-center justify-center">
                    <button
                        onClick={handleSignIn}
                        className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    >
                        <Image src={googleLogo} alt="Google Logo" width={24} height={24} className="mr-3" />
                        <span className="text-sm font-medium text-black">Sign in with Google</span>
                    </button>
                </div>
                {/* Footer/Note */}
                <div className="col-span-1 md:col-span-2 bg-[#F4D06F] border-4 border-black p-2">
                    <p className="text-black text-center font-medium">By signing in, you agree to our terms.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
