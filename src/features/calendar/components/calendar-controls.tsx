const CalendarWeekSummary = () => {
    return (
      <div className="bg-slate-100 py-4 px-6 flex items-center text-slate-600 shadow-sm rounded">
        {" "}
        <span>Week Total</span>
        <span className="w-2 h-2 bg-slate-600 block rounded-full mx-3"></span>
        <span>62:15:44</span>
      </div>
    );
  };
  

export const CalendarControls = () => {
    return (
      <div className="flex justify-between items-center">
        <CalendarWeekSummary />
  
        <div className="flex items-start">
          <div className="mr-8">
            <div className="bg-white rounded-md border-slate-300  border py-2 px-6">
              {"<"} 13 Nov - 19 Nov {">"}
            </div>
            <div className="flex justify-between">
              <span className="underline cursor-pointer">Previous</span>
              <span>
                <span className="mr-6 underline cursor-pointer">Today</span>
                <span className="underline cursor-pointer">Next</span>
              </span>
            </div>
          </div>
          <div className="bg-white rounded-md border-slate-300  border py-2 px-6">
            Week view ^
          </div>
        </div>
      </div>
    );
  };
  