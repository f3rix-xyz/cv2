import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, name, linkedin, about, contact, github } = body;

    try {
        // Create an object with the fields to be updated
        const updateFields: { name?: string; linkedin?: string; about?: string; contact?: string; github?: string } = {
            name,
            linkedin,
            about,
            contact,
            github,
        };

        // Update the user record with the fields
        await db.update(users).set(updateFields).where(eq(users.email, email));
        return NextResponse.json({ message: 'User info updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update user info' }, { status: 500 });
    }
}
