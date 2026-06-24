// モデル別の料金表（100万トークンあたりの USD）。
// ※ 数値はサンプル用の「例」です。実際の最新料金は各プロバイダの公式で確認してください。
export const PRICES = {
  haiku: { input: 1, output: 5 },
  sonnet: { input: 3, output: 15 },
  opus: { input: 15, output: 75 },
};

export function pricePerMTok(model) {
  const price = PRICES[model];
  if (!price) {
    throw new Error(`unknown model: ${model}`);
  }
  return price;
}
