import { NextResponse } from 'next/server';
import { db } from '@/db';
import { Blog, Category } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const blogs = await db.select({
      id: Blog.id,
      title: Blog.title,
      description: Blog.description,
      image: Blog.image,
      date: Blog.date,
      categoryId: Blog.categoryId,
      category: {
        id: Category.id,
        name: Category.name,
      }
    })
    .from(Blog)
    .leftJoin(Category, eq(Blog.categoryId, Category.id));

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 