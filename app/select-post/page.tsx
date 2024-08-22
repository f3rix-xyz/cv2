// pages/select-post.jsx
"use client";
import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Post } from '@/lib/db/schema';

export default function SelectPost() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const userIdFrom = searchParams.get('userIdFrom');
    const userIdTo = searchParams.get('userIdTo');

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/specefic-posts?userId=${userIdFrom}`);
            const data = await response.json();
            setPosts(data);
        };

        if (userIdFrom) {
            fetchPosts();
        }
    }, [userIdFrom]);

    const handleSelectPost = async () => {
        if (selectedPostId) {
            try {
                const response = await fetch('/api/acceptedUsers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        post_id: selectedPostId,
                        user_id: userIdTo,
                    }),
                });

                if (response.ok) {
                    router.push(`/chat?userIdTo=${userIdTo}`);
                } else {
                    console.error('Failed to add user as teammate');
                }
            } catch (error) {
                console.error('Error adding user as teammate:', error);
            }
        }
    };

    return (
        <div className="p-8 bg-yellow-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-black">Select a Post</h1>
            <div className="space-y-4">
                {posts!.map((post) => (
                    <div
                        key={post.id}
                        className={`p-4 border-4 border-black cursor-pointer ${selectedPostId === post.id ? 'bg-green-300' : 'bg-white'
                            }`}
                        onClick={() => setSelectedPostId(post.id)}
                    >
                        <h2 className="text-2xl font-bold">{post.competitionName}</h2>
                        <p>{post.message}</p>
                    </div>
                ))}
            </div>
            <button
                className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold text-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                onClick={handleSelectPost}
                disabled={!selectedPostId}
            >
                Confirm Selection
            </button>
        </div>
    );
}