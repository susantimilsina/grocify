import { createGroceryItem, listGroceryItems } from '../../lib/server/db-actions';

export async function GET() {
  const items = await listGroceryItems();
  return Response.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, category, quantity, priority } = body;

  if (!name || !category || !priority) {
    return Response.json({ error: 'name, category, and priority are required' }, { status: 400 });
  }

  const item = await createGroceryItem({ name, category, quantity: quantity ?? 1, priority });
  if (!item) {
    return Response.json({ error: 'Failed to create item' }, { status: 500 });
  }

  return Response.json(item, { status: 201 });
}
