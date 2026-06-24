import { test } from "node:test";
import assert from "node:assert/strict";
import { subtotal, totalWithTax } from "../src/cart.js";

const items = [
  { name: "apple", price: 100, qty: 2 },
  { name: "bread", price: 250, qty: 1 },
];

test("subtotal は price*qty の合計", () => {
  assert.equal(subtotal(items), 450);
});

test("totalWithTax は税込(四捨五入)", () => {
  assert.equal(totalWithTax(items, 0.1), 495);
});
