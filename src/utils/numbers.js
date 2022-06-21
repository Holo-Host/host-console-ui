const kCurrencyDecimals = 2

export function formatCurrency(value) {
  return value.toFixed(kCurrencyDecimals).replace(/\d(?=(\d{3})+\.)/gu, '$&,')
}
