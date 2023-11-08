
const CalendarDates = () => {

    return (
        <div className="ml-20 mr-4 mb-3">
        <ul className="flex justify-between ml-2">
          {[...Array(7)].map((_, index) => {
            return (
              <li className="flex-grow">
                <div className="flex justify-center items-center">
                  <div className="text-slate-600 text-2xl font-light mr-3">
                    {index < 10 && "0"}
                    {index + 1}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-slate-600 text-xs mb-1">MON</div>
                    <div className="text-slate-500 text-xs">5:28:48</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )
}


export const Calendar = () => {
    return (
        <div className="bg-orange-300 w-full h-full flex overflow-hidden flex-col">
        <CalendarDates />


        <div className="overflow-y-auto h-full">
<div className="flex" >


            <div className="grid grid-cols-[auto,1fr] gap-x-2">
              <ul className="flex flex-col w-20 mt-8">
                {[...Array(24)].map((_, index) => {
                  // Convert 24-hour format to 12-hour format
                  let hour = index === 0 ? 12 : index;
                  if (hour > 12) {
                    hour -= 12;
                  }

                  // Format the hour
                  const formattedHour =
                    hour < 10 ? `0${hour}` : hour.toString();

                  // Determine AM or PM
                  const amPm = index < 12 ? "AM" : "PM";

                  return (
                    <li key={index} className="flex-grow-0  flex justify-start items-center h-16">
                      <span>{formattedHour}:00 {amPm}</span>
                    </li>
                  );
                })}
              </ul>

             
            </div>



          <div className="flex flex-row justify-between flex-grow ">
                {/* Column */}
                {[...Array(7)].map((_, cindex) => {
                  return (
                    <>
                      <div
                        key={cindex}
                        className="border-solid border-l last:border-r border-slate-200 flex-grow relative"
                      >
                        {/* Row */}
                        {[...Array(25)].map((_, index) => {
                          return (
                            <div
                              key={index}
                              className="border-solid border-t last:border-b border-slate-200 h-16"
                            ></div>
                          );
                        })}

                        {/* Recordings above grid */}
                        {cindex === 2 && (
                          <ul className="absolute top-0 left-0 w-full ">
                            <li className="absolute rounded-sm w-full h-[calc(5*16px)] top-[calc(8*64px)] bg-pink-200 hover:bg-pink-300 p-2 flex flex-col justify-between overflow-hidden text-ellipsis cursor-pointer">
                              <span >
                                <div className="text-pink-950 font-semibold text-s">
                                  Planning session
                                </div>
                                <div className="text-pink-500 text-xs whitespace-nowrap">
                                  Work
                                </div>
                              </span>
                              <div className="text-pink-950 text-s whitespace-nowrap">
                                1:15:22
                              </div>
                            </li>
 
                            <li className="absolute rounded-sm w-full h-[calc(7*16px)] top-[calc(6*64px)] bg-pink-200 hover:bg-pink-300 p-2 flex flex-col justify-between overflow-hidden text-ellipsis cursor-pointer">
                              <span >
                                <div className="text-pink-950 font-semibold text-s">
                                  Planning session
                                </div>
                                <div className="text-pink-500 text-xs whitespace-nowrap">
                                  Work
                                </div>
                              </span>
                              <div className="text-pink-950 text-s whitespace-nowrap">
                                1:15:22
                              </div>
                            </li>
                          </ul>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              </div>
              </div>

        </div>
        
    )
}