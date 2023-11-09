import { CalendarDates } from "./components/calendar-dates";

export const Calendar = () => {
  return (
    <div className="bg-red h-full flex flex-col">
      <CalendarDates />

      {/* <div 
      className="flex-grow border-2 border-gray-400"
      // className="overflow-y-auto h-full"
      > */}
        <div className="flex overflow-y-auto h-[calc(100%-3rem)]">
        {/* <div className="flex-grow"> */}
            <ul className="flex flex-col w-20 mt-8">
              {[...Array(24)].map((_, index) => {
                // Convert 24-hour format to 12-hour format
                let hour = index === 0 ? 12 : index;
                if (hour > 12) {
                  hour -= 12;
                }

                // Format the hour
                const formattedHour = hour < 10 ? `0${hour}` : hour.toString();

                // Determine AM or PM
                const amPm = index < 12 ? "AM" : "PM";

                return (
                  <li
                    key={index}
                    className="flex-grow flex-shrink-0 flex justify-start items-center h-16 bg-red"
                  >
                    <span className="">
                      {formattedHour}:00 {amPm}
                    </span>
                  </li>
                );
              })}
            </ul>
     

         
            <div className="flex flex-row flex-shrink-0 justify-between flex-grow border-t border-l border-slate-200  h-[100rem]">
              {/* Column */}
              {[...Array(7)].map((_, cindex) => {
                return (
                  <>
                    <div
                      key={cindex}
                      className=" border-r border-slate-200 flex-grow flex-shrink-0 relative h-full"
                    >
                      {/* Row */}
                      {[...Array(25)].map((_, index) => {
                        return (
                          <div
                            key={index}
                            className="border-slate-200 h-16 border-b"
                          ></div>
                        );
                      })}

                      {/* Recordings above grid */}
                      {cindex === 2 && (
                        <ul className="absolute top-0 left-0 w-full ">
                          <li className="absolute rounded-sm w-full h-[calc(5*16px)] top-[calc(8*64px)] bg-pink-200 hover:bg-pink-300 p-2 flex flex-col justify-between overflow-hidden text-ellipsis cursor-pointer">
                            <span>
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
                            <span>
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
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};
