import {
  ContainerFullWidth,
  PageContainerLarge,
} from "@/components/page-container";
import { CalendarDates } from "./components/calendar-dates";
import { CalendarGrid } from "./components/calendar-grid";
import { CalendarHours } from "./components/calendar-hours";

interface Props {
  top: JSX.Element;
  children: JSX.Element;
}

const FullPageSpaceFillerComponent = (props: Props) => {
  const { top, children } = props;


  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div>{top}</div>
      <div className="flex-grow overflow-hidden">
        {/* <div className="bg-orange-100 h-full "> */}
        {children}

        
        {/* </div> */}
      </div>
    </div>
  );

  // return (
  //   <div className="w-screen h-screen max-h-screen flex flex-col">
  //     <div>{top}</div>
  //     <div className="flex-grow bg-orange-400 p-4 overflow-hidden">{children}</div>
  //   </div>
  // );
};

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

const CalendarControls = () => {
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


export const Calendar = () => {
  return (
    <div>
      <FullPageSpaceFillerComponent
        top={
          <ContainerFullWidth>
            <>
              <h1 className="text-slate-800 text-2xl mb-4 mt-8">Calendar</h1>
              <CalendarControls />
            </>
          </ContainerFullWidth>
        }
      
      >
          <div className="flex justify-center mt-8 h-full  ">
        <PageContainerLarge>
    
          <div className="h-full flex flex-col">
            <CalendarDates />

            <div className="flex overflow-y-auto 
          
             border-t border-slate-200">
              <CalendarHours />
              <CalendarGrid />
            </div>
          </div>
        </PageContainerLarge>
      </div> 
      </FullPageSpaceFillerComponent>

   
    </div>
  );
};
