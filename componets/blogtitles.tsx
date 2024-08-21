'use client';
import { Blog } from '@/lib/db/schema';
import { motion } from 'framer-motion';
import Link from 'next/link';



export default function BlogTitles({ blogs }: { blogs: Blog[] }) {
    return (
        <div className="space-y-4">
            {blogs.map((blog, index) => (
                <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Link href={`/blog/${blog.id}`} className="block">
                        <div className="bg-black/30 border border-neon-blue rounded-lg p-4 hover:bg-black/50 transition-all duration-300 transform hover:scale-105">
                            <h3 className="text-lg font-semibold text-neon-green">{blog.title}</h3>
                            <p className="text-sm text-neon-blue">{new Date(blog.date).toLocaleDateString()}</p>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}