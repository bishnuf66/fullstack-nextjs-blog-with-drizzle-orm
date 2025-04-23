import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { Blog } from '@/db/schema';
import { eq } from 'drizzle-orm';

// @ts-ignore - Bypass Next.js type checking issue
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, image, imageType } = await request.json();
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    const updatedBlog = await db.update(Blog)
      .set({
        title,
        description,
        ...(image && { image }),
        ...(imageType && { imageType }),
      })
      .where(eq(Blog.id, id))
      .returning();

    if (updatedBlog.length === 0) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBlog[0]);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// @ts-ignore - Bypass Next.js type checking issue
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    const deletedBlog = await db.delete(Blog)
      .where(eq(Blog.id, id))
      .returning();

    if (deletedBlog.length === 0) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// @ts-ignore - Bypass Next.js type checking issue
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    const blog = await db.select().from(Blog).where(eq(Blog.id, id));
    if (blog.length === 0) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog[0]);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}