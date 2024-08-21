// pages/index.tsx (Server Component)
import HomeClient from '@/componets/HomeClient';

async function getData() {
    const protocol = process.env.NODE_ENV === 'production' ? 'http' : 'http';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    console.log('host', host);
    const url = `${protocol}://${host}/api/posts`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export const dynamic = 'force-dynamic'; // Use this if you want dynamic data fetching

export default async function Home() {
    const allPosts = await getData();

    // Pass the fetched posts to the client component
    return <HomeClient allPosts={allPosts} />;
}
