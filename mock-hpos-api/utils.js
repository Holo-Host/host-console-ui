import dayjs from 'dayjs'

const kMsInSecond = 1000

export function createDate(dayOfWeek, weeksAhead = 1) {
  const day = new Date()
  const currentDayOfMonth = day.getDate()
  const currentDayOfWeek = day.getDay()
  const daysToDayOfWeekInFuture = (dayOfWeek + 7 - currentDayOfWeek) % 7

  day.setDate(currentDayOfMonth + daysToDayOfWeekInFuture + 7 * weeksAhead)

  return dayjs(day).valueOf() * kMsInSecond
}
