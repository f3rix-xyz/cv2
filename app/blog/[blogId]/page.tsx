import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import ReactMarkdown from "react-markdown";

export default async function BlogPost({ params }: { params: { blogId: string } }) {
    const blog = await db.select().from(blogs).where(eq(blogs.id, params.blogId));



    return (
        <div className="min-h-screen bg-amber-50 text-stone-800 font-serif">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-2 text-stone-900">{blog[0].title}</h1>
                    <time className="text-sm text-stone-600" dateTime={blog[0].date}>
                        {new Date(blog[0].date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                </header>
                <main>
                    <article
                        className="prose prose-stone max-w-none"

                    >             <ReactMarkdown>{blog[0].content}</ReactMarkdown></article>
                </main>
                <footer className="mt-12 pt-4 border-t border-stone-300 text-center">
                    <a
                        href="/"
                        className="inline-block px-4 py-2 bg-stone-200 text-stone-800 rounded-md hover:bg-stone-300 transition-colors"
                    >
                        ← Back to Home
                    </a>
                </footer>
            </div>
        </div>
    );
}