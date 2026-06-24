// このテストは「未実装の機能の受け入れ条件」です。
// loop-kit を clone した直後は src/cost.js が無いので、ここは “赤” から始まります。
// ループ(エージェント)の仕事は、このテストを 1 文字も変えずに src/cost.js を実装し、緑にすること。
import { test } from "node:test";
import assert from "node:assert/strict";
import { estimateCost } from "../src/cost.js";

test("haiku: 入力1000 / 出力500 トークン = $0.0035", () => {
  assert.equal(estimateCost(1000, 500, "haiku"), 0.0035);
});

test("sonnet: 入力1000 / 出力500 トークン = $0.0105", () => {
  assert.equal(estimateCost(1000, 500, "sonnet"), 0.0105);
});

test("0トークンは $0", () => {
  assert.equal(estimateCost(0, 0, "haiku"), 0);
});

test("未知モデルは例外を投げる", () => {
  assert.throws(() => estimateCost(1000, 500, "gpt-9"));
});

test("負のトークン数は例外を投げる", () => {
  assert.throws(() => estimateCost(-1, 0, "haiku"));
});
