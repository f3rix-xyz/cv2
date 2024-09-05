'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-amber-50 text-stone-800 font-serif flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border border-stone-200">
                <h1 className="text-4xl font-bold mb-4 text-stone-900 text-center">Oops!</h1>
                <div className="mb-6 text-center">
                    <p className="text-xl mb-2">404 - Page Not Found</p>
                    <p className="text-stone-600">
                        The page you're looking for seems to have vanished into thin air!
                    </p>
                </div>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={reset}
                        className="px-4 py-2 bg-stone-200 text-stone-800 rounded-md hover:bg-stone-300 transition-colors text-center"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-amber-100 text-stone-800 rounded-md hover:bg-amber-200 transition-colors text-center"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
            <div className="mt-8 text-stone-500 text-sm text-center">
                <p>Error Code: {error.digest}</p>
            </div>
        </div>
    );
}