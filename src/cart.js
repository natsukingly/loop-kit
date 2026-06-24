// カートの小計と税込合計を計算する最小モジュール。
// items: Array<{ name: string, price: number, qty: number }>

export function subtotal(items) {
  return items.reduce((sum, it) => sum + it.price * it.qty, 0);
}

export function totalWithTax(items, taxRate = 0.1) {
  return Math.round(subtotal(items) * (1 + taxRate));
}
