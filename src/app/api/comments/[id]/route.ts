import { NextResponse } from 'next/server';
import { db } from '@/db';
import { Comment } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Update a comment
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email, comment } = await request.json();
    const commentId = parseInt(params.id);

    const updatedComment = await db.update(Comment)
      .set({ name, email, comment })
      .where(eq(Comment.id, commentId))
      .returning();

    if (updatedComment.length === 0) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedComment[0]);
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a comment
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = parseInt(params.id);
    const deletedComment = await db.delete(Comment)
      .where(eq(Comment.id, commentId))
      .returning();

    if (deletedComment.length === 0) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 