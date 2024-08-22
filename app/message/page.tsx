'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useSession } from 'next-auth/react';
import Loading from '../laoding';

interface Message {
    id: string;
    user_id_from: string;
    user_id_to: string;
    message: string;
}

export default function MessagePage() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true); // Added loading state
    const router = useRouter();
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    const userIdFrom = searchParams.get('userIdFrom');
    const userIdTo = searchParams.get('userIdTo');

    useEffect(() => {
        if (!session) {
            router.push('/signin');
            return;
        }

        if (!userIdFrom || !userIdTo) {
            return;
        }

        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/message?userIdFrom=${userIdFrom}&userIdTo=${userIdTo}`);
                const data = await response.json();
                setMessages(data);
                setLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
        const intervalId = setInterval(fetchMessages, 5000);

        return () => clearInterval(intervalId);
    }, [userIdFrom, userIdTo]);

    useEffect(() => {
        // Automatically scroll to the bottom when messages are updated
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || !userIdFrom || !userIdTo) {
            return;
        }

        try {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: newMessage,
                    userIdFrom,
                    userIdTo,
                }),
            });

            if (response.ok) {
                setNewMessage('');
                const updatedMessagesResponse = await fetch(`/api/message?userIdFrom=${userIdFrom}&userIdTo=${userIdTo}`);
                const updatedMessages = await updatedMessagesResponse.json();
                setMessages(updatedMessages);
            } else {
                console.error('Error sending message:', response.status);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="min-h-screen bg-yellow-200 p-4 md:p-8 font-mono relative">
            <div className="absolute inset-0 bg-[linear-gradient(#00000010_1px,transparent_1px),linear-gradient(to_right,#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative">
                <h1 className="text-3xl md:text-4xl font-bold text-black bg-red-400 p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    Chat
                </h1>

                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 mt-8 h-96 overflow-y-auto">
                    {loading ? ( // Show loading indicator while fetching messages
                        <Loading />
                    ) : (
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-4 border-2 border-black ${message.user_id_from === userIdFrom
                                        ? 'bg-green-200 text-black ml-auto'
                                        : 'bg-blue-200 text-black mr-auto'
                                        } max-w-fit md:max-w-xs`}
                                    style={{ wordBreak: 'break-word' }}
                                >
                                    <p>{message.message}</p>
                                </div>
                            ))}
                            {/* Scroll to bottom marker */}
                            <div ref={messageEndRef}></div>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <textarea
                        className="w-full bg-gray-200 border-2 border-black p-2 focus:outline-none"
                        rows={3}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                    ></textarea>
                    <button
                        className="mt-2 bg-green-400 text-black px-6 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
