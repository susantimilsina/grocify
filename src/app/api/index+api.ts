import { createGroceryItem, listGroceryItems } from '../../lib/server/db-actions';

export async function GET() {
  try {
    const items = await listGroceryItems();
    return Response.json(items);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch list items';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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
  catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create item';
    return Response.json({ error: message }, { status: 500 });
  }
}
