export const formatHolofuelAmount = amount => isNaN(amount) 
  ? '-- ' 
  : Number(amount).toLocaleString()
