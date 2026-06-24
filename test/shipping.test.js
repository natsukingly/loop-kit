// このテストは「未実装の機能の受け入れ条件」です。
// loop-kit を clone した直後は src/shipping.js が無いので、ここは “赤” から始まります。
// ループ(エージェント)の仕事は、このテストを 1 文字も変えずに src/shipping.js を実装し、緑にすること。
import { test } from "node:test";
import assert from "node:assert/strict";
import { shippingFee } from "../src/shipping.js";

test("3,980円未満は送料500円", () => {
  assert.equal(shippingFee(0), 500);
  assert.equal(shippingFee(3979), 500);
});

test("3,980円ちょうどは送料無料", () => {
  assert.equal(shippingFee(3980), 0);
});

test("3,980円を超えたら送料無料", () => {
  assert.equal(shippingFee(10000), 0);
});

test("負の小計は例外を投げる", () => {
  assert.throws(() => shippingFee(-1));
});
