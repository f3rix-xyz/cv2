"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Post, User } from "@/lib/db/schema";
import Loading from "../laoding";

export default function Home() {
    const [allPosts, setAllPosts] = useState<{ posts: Post; users: User | null }[]>([]);
    const [filterType, setFilterType] = useState<"hackathon" | "case comp" | "all">("all");
    const [filteredPosts, setFilteredPosts] = useState<{ posts: Post; users: User | null }[]>([]);
    const [loading, setLoading] = useState(true); // Loading state

    const { data: session } = useSession(); // Access session
    const [userIdFrom, setUserIdFrom] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserId() {
            if (session?.user?.email) {
                try {
                    const res = await fetch(`/api/user-id?email=${session.user.email}`);
                    const data = await res.json();
                    setUserIdFrom(data.id); // Store the logged-in user's ID
                } catch (error) {
                    console.error("Error fetching user ID:", error);
                }
            }
        }
        fetchUserId();
    }, [session]);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            try {
                const response = await fetch(`/api/posts?type=${filterType}`);
                const data = await response.json();
                const today = new Date().toISOString().split("T")[0];

                const filtered = data.filter((post: { posts: Post; users: User | null }) => post.posts.date > today);
                setAllPosts(filtered);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [filterType]);

    useEffect(() => {
        if (filterType === "all") {
            setFilteredPosts(allPosts);
        } else {
            setFilteredPosts(allPosts.filter((post) => post.posts.type === filterType));
        }
    }, [allPosts, filterType]);

    return (
        <main className="min-h-screen bg-yellow-200 p-4 md:p-8 font-mono relative">
            {/* Checkered background */}
            <div className="absolute inset-0 bg-[linear-gradient(#00000010_1px,transparent_1px),linear-gradient(to_right,#00000010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold text-black bg-red-400 p-2 md:p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center md:text-left mb-4 md:mb-0">
                        Competitions Board
                    </h1>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <Link href="/chat" className="bg-blue-400 text-black p-2 md:p-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </Link>
                        <Link
                            href="/addEvent"
                            className="bg-green-400 text-black px-4 py-2 md:px-6 md:py-3 font-bold text-sm md:text-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition text-center"
                        >
                            Add Hackathon
                        </Link>
                    </div>
                </div>

                <div className="mb-8 flex flex-wrap gap-4 mt-4">
                    <button
                        className={`flex-1 md:flex-initial px-6 py-2 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${filterType === "hackathon" ? "bg-blue-400 text-black" : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => setFilterType("hackathon")}
                    >
                        Hackathons
                    </button>
                    <button
                        className={`flex-1 md:flex-initial px-6 py-2 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${filterType === "case comp" ? "bg-green-400 text-black" : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => setFilterType("case comp")}
                    >
                        Case Competitions
                    </button>
                    <button
                        className={`flex-1 md:flex-initial px-6 py-2 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${filterType === "all" ? "bg-gray-400 text-black" : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => setFilterType("all")}
                    >
                        All
                    </button>
                </div>

                {/* Loading State */}
                {loading ? (
                    <Loading />
                ) : (
                    <div className="space-y-8">
                        {filteredPosts.map((post) => (
                            <PostCard key={post.posts.id} post={post} userIdFrom={userIdFrom} />
                        ))}
                    </div>
                )}
            </div>
        </main>

    );
}

function PostCard({ post, userIdFrom }: { post: { posts: Post; users: User | null }; userIdFrom: string | null }) {
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
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <span className="inline-block bg-yellow-300 text-black px-2 py-1 text-sm font-semibold border-2 border-black mb-2 md:mb-0 md:flex-1">
                                {post.posts.type}
                            </span>
                            <span className="text-sm font-bold md:ml-4 md:flex-1 text-center md:text-left">
                                Starts: {post.posts.date}
                            </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Team Opportunity:</h3>
                        <p className="text-black">
                            {isExpanded
                                ? post.posts.message
                                : `${post.posts.message!.split(' ').slice(0, 30).join(' ')}...`}
                            {post.posts.message!.split(' ').length > 30 && (
                                <button
                                    onClick={handleToggleExpand}
                                    className="ml-2 text-blue-500 hover:underline text-sm font-bold"
                                >
                                    {isExpanded ? 'Show Less' : 'Read More'}
                                </button>
                            )}
                        </p>
                    </div>
                    <Link
                        href={post.posts.competitionLink}
                        className="block w-full text-center bg-green-400 text-black py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition"
                    >
                        View Competition Details
                    </Link>

                    <Link
                        href={`/message?userIdFrom=${userIdFrom}&userIdTo=${post.users?.id}`}
                        className="block w-full text-center bg-red-400 text-black py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition mt-4"
                    >
                        Chat with author
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

