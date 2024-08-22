import { NextResponse } from 'next/server';
import { message } from '@/lib/db/schema';
import { eq, or, and } from 'drizzle-orm';
import { db } from '@/lib/db';

// GET request handler
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userIdFrom = searchParams.get('userIdFrom');
    const userIdTo = searchParams.get('userIdTo');

    if (!userIdFrom || !userIdTo) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    try {
        const messages = await db
            .select()
            .from(message)
            .where(
                or(
                    and(
                        eq(message.user_id_from, userIdFrom),
                        eq(message.user_id_to, userIdTo)
                    ),
                    and(
                        eq(message.user_id_from, userIdTo),
                        eq(message.user_id_to, userIdFrom)
                    )
                )
            )
            ;

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 });
    }
}

// POST request handler
export async function POST(request: Request) {
    const { message: text, userIdFrom, userIdTo } = await request.json();

    if (!text || !userIdFrom || !userIdTo) {
        return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    try {
        const newMessage = await db
            .insert(message)
            .values({
                message: text,
                user_id_from: userIdFrom,
                user_id_to: userIdTo,
            })
            .returning(); // Ensure the inserted row is returned

        return NextResponse.json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Error sending message' }, { status: 500 });
    }
}
