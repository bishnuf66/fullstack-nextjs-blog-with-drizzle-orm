import { NextResponse } from 'next/server';
import { db } from '@/db';
import { Comment } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Get all comments for a blog
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get('blogId');

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const comments = await db.select().from(Comment).where(eq(Comment.blogId, parseInt(blogId)));
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new comment
export async function POST(request: Request) {
  try {
    const { name, email, comment, blogId } = await request.json();

    const newComment = await db.insert(Comment).values({
      name,
      email,
      comment,
      blogId,
    }).returning();

    return NextResponse.json(newComment[0]);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 