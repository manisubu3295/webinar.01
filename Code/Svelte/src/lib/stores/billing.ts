import { writable } from "svelte/store";
import type { Product } from "$lib/api/billingApi";

export interface CartItem {
  productCode: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

/** The cart — the piece of state the spec calls out for a Svelte store. */
export const cart = writable<CartItem[]>([]);

/** Walk-in sale by default; staff type a memorized customer id to apply special pricing. */
export const customerId = writable("");

export function addToCart(product: Product, quantity: number): void {
  const qty = Math.max(1, Number(quantity) || 1);
  cart.update((items) => {
    const existing = items.find((i) => i.productCode === product.code);
    if (existing) {
      return items.map((i) =>
        i.productCode === product.code ? { ...i, quantity: i.quantity + qty } : i
      );
    }
    return [
      ...items,
      { productCode: product.code, name: product.name, unitPrice: product.price, quantity: qty },
    ];
  });
}

export function removeFromCart(productCode: string): void {
  cart.update((items) => items.filter((i) => i.productCode !== productCode));
}

export function clearCart(): void {
  cart.set([]);
}
