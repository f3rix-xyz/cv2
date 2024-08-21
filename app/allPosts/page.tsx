// pages/index.tsx (Server Component)
import HomeClient from '@/componets/HomeClient';

async function getData() {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const url = `${protocol}://${host}/api/posts`;
    console.log('Fetching from URL:', url);

    try {
        const res = await fetch(url, { cache: 'no-store' });

        // Log the response status
        console.log('Response status:', res.status);

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return []; // Return an empty array or handle the error appropriately
    }
}


export const dynamic = 'force-dynamic'; // Use this if you want dynamic data fetching

export default async function Home() {
    const allPosts = await getData();

    // Pass the fetched posts to the client component
    return <HomeClient allPosts={allPosts} />;
}
