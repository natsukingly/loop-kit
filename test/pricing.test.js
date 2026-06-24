import { test } from "node:test";
import assert from "node:assert/strict";
import { pricePerMTok } from "../src/pricing.js";

test("既知モデルの料金を返す", () => {
  assert.deepEqual(pricePerMTok("sonnet"), { input: 3, output: 15 });
});

test("未知モデルは例外を投げる", () => {
  assert.throws(() => pricePerMTok("gpt-9"));
});
