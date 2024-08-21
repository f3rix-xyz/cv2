// app/admin/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const [projectData, setProjectData] = useState({ title: '', description: '', github: '', live_link: '' });
    const [blogData, setBlogData] = useState({ title: '', content: '', date: '' });
    const router = useRouter();

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
        });
        if (response.ok) {
            setProjectData({ title: '', description: '', github: '', live_link: '' });
            router.refresh();
        }
    };

    const handleBlogSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blogData),
        });
        if (response.ok) {
            setBlogData({ title: '', content: '', date: '' });
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold text-white text-center mb-12 transform -rotate-2 shadow-neon">Funky Dev Visioner Dashboard</h1>

                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden mb-8 transform hover:scale-105 transition-transform duration-300">
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500">
                        <h2 className="text-2xl font-bold text-white transform skew-x-6">Add New Project</h2>
                    </div>
                    <form onSubmit={handleProjectSubmit} className="p-6 space-y-6">
                        <input
                            type="text"
                            placeholder="Project Title"
                            value={projectData.title}
                            onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                            className="w-full bg-white bg-opacity-20 rounded-md shadow-inner py-3 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                        <textarea
                            placeholder="Project Description"
                            value={projectData.description}
                            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                            className="w-full bg-white bg-opacity-20 rounded-md shadow-inner py-3 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            rows={4}
                            required
                        />
                        <input
                            type="url"
                            placeholder="GitHub URL"
                            value={projectData.github}
                            onChange={(e) => setProjectData({ ...projectData, github: e.target.value })}
                            className="w-full bg-white bg-opacity-20 rounded-md shadow-inner py-3 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                        <input
                            type="url"
                            placeholder="Live Demo URL (optional)"
                            value={projectData.live_link}
                            onChange={(e) => setProjectData({ ...projectData, live_link: e.target.value })}
                            className="w-full bg-white bg-opacity-20 rounded-md shadow-inner py-3 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transform hover:scale-105 transition-transform duration-300">
                            Add Project
                        </button>
                    </form>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div className="px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500">
                        <h2 className="text-2xl font-bold text-white transform -skew-x-6">Add New Blog Post</h2>
                    </div>
                    <form onSubmit={handleBlogSubmit} className="p-6 space-y-6">
                        <input
                            type="text"
                            placeholder="Blog Post Title"
                            value={blogData.title}
                            onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                            className="w-full bg-white bg-opacity-20 rounded-md shadow-inner py-3 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />
                        <textarea
                            placeholder="Write your blog post content here (Markdown supported)"
                            value={blogData.content}
                            onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                            className="w-full bg-white bg-opacity-20 rounded-md shadow-inner py-3 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            rows={8}
                            required
                        />
                        <input
                            type="date"
                            value={blogData.date}
                            onChange={(e) => setBlogData({ ...blogData, date: e.target.value })}
                            className="w-full bg-white bg-opacity-20 rounded-md shadow-inner py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />
                        <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform hover:scale-105 transition-transform duration-300">
                            Add Blog Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}