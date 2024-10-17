"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { createChartValue } from "../Redux/chart/chartSlice";
import { useRouter } from "next/navigation";
import { RootState } from "../Redux/store";
import toast from "react-hot-toast";

interface SalesInfo {
  sales: number | null;
  purchase: number | null;
  month: string;
}

interface FormProps {
  isPopupOpen: boolean;
  setIsPopupOpen: (value: boolean) => void;
  togglePopup: () => void;
  name: string;
}

const Form = ({
  isPopupOpen,
  setIsPopupOpen,
  togglePopup,
  name,
}: FormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();


  const [salesInfo, setSalesInfo] = useState<SalesInfo>({
    sales: null,
    purchase: null,
    month: "",
  });

  const { sales, purchase, month } = salesInfo;

  const monthData = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSalesInfo({
      ...salesInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!sales || !purchase || !month) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(
      createChartValue({
        id: crypto.randomUUID(),
        sales: sales,
        purchase: purchase,
        month: month,
      })
    );
    setSalesInfo({
      sales: null,
      purchase: null,
      month: "",
    });

    toast.success("Successfully Save Data In Chart.");
    togglePopup();
    
  };
  console.log(salesInfo)

  return (
    <div className="bg-white p-6 rounded-md w-[25rem] h-[25rem] shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{name}</h2>

      <div>
        <label className="block mb-2 text-gray-700">
          Sales 
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Sales value"
          name="sales"
          value={sales ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-gray-700">
          Purchase 
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Purchase value"
          name="purchase"
          value={purchase ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-gray-700">Select Month</label>
        <select
          id=""
          className="w-full p-2 border border-gray-300 rounded-md"
          name="month"
          onChange={handleChange}
        >
          <option>Select Month</option>
          {monthData.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
          onClick={togglePopup}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          type="submit"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Form;
