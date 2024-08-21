import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust the import based on your Drizzle setup
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const user = await db.select({
            id: users.id
        }).from(users).where((eq(users.email, email)));

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ id: user[0].id });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching the user ID' }, { status: 500 });
    }
}
