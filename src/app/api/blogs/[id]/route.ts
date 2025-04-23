import { NextResponse } from 'next/server';
import { db } from '@/db';
import { Blog } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, image, imageType } = await request.json();
    const blogId = parseInt(params.id);

    const updatedBlog = await db.update(Blog)
      .set({
        title,
        description,
        ...(image && { image }),
        ...(imageType && { imageType }),
      })
      .where(eq(Blog.id, blogId))
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = parseInt(params.id);
    const deletedBlog = await db.delete(Blog)
      .where(eq(Blog.id, blogId))
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



export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const blogId = parseInt(context.params.id);
    const blog = await db.select().from(Blog).where(eq(Blog.id, blogId))
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}