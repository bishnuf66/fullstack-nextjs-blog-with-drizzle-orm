import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { Category } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/categories/[id]
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const [category] = await db.select().from(Category).where(eq(Category.id, id));

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (err) {
    console.error('GET /categories/[id] error:', err);
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

// PUT /api/categories/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const [updatedCategory] = await db.update(Category)
      .set({ name, updatedAt: new Date() })
      .where(eq(Category.id, id))
      .returning();

    if (!updatedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCategory);
  } catch (err) {
    console.error('PUT /categories/[id] error:', err);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

// DELETE /api/categories/[id]
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const [deletedCategory] = await db.delete(Category).where(eq(Category.id, id)).returning();

    if (!deletedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('DELETE /categories/[id] error:', err);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
