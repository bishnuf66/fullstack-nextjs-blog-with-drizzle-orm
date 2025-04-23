import { NextResponse } from 'next/server';
import { db } from '@/db';
import { Blog } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const { title, description, image, userId, categoryId } = await request.json();
    const newBlog = await db.insert(Blog).values({
      title,
      description,
      image,
      userId,
      categoryId,
      date: new Date(),
    }).returning();

    return NextResponse.json(newBlog[0]);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 