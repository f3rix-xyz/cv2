"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, User } from '@/lib/db/schema';

export default function HomeClient({ allPosts }: { allPosts: { posts: Post; users: User | null }[] }) {
    const [filterType, setFilterType] = useState<'hackathon' | 'case comp' | 'all'>('all');
    const [filteredPosts, setFilteredPosts] = useState<{ posts: Post; users: User | null }[]>([]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

        // Filter posts based on the selected filterType and ensure the date is in the future
        const filtered = allPosts.filter(post => post.posts.date > today && (filterType === 'all' || post.posts.type === filterType));
        setFilteredPosts(filtered);
    }, [allPosts, filterType]);

    return (
        <main className="min-h-screen bg-yellow-200 p-4 md:p-8 font-mono relative">
            {/* Checkered background */}
            <div className="absolute inset-0 bg-[linear-gradient(#00000010_1px,transparent_1px),linear-gradient(to_right,#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-black bg-red-400 p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        Competitions Board
                    </h1>
                    <Link href="/addEvent" className="bg-green-400 text-black px-6 py-3 font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition">
                        Add Hackathon
                    </Link>
                </div>
                <div className="mb-8 flex space-x-4">
                    <button
                        className={`px-6 py-2 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${filterType === 'hackathon' ? 'bg-blue-400 text-black' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setFilterType('hackathon')}
                    >
                        Hackathons
                    </button>
                    <button
                        className={`px-6 py-2 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${filterType === 'case comp' ? 'bg-green-400 text-black' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setFilterType('case comp')}
                    >
                        Case Competitions
                    </button>
                    <button
                        className={`px-6 py-2 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${filterType === 'all' ? 'bg-gray-400 text-black' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setFilterType('all')}
                    >
                        All
                    </button>
                </div>
                <div className="space-y-8">
                    {filteredPosts.map((post) => (
                        <PostCard key={post.posts.id} post={post} />
                    ))}
                </div>
            </div>
        </main>
    );
}

function PostCard({ post }: { post: { posts: Post; users: User | null } }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 m-4 md:m-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 md:p-6">
                    <div className="bg-purple-400 p-4 border-4 border-black mb-4">
                        <h2 className="text-2xl font-bold text-black mb-2">{post.posts.competitionName}</h2>
                        <div className="flex justify-between items-center">
                            <span className="inline-block bg-yellow-300 text-black px-2 py-1 text-sm font-semibold border-2 border-black">
                                {post.posts.type}
                            </span>
                            <span className="text-sm font-bold">Starts: {post.posts.date}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Team Opportunity:</h3>
                        <p className="text-black">{post.posts.message}</p>
                    </div>
                    <Link
                        href={post.posts.competitionLink}
                        className="block w-full text-center bg-green-400 text-black py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition"
                    >
                        View Competition Details
                    </Link>
                </div>
                <div className="p-4 md:p-6 bg-blue-200 border-l-4 border-black">
                    {post.users && (
                        <>
                            <h3 className="font-bold text-black text-xl mb-4">{post.users.name}</h3>
                            <p className="text-black mb-4">
                                {isExpanded
                                    ? post.users.about
                                    : `${post.users.about.split(' ').slice(0, 30).join(' ')}...`}
                                {post.users.about.split(' ').length > 30 && (
                                    <button
                                        onClick={handleToggleExpand}
                                        className="ml-2 text-blue-500 hover:underline text-sm font-bold"
                                    >
                                        {isExpanded ? 'Show Less' : 'Read More'}
                                    </button>
                                )}
                            </p>
                            <div className="flex flex-col space-y-2">
                                {post.users.contact && (
                                    <p className="bg-red-400 text-black px-4 py-2 font-bold border-2 border-black text-center">
                                        Contact: {post.users.contact}
                                    </p>
                                )}
                                <Link href={post.users.linkedin} className="bg-blue-400 text-black px-4 py-2 font-bold border-2 border-black hover:bg-blue-500 transition text-center">
                                    LinkedIn
                                </Link>
                                {post.users.github && (
                                    <Link href={post.users.github} className="bg-purple-400 text-black px-4 py-2 font-bold border-2 border-black hover:bg-purple-500 transition text-center">
                                        GitHub
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
