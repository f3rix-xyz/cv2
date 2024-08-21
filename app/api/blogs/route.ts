import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { db } from '@/lib/db';
import { blogs } from '@/lib/db/schema';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function POST(req: NextRequest) {
    // Get session
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session || session.user?.email !== "ayush_g@ar.iitr.ac.in") {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (req.method === 'POST') {
        const body = await req.json();
        const { title, content, date } = body;

        try {
            await db.insert(blogs).values({ title, content, date });
            return NextResponse.json({ message: 'Blog post added successfully' }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to add blog post' }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
