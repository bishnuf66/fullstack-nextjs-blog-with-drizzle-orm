import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { Category } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const categories = await db.select().from(Category).orderBy(desc(Category.createdAt));
    return NextResponse.json(categories);
  } catch (err) {
    console.error('GET /categories error:', err);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const [newCategory] = await db.insert(Category).values({ name }).returning();
    return NextResponse.json(newCategory);
  } catch (err) {
    console.error('POST /categories error:', err);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
