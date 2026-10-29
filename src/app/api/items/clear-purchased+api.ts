import { clearPurchasedGroceryItems } from '../../../lib/server/db-actions';

export async function POST(_request: Request) {
    try {
        await clearPurchasedGroceryItems();
        return Response.json({ ok: true }, { status: 204 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to clear purchased items';
        return Response.json({ error: message }, { status: 500 });
    }
}
