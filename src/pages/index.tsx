// import Image from 'next/image'
// import { Inter } from 'next/font/google'

import { Calendar } from "@/features/calendar";

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>Calendar</h1>

      <div className="flex justify-between">
        <div className="bg-slate-100 p-2 flex items-center text-slate-600">
          {" "}
          <span>Week Total</span>
          <span>.</span>
          <span>62:15:44</span>
        </div>

        <div className="flex items-start">
          <div className="mr-8">
            <div className="bg-white rounded-md border-slate-300 border-solid border py-2 px-6">
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
          <div className="bg-white rounded-md border-slate-300 border-solid border py-2 px-6">
            Week view ^
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8  ">
        <div className="bg-white w-[calc(100vw-60px)] content-center p-8 shadow-lg rounded border-purple-600 border-solid border-t-8 max-h-[calc(80vh)] ">
         
        
          <Calendar />


    
        </div>
      </div>
    </div>
  );
}
