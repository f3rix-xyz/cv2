// app/api/acceptedUsers/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { accepted_users } from '@/lib/db/schema';

export async function POST(request: Request) {
    try {
        const { post_id, user_id } = await request.json();

        if (!post_id || !user_id) {
            return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
        }

        const newAcceptedUser = await db
            .insert(accepted_users)
            .values({ post_id, user_id })
            .returning();

        return NextResponse.json(newAcceptedUser);
    } catch (error) {
        console.error('Error adding accepted user:', error);
        return NextResponse.json({ error: 'Error adding accepted user' }, { status: 500 });
    }
}
