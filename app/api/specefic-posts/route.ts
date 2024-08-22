// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
        }

        const userPosts = await db
            .select()
            .from(posts)
            .where(eq(posts.user_id, userId));

        return NextResponse.json(userPosts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return NextResponse.json({ error: 'Error fetching user posts' }, { status: 500 });
    }
}
