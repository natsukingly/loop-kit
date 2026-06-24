#!/usr/bin/env bash
# loop-kit: Issue→Draft PR ループの「素のシェル版」。
# 中身を理解するための参考実装です。本番は Claude Code の /loop・/schedule を使います（README 参照）。
#
# 使い方:  bash loop.sh <issue番号>
# 例:      bash loop.sh 1
set -euo pipefail

ISSUE="${1:?usage: bash loop.sh <issue番号>}"
MAX="${MAX_ROUNDS:-5}"

for i in $(seq 1 "$MAX"); do
  echo "==================== round ${i}/${MAX} ===================="

  # 実装フェーズ: 目標契約(SKILL)を読み込んだエージェントに、緑になるよう src/ を直させる。
  # test/ は触らせない。--permission-mode は環境に合わせて調整。
  claude -p "skill issue-to-pr に従い、Issue #${ISSUE} の受け入れテストが緑になるよう src/ を実装せよ。\
test/ は絶対に編集しない。終わったら 'node --test' を実行し結果を貼れ。" \
    --permission-mode acceptEdits || true

  # ゲート(決定論): テスト。ここが緑かどうかだけが「完了」の基準。
  if node --test; then
    echo "✅ green @ round ${i}"
    echo "→ 次に Claude Code 側で: verifier 合格を確認 → gh pr create --draft → gh issue comment"
    exit 0
  fi
  echo "⚠️ まだ赤。次のラウンドへ。"
done

echo "⛔ ${MAX} ラウンドで緑にならず → 人間に引き渡し（停止条件: タイムアウト）"
exit 1
