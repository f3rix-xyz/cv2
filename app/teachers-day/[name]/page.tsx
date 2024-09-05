'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';

const TeachersDayPage = () => {
    // Use the useParams hook to get the dynamic segment (teacher's name)
    const { name } = useParams();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl">
                <div className="p-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-blue-600 mb-4">Happy Teachers&apos; Day!</h1>
                        <Sparkles className="inline-block text-yellow-400 mb-4" size={48} />
                    </div>
                    <div className="space-y-6">
                        <p className="text-xl text-gray-700 text-center">
                            To our esteemed mentor and guide,
                        </p>
                        <h2 className="text-3xl font-semibold text-center text-purple-600">
                            {name ? `${name}` : 'Our Teacher'}
                        </h2>
                        <p className="text-lg text-gray-600 text-center">
                            you gave me a chance in my first year when I made the blunder, and it really means a lot to me.
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="italic text-gray-700 text-center">
                                &quot;A good teacher can inspire hope, ignite the imagination, and instill a love of learning.&quot;
                            </p>
                            <p className="text-right text-sm text-gray-500 mt-2">- Brad Henry</p>
                        </div>
                        <p className="text-lg text-gray-600 text-center">
                            Your impact goes beyond the classroom. You&apos;ve shaped our minds, our futures, and our hearts.
                            We are forever grateful for your guidance and support.
                        </p>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-xl font-semibold text-blue-600">Wishing you a day as special as you are!</p>
                        <p className="text-lg text-gray-600 mt-2">With utmost respect and admiration,</p>
                        <p className="text-lg font-medium text-purple-600">Your Students</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeachersDayPage;
