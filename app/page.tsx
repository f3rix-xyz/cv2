// app/page.tsx

import BlogTitles from '@/componets/blogtitles';
import ProjectCards from '@/componets/projectcards';
import SocialLinks from '@/componets/sociallinks';
import { db } from '@/lib/db/index';
import { projects, blogs } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';

const ITEMS_PER_PAGE = 6;

export default async function Home() {
  const projectData = await db.select().from(projects).limit(ITEMS_PER_PAGE);
  const blogData = await db.select().from(blogs).orderBy(desc(blogs.date)).limit(ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-black text-neon-green overflow-hidden">
      <div className="fixed inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>

      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div>
            <h1 className="text-6xl font-extrabold text-neon-blue mb-4 glitch animate-float">
              Ayush Goyal
            </h1>
            <p className="text-2xl text-neon-orange mb-8 glitch animate-float-delayed">
              I am the Next big thing in Indian Startup Scene
            </p>
          </div>
          <div>
            <Link
              href="/hackathons"
              className="inline-block bg-neon-orange text-black text-xl font-bold py-3 px-8 rounded-lg border-4 border-black hover:bg-[#0ff] hover:text-black transition-colors mt-4 md:mt-0"
            >
              Find a Hackathon Partner
            </Link>
          </div>
        </div>

        <div className="mb-16 bg-black/50 backdrop-blur-md p-6 rounded-lg border border-neon-blue animate-fade-in">
          <h2 className="text-3xl font-semibold text-neon-blue mb-4 glitch">About Me</h2>
          <p className="text-neon-green mb-4 leading-relaxed">
            I’m a 19-year-old undergrad at IIT Roorkee, driven by a deep desire for freedom—freedom in every sense.
            Right now, I’m focused on achieving financial freedom, so I never have to work just for money; I want to be truly free.
            I also dream of a world where everyone can attain this freedom, perhaps through advancements like AGI.
            <br /><br />
            To reach financial freedom, I’m passionate about startups. They’re challenging, energetic, and full of purpose,
            which makes them exciting to me. That’s why I immerse myself in learning technology—whether it’s web development,
            mobile development, AI, or machine learning. I’m dedicated to my craft and constantly working to improve.
            <br /><br />
            My areas of interest include Next.js, Flutter, PostgreSQL, llms and deep learning.
          </p>
        </div>

        <div className="mb-16 animate-slide-in">
          <h2 className="text-3xl font-semibold text-neon-blue mb-4 glitch">Projects</h2>
          <ProjectCards projects={projectData} />
        </div>

        <div className="mb-16 animate-slide-in-delayed">
          <h2 className="text-3xl font-semibold text-neon-blue mb-4 glitch">Latest Blog Posts</h2>
          <BlogTitles blogs={blogData} />
        </div>

        <SocialLinks />
      </section>
    </main>
  );
}
