# サンプル Issue（これを `gh issue create` で立てる）

タイトル: `feat: 送料を計算する shippingFee を追加`
ラベル: `loop`

---

## 目的
カートの小計から送料を出したい。一定額以上は送料無料にする。

## 受け入れ条件（Given-When-Then）
- Given: 小計が 3,980 円未満
  When: `shippingFee(小計)` を呼ぶ
  Then: `500` を返す（一律 500 円）
- Given: 小計が 3,980 円ちょうど、または超える
  When: `shippingFee(小計)` を呼ぶ
  Then: `0` を返す（送料無料）
- Given: 小計が負
  When: `shippingFee(小計)` を呼ぶ
  Then: 例外を投げる

## 受け入れテスト
- ファイル: `test/shipping.test.js`（すでに repo にある。ループはここを書き換えない）

## 禁止領域 / スコープ外
- `test/` を編集しない
- 送料の「無料しきい値」を引数で可変にする等、Issue に無い拡張をしない

## 停止条件
- 合格: 全テスト緑 + verifier 合格 → Draft PR
- タイムアウト: 最大 5 ラウンド
