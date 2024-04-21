export const getTodaysDate = () => {
  const today = new Date()

  //eslint-disable-next-line no-extra-boolean-cast
  const useMockDate: boolean = !!process.env.TEST_ENV

  console.log({ TEST_ENV: process.env.TEST_ENV })

  if (useMockDate) {
    // Parse the environment variable to a Date object
    const hardCodedDate = new Date(
      process.env.NEXT_PUBLIC_TODAYS_DATE as string,
    )

    // Combine hardcoded date with the correct time from "today"
    hardCodedDate.setHours(
      today.getHours(),
      today.getMinutes(),
      today.getSeconds(),
    )

    return hardCodedDate
  }

  return today
}
