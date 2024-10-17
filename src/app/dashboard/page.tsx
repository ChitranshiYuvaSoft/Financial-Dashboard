"use client";
import React, { useState } from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import Form from "../components/Form";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import { useCopilotReadable } from "@copilotkit/react-core";

interface Item {
  id: string;
  sales: string;
  purchase: string;
  month: string;
}

const Page = () => {
  const name = "Add New Data";
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const { lineChartData } = useAppSelector((state: RootState) => state.chart);

  useCopilotReadable({
    description: "The current user's colleagues",
    value: lineChartData,
  });

  return (
    <div className="w-full h-[100%] flex items-center justify-center flex-col">
      <div className="w-[95%] h-[95%] flex items-center justify-between  flex-wrap  relative overflow-x-auto shadow-md sm:rounded-lg ">
        <div className="w-[100%] h-[25rem] flex items-center justify-center flex-col my-2 p-2 bg-slate-900 border-2 border-slate-800">
          <div className="w-[100%] h-[15%] flex items-center justify-end my-2 p-2">
            <button
              className="px-4 py-1 text-xs bg-slate-200 text-black mx-1 font-bold"
              onClick={togglePopup}
            >
              Add
            </button>
          </div>
          <div className="w-[100%] h-[85%] flex items-center justify-center pb-2">
            {" "}
            <LineChart />
          </div>
        </div>
        <div className="w-[31%] h-[20rem] flex items-center justify-center flex-col my-2 p-2 bg-slate-900 border-2 border-slate-800">
          <div className="w-full h-[10%] flex items-center justify-start my-2">
            <h1 className="text-md text-slate-300 font-semibold">
              Monthly Expenses
            </h1>
          </div>
          <div className="w-full h-[70%] flex items-center justify-center">
            <PieChart />
          </div>
        </div>
        <div className="w-[65%] h-[20rem] flex items-center justify-center my-2 p-2 bg-slate-900 border-2 border-slate-800">
          <BarChart />
        </div>
        <div className="container mx-auto  py-8 w-full h-[10rem] flex items-center justify-center px-6">
          <div className="w-full h-[100%] flex flex-wrap items-center justify-between gap-7">
            {lineChartData.map((item: Item, index: number) => (
              <div
                key={index}
                className="w-[28%] bg-gradient-to-r from-sky-500 to-blue-950 rounded-lg p-6 shadow-lg text-white"
              >
                <h2 className="text-xl font-semibold mb-2">
                  Sales and Purchase
                </h2>
                <p className="text-gray-200">Sales : {item.sales}</p>
                <p className="text-gray-200">Purchase : {item.purchase}</p>
                <p className="text-gray-200">Month : {item.month}</p>
              </div>
            ))}
          </div>
        </div>

        <CopilotPopup
          instructions={
            "You are assisting the user as best as you can. Ansewr in the best way possible given the data you have."
          }
          labels={{
            title: "Popup Assistant",
            initial: "Need any help?",
          }}
        />
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Form
            name={name}
            isPopupOpen={isPopupOpen}
            setIsPopupOpen={setIsPopupOpen}
            togglePopup={togglePopup}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
