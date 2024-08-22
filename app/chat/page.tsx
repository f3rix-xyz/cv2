'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '../laoding';

interface ChatUser {
    id: string;
    name: string;
}

export default function ChatPage() {
    const { data: session } = useSession();
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const [userIdFrom, setUserIdFrom] = useState<string | null>(null);

    useEffect(() => {
        if (!session) {
            router.push('/signin');
            return;
        }

        async function fetchUserId() {
            if (session?.user?.email) {
                try {
                    const res = await fetch(`/api/user-id?email=${session.user.email}`);
                    const data = await res.json();
                    setUserIdFrom(data.id);
                    await fetchChatUsers(data.id);
                } catch (error) {
                    console.error("Error fetching user ID:", error);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchUserId();
    }, [session]);

    async function fetchChatUsers(userId: string) {
        try {
            const res = await fetch(`/api/chat-users?userId=${userId}`);
            const data = await res.json();
            setChatUsers(data);
        } catch (error) {
            console.error("Error fetching chat users:", error);
        }
    }

    return (
        <div className="min-h-screen bg-yellow-200 p-4 md:p-8 font-mono relative">
            {/* Checkered background */}
            <div className="absolute inset-0 bg-[linear-gradient(#00000010_1px,transparent_1px),linear-gradient(to_right,#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative">
                <h1 className="text-3xl md:text-4xl font-bold text-black bg-red-400 p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
                    Your Chats
                </h1>

                <div className="space-y-4">
                    {loading ? (
                        <Loading></Loading>
                    ) : (
                        chatUsers.map((user) => (
                            <Link
                                key={user.id}
                                href={`/message?userIdFrom=${userIdFrom}&userIdTo=${user.id}`}
                                className="block bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition"
                            >
                                {/* Improved text visibility */}
                                <span className="text-xl font-bold text-black">{user.name}</span>
                            </Link>
                        ))
                    )}
                </div>

                <Link
                    href="/hackathons"
                    className="mt-8 inline-block bg-green-400 text-black px-6 py-3 font-bold text-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
