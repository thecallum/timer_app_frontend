import dayjs from 'dayjs'

export const getTodaysDate = () => {
  const today = dayjs()

  if (process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST) {
    const hardCodedDate = dayjs(process.env.NEXT_PUBLIC_TODAYS_DATE)

    // combine hardcoded date, with the correct time
    return hardCodedDate
      .hour(today.hour())
      .minute(today.minute())
      .second(today.second())
  }

  return today
}
