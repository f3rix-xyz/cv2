import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function POST(req: NextRequest) {
    // Get the session from NextAuth
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    // Check if the session exists and the email matches
    if (!session || session.user?.email !== "ayush_g@ar.iitr.ac.in") {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (req.method === 'POST') {
        const body = await req.json();
        const { title, description, github, live_link } = body;

        try {
            // Insert the project into the database
            await db.insert(projects).values({ title, description, github, live_link });
            return NextResponse.json({ message: 'Project added successfully' }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
        }
    }

    // Handle unsupported methods
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
