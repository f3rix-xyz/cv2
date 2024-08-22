// components/TeammateSelectorPopup.tsx
import { Post } from '@/lib/db/schema';
import React, { useState, useEffect } from 'react';



interface TeammateSelectorPopupProps {
    userId: string;
    onClose: () => void;
    onSelect: (postId: string) => void;
}

export default function TeammateSelectorPopup({ userId, onClose, onSelect }: TeammateSelectorPopupProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    useEffect(() => {
        // Fetch user's posts
        const fetchPosts = async () => {
            const response = await fetch(`/api/posts?userId=${userId}`);
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, [userId]);

    const handleSelect = () => {
        if (selectedPostId) {
            onSelect(selectedPostId);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-bold mb-4">Select a Post</h2>
                <ul className="space-y-2 mb-4">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="post"
                                    value={post.id}
                                    checked={selectedPostId === post.id}
                                    onChange={() => setSelectedPostId(post.id!)}
                                    className="form-radio h-5 w-5 text-black"
                                />
                                <span>{post.competitionName}</span>
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        onClick={handleSelect}
                        disabled={!selectedPostId}
                    >
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
}