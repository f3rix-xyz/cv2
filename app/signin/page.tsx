"use client";
import { signIn } from 'next-auth/react';
import { FC } from 'react';
import Image from 'next/image';
import googleLogo from '@/componets/images/google.png'; // Adjust the path if needed

const LoginPage: FC = () => {
    const handleSignIn = () => signIn('google', { callbackUrl: '/allPosts' });

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#B0E3E6]">
            {/* Background Shapes */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="absolute top-10 left-5 w-40 h-40 bg-[#FFD166] rounded-full shadow-shape"></div>
                <div className="absolute bottom-20 right-5 w-52 h-32 bg-[#06D6A0] shadow-shape rotate-12"></div>
                <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#EF476F] rounded-full shadow-shape"></div>
                <div className="absolute bottom-10 left-10 w-10 h-40 bg-[#118AB2] shadow-shape"></div>
            </div>
            {/* Black Checkered Background */}
            <div className="absolute inset-0 bg-checkered-pattern opacity-20 z-10"></div>
            {/* Main Login Card */}
            <div className="relative z-30 bg-[#F5A9B8] p-4 border-4 border-black grid grid-cols-2 gap-4 rounded-md max-w-lg w-full shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] transition-shadow duration-300">
                {/* Header */}
                <div className="col-span-2 bg-[#D8E2DC] border-4 border-black p-4">
                    <h1 className="text-3xl font-bold text-black text-center">SIGN IN WITH GOOGLE</h1>
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
                <div className="col-span-2 bg-[#F4D06F] border-4 border-black p-2">
                    <p className="text-black text-center font-medium">By signing in, you agree to our terms.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;