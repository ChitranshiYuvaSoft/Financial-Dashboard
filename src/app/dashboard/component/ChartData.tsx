"use client";
import { useAppSelector } from "@/app/Redux/hooks";
import { RootState } from "@/app/Redux/store";
import { MdAddChart } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { editChartValue, removeChartValue } from "@/app/Redux/chart/chartSlice";
import toast from "react-hot-toast";
import { useState } from "react";

interface LineChartItem {
  id: string;      
  sales: string;
  purchase: string;
  month: string;
}

interface PropsFunction {
  togglePopup: () => void;
  isDataTogglePopup: () => void;
}

const ChartData = ({ togglePopup, isDataTogglePopup }: PropsFunction) => {
  const dispatch = useDispatch();
  const { lineChartData } = useAppSelector((state: RootState) => state.chart);

  const deleteChartData = (index: number) => {
    toast((t) => (
      <span className="w-[10rem] h-[8rem] bg-white flex items-center justify-around flex-col">
        <span className="w-full flex items-center justify-center my-2">
          <RxCrossCircled className="font-bold text-red-800 text-3xl" />
        </span>
        <p className="text-center font-bold text-slate-700 mb-">
          Are You Sure!!
        </p>

        <span className="w-full flex items-center justify-center my-2">
          <button
            onClick={() => {
              dispatch(removeChartValue(index));
              toast.dismiss(t.id);
            }}
            className="px-2 py-1 bg-red-700 text-white text-xs font-bold"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-2 py-1 bg-slate-400 text-white text-xs font-bold"
          >
            Dismiss
          </button>
        </span>
      </span>
    ));
  };

  // State
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleToggleEditChartOpen = (item: LineChartItem) => { 
    setIsPopupOpen(!isPopupOpen);
    dispatch(editChartValue(item));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 w-[40rem] h-[25rem] shadow-lg overflow-y-scroll">
        <div className="w-full h-[20%] flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">Show Data</h2>
          <span className="w-[40%] h-[100%] flex justify-end mt-6">
            <button
              className="h-[60%] px-2 py-2 bg-white text-white mr-2"
              onClick={togglePopup}
            >
              <MdAddChart className="text-xl font-bold text-green-600" />
            </button>
            <button
              className="h-[60%] px-2 py-2 bg-white text-white mr-2"
              onClick={isDataTogglePopup}
            >
              <RxCross2 className="text-xl font-bold text-red-800" />
            </button>
          </span>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase dark:text-gray-400">
            <tr className="w-full h-[4rem]">
              <th scope="col" className="px-6 py-3 text-slate-800 font-semibold text-center text-sm">
                No.
              </th>
              <th scope="col" className="px-6 py-3 text-slate-800 font-semibold text-center text-sm">
                Month
              </th>
              <th scope="col" className="px-6 py-3 text-slate-800 font-semibold text-center text-sm">
                Sales
              </th>
              <th scope="col" className="px-6 py-3 text-slate-800 font-semibold text-center text-sm">
                Purchase
              </th>
              <th scope="col" className="px-6 py-3 text-slate-800 font-semibold text-center text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {lineChartData.map((item: LineChartItem, index: number) => {
              return (
                <tr className="border-b border-gray-200 dark:border-gray-700" key={index}>
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center">{item.month}</td>
                  <td className="px-6 py-4 text-gray-600 text-center">{item.sales}</td>
                  <td className="px-6 py-4 text-center">{item.purchase}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="px-2 py-1 text-sm text-slate-300 bg-yellow-600 mx-3"
                      onClick={() => handleToggleEditChartOpen(item)}
                    >
                      <CiEdit className="text-sm font-semibold" />
                    </button>
                    <button
                      className="px-2 py-1 text-sm text-slate-300 bg-red-800 mx-3"
                      onClick={() => deleteChartData(index)}
                    >
                      <MdDeleteForever className="text-sm font-semibold" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          {/* <div className="bg-white p-6 rounded-md w-[25rem] h-[25rem] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Update Data</h2>
          </div> */}
          {/* <Form /> */}
        </div>
      )}
    </div>
  );
};

export default ChartData;
