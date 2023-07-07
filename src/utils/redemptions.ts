import type { Redemption } from '@/interfaces/HposInterface'

export function parseRedemption(redemption): Redemption {
  return {
    id: redemption.id,
    createdDate: redemption.created_date,
    completedAmount: Number(redemption.amount),
    redemptionAmount: Number(redemption.amount),
    transactionId: redemption.id,
    status: redemption.status,
    isPartial: false
  }
}
