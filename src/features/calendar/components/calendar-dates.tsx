export const CalendarDates = () => {

    return (
        <div className="ml-20 mr-4 mb-3 h-12">
        <ul className="flex justify-between ml-2 ">
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
