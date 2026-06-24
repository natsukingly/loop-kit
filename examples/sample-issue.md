# サンプル Issue（これを `gh issue create` で立てる）

タイトル: `feat: LLM のコストを見積もる estimateCost を追加`
ラベル: `loop`

---

## 目的
入力・出力トークン数とモデル名から、API 利用コスト(USD)を見積もりたい。
料金表(`src/pricing.js`)はすでにあるので、その上に計算を1つ足す。

## 受け入れ条件（Given-When-Then）
- Given: `estimateCost(1000, 500, "haiku")`
  When: 呼ぶ
  Then: `0.0035` を返す（入力 1000/1e6×$1 + 出力 500/1e6×$5）
- Given: `estimateCost(1000, 500, "sonnet")`
  When: 呼ぶ
  Then: `0.0105` を返す
- Given: `estimateCost(0, 0, "haiku")`
  When: 呼ぶ
  Then: `0` を返す
- Given: 未知のモデル名 / 負のトークン数
  When: 呼ぶ
  Then: 例外を投げる

## 受け入れテスト
- ファイル: `test/cost.test.js`（すでに repo にある。ループはここを書き換えない）

## 禁止領域 / スコープ外
- `test/` を編集しない
- 料金表に無いモデルを勝手に追加しない
- 受け入れ条件の数値をハードコードして通さない（料金表から計算すること）

## 停止条件
- 合格: 全テスト緑 + verifier 合格 → Draft PR
- タイムアウト: 最大 5 ラウンド
