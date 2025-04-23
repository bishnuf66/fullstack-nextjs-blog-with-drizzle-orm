import { NextResponse } from 'next/server';
import { db } from '@/db';
import { Blog } from '@/db/schema';

export async function GET() {
  try {
    const blogs = await db.select().from(Blog);
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 