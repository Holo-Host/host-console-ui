const dayjs = require('dayjs')

const kMsInSecond = 1000

module.exports = {
  createDate(dayOfWeek, weeksAhead = 1) {
    const day = new Date()
    const currentDayOfMonth = day.getDate()
    const currentDayOfWeek = day.getDay()

    /*
      We don't want to return values in the past, this value is equal to
      number of days to the nearest dayOfWeek (passed as a argument).

      eg.
        if (dayOfWeek > currentDayOfWeek)
        day = Tue Mar 17 2020 15:12:50 GMT-0400 (Eastern Daylight Time)
        dayOfWeek = 3 (Wednesday)
        daysToDayOfWeekInFuture => 1

        if (dayOfWeek === currentDayOfWeek)
        day = Tue Mar 17 2020 15:12:50 GMT-0400 (Eastern Daylight Time)
        dayOfWeek = 2 (Tuesday)
        daysToDayOfWeekInFuture => 0

        if (dayOfWeek < currentDayOfWeek)
        day = Tue Mar 17 2020 15:12:50 GMT-0400 (Eastern Daylight Time)
        dayOfWeek = 1 (Monday)
        daysToDayOfWeekInFuture => 6
     */
    const daysToDayOfWeekInFuture = (dayOfWeek + 7 - currentDayOfWeek) % 7

    day.setDate(currentDayOfMonth + daysToDayOfWeekInFuture + 7 * weeksAhead)

    return dayjs(day).valueOf() * kMsInSecond
  }
}
