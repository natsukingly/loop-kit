# loop-kit

**Issue を 1 件投げると、実装 → テスト → Draft PR まで無人で回る**、最小の Loop Engineering キットです。
Claude Code の `/loop`・`/schedule` で動かします。依存ゼロ（Node.js だけ）。

> 「読む Loop Engineering」はもう十分。これは**動かす** Loop Engineering です。

---

## このリポジトリが実現するループ

```
 ┌──────────────────────────────────────────────────────────────┐
 │  あなたは「受け入れ条件つきの Issue」を1件立てるだけ              │
 └──────────────────────────────────────────────────────────────┘
        ↓                                       （以降ノータッチ）
  loop ラベルの Issue を拾う        ← Automations (/schedule)
        ↓
  worktree でブランチを切る          ← Worktrees（並行しても衝突しない）
        ↓
  目標契約を読んで src/ を実装        ← Skills（.claude/skills/issue-to-pr）
        ↓
  node --test（合否ゲート）           ← 「動きました」を信じない。証拠で判定
        ↓
  別エージェントが受け入れ判定         ← Sub-agents（.claude/agents/verifier）
        ↓
  緑なら Draft PR ＋ Issue にコメント  ← Connectors（gh CLI）
        ↓
  踏んだ罠を MEMORY.md に追記          ← Memory（モデルは忘れる/repo は忘れない）
```

ポイントは、**最初に Issue を書いたあと、どのステップにも人間がプロンプトを書かない**こと。
人間の仕事は「受け入れ条件（テスト）を決めること」と「Draft PR をレビューすること」だけです。

---

## 5 分で再現する

```bash
git clone https://github.com/natsukingly/loop-kit.git
cd loop-kit

# 1) いまは “赤” から始まる（コスト見積もり estimateCost が未実装）
node --test        # → cost のテストが fail するのが正しい状態

# 2) サンプル Issue を立てる（受け入れ条件は examples/sample-issue.md）
gh issue create --label loop --title "feat: LLM のコストを見積もる estimateCost を追加" \
  --body-file examples/sample-issue.md

# 3) ループを回す（どちらでも可）
#  A. 中身を理解する素のシェル版:
bash loop.sh 1
#  B. Claude Code 版（推奨）: セッション内で
#     /loop skill issue-to-pr で open な loop Issue を1件片付けて
#  無人運用にするなら /schedule で毎朝起動（下記）

# 4) 緑になったら src/cost.js ができて、Draft PR が立つ
node --test        # → 全部 pass
```

---

## 受け入れ条件（＝ゲート）はテストで表す

`test/cost.test.js` が「やってほしいこと」の定義そのものです。ループはこれを**1 文字も変えません**。

| Given | When | Then |
|---|---|---|
| 入力1000 / 出力500 / `haiku` | `estimateCost(...)` | `0.0035` |
| 入力1000 / 出力500 / `sonnet` | `estimateCost(...)` | `0.0105` |
| `0, 0, "haiku"` | `estimateCost(...)` | `0` |
| 未知モデル / 負のトークン | `estimateCost(...)` | 例外 |

数値で判定できる＝無人でも合否がブレない。これが「Loop に載せていいタスク」の条件です。
（料金は `src/pricing.js` の例値。最新の実価格は各プロバイダ公式で確認してください）

---

## 無人で回す（/schedule）

毎朝 9 時に「`loop` ラベルの Issue を 1 件片付ける」を起動する例（Claude Code 上で実行）:

```
/schedule 毎朝9時に、skill issue-to-pr に従って open な loop ラベルの Issue を1件、
実装→テスト→Draft PR まで進める。緑にならなければ Issue にコメントして引き渡す。
```

`/schedule` はクラウドで動く有料機能です。起動はあなたの操作で行ってください（このリポジトリには鍵もトークンも含めません）。

---

## 中身

| パス | 役割（Loop の部品） |
|---|---|
| `.claude/skills/issue-to-pr/SKILL.md` | 目標契約＋出力ゲート（test/ を触るな等） |
| `.claude/agents/verifier.md` | 受け入れ判定の別視点（自己採点を信じない） |
| `test/` | 受け入れ条件（合否ゲート）。**ループは編集しない** |
| `src/` | 実装。ループが書き換えるのはここだけ |
| `MEMORY.md` | 踏んだ罠の長期記憶 |
| `loop.sh` | 仕組み理解用の素のシェル版 |
| `examples/sample-issue.md` | 受け入れ条件入りの見本 Issue |

---

## 安全のために

- このリポジトリは**鍵・トークン・個人情報を一切含みません**。`.env` 系は `.gitignore` 済み。
- PR は必ず **Draft**。マージは人間が判断します。
- ループに載せるのは「数値で合否が決まるタスク」だけ。美的判断や本番権限操作は載せないでください。

MIT License.
