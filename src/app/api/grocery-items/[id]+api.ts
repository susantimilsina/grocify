import { deleteGroceryItem, setGroceryItemPurchased, updateGroceryItemQuantity } from '../../../lib/server/db-actions';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const body = await request.json();

  if ('purchased' in body) {
    const item = await setGroceryItemPurchased(id, body.purchased);
    if (!item) return Response.json({ error: 'Item not found' }, { status: 404 });
    return Response.json(item);
  }

  if ('quantity' in body) {
    const item = await updateGroceryItemQuantity(id, body.quantity);
    if (!item) return Response.json({ error: 'Item not found' }, { status: 404 });
    return Response.json(item);
  }

  return Response.json({ error: 'Provide purchased or quantity to update' }, { status: 400 });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  await deleteGroceryItem(id);
  return new Response(null, { status: 204 });
}
