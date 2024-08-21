// pages/index.tsx (Server Component)
import HomeClient from '@/componets/HomeClient';

async function getData() {
    const protocol = process.env.NODE_ENV === 'production' ? 'http' : 'http';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    console.log('host', host);
    const url = `${protocol}://${host}/api/posts`;
    try {
        const res = await fetch(url, { cache: 'no-store' });
        return res.json();


    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}

export const dynamic = 'force-dynamic'; // Use this if you want dynamic data fetching

export default async function Home() {
    const allPosts = await getData();

    // Pass the fetched posts to the client component
    return <HomeClient allPosts={allPosts} />;
}
