import { desc, eq } from "drizzle-orm";
import { db } from "./db/client";
import { groceryItems } from "./db/schema";



export const listGroceryItems = async () => {
    const rows = await db.select().from(groceryItems).orderBy(desc(groceryItems.updated_at));
    return rows;
}

export const createGroceryItem = async (input: {
    name: string,
    category: string,
    quantity: number,
    priority: string
}) => {
    const row = await db.insert(groceryItems).values({
        id: crypto.randomUUID(),
        name: input.name,
        category: input.category,
        quantity: Math.max(input.quantity, 1),
        priority: input.priority,
        purchased: false,
        updated_at: Date.now()
    }).returning();

    if (!row.length) return null;
    return row[0];
}

export const setGroceryItemPurchased = async (id: string, purchased: boolean) => {
    const row = await db.update(groceryItems).set({
        purchased,
        updated_at: Date.now()
    }).where(eq(groceryItems.id, id)).returning();

    if (!row.length) return null;
    return row[0];
}

export const updateGroceryItemQuantity = async (id: string, quantity: number) => {
    const row = await db.update(groceryItems).set({
        quantity: Math.max(quantity, 1),
        updated_at: Date.now()
    }).where(eq(groceryItems.id, id)).returning();

    if (!row.length) return null;
    return row[0];
}

export const deleteGroceryItem = async (id: string) => {
    await db.delete(groceryItems).where(eq(groceryItems.id, id));
}