import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust the import based on your Drizzle setup
import { posts, users } from '@/lib/db/schema'; // Import your schema
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
    const { message, competitionName, competitionLink, date, type, user_id } = await req.json();

    try {
        // Insert the new post into the database
        const newPost = await db.insert(posts).values({
            message,
            competitionName,
            competitionLink,
            date,
            type, // Add the type (hackathon/case competition)
            user_id,
        }).returning();

        return NextResponse.json(newPost[0], { status: 200 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}

export async function GET() {
    try {
        console.log('Fetching all posts');
        const allPosts = await db
            .select()
            .from(posts)
            .leftJoin(users, eq(posts.user_id, users.id));

        return NextResponse.json(allPosts);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
