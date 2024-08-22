// app/api/chat-users/route.ts
import { NextResponse } from 'next/server';
import { message as MessageSchema, users as UserSchema } from '@/lib/db/schema';
import { eq, or } from 'drizzle-orm';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    try {
        // Fetch chat user IDs, excluding the current user ID
        const chatUserIdsResult = await db
            .select({
                userIdFrom: MessageSchema.user_id_from,
                userIdTo: MessageSchema.user_id_to
            })
            .from(MessageSchema)
            .where(or(
                eq(MessageSchema.user_id_from, userId),
                eq(MessageSchema.user_id_to, userId)
            ));

        // Extract unique IDs, excluding the current user ID
        const chatUserIds = new Set(
            chatUserIdsResult
                .flatMap(row => [row.userIdFrom, row.userIdTo])
                .filter(id => id !== userId)
        );

        if (chatUserIds.size === 0) {
            return NextResponse.json([]);
        }

        // Fetch chat users based on the collected IDs
        const chatUsers = await db
            .select({
                id: UserSchema.id,
                name: UserSchema.name,
            })
            .from(UserSchema)
            .where(
                or(
                    ...Array.from(chatUserIds).map(id => eq(UserSchema.id, id))
                )
            );
        console.log('chatUsers:', chatUsers);
        return NextResponse.json(chatUsers);
    } catch (error) {
        console.error('Error fetching chat users:', error);
        return NextResponse.json({ error: 'Error fetching chat users' }, { status: 500 });
    }
}
