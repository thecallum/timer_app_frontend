export const CalendarHours = () => {
  const hours = [...Array(24)]
    .map((_, index) => {
      // Convert 24-hour format to 12-hour format
      let hour = index === 0 ? 12 : index
      if (hour > 12) {
        hour -= 12
      }

      // Format the hour
      const formattedHour = hour < 10 ? `0${hour}` : hour.toString()

      // Determine AM or PM
      const amPm = index < 12 ? 'AM' : 'PM'

      return `${formattedHour}:00 ${amPm}`
    })
    .slice(1)

  return (
    <ul className="flex flex-col w-4 mt-16 mr-2 lg:w-14 ">
      {hours.map((hour) => (
        <li
          key={hour}
          className="flex-grow flex-shrink-0 text-xs flex justify-end items-center h-32   "
        >
          <div className="text-gray-950  whitespace-nowrap  -rotate-90 translate-x-[19px] lg:translate-x-0 lg:rotate-0 text-center origin-center">
            {hour}
          </div>
        </li>
      ))}
    </ul>
  )
}
