import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatDate(date: number | string | Date, format?: string): string {
  const finalFormat = format ?? 'DD MMM YYYY HH:mm UTC'
  return dayjs().utc(date).format(finalFormat)
}
