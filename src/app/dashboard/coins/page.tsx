"use client";
import { getCoinData } from "@/app/Redux/coin/coinSlice";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { RootState } from "@/app/Redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const { coins = [], isLoading, isError } = useAppSelector(
    (state: RootState) => state.coin
  );

  useEffect(() => {
    dispatch(getCoinData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
      </div>
    </div>
    );
  }

  if (isError) {
    return <div>Error loading coins!</div>;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[95%] h-[95%] flex items-center justify-center flex-wrap relative overflow-x-auto shadow-md sm:rounded-lg">
        {coins.length === 0 ? (
          <div>No Coins Yet!!</div>
        ) : (
          coins.map((item: any, index: number) => (
            <div
              className="w-[20%] mx-6 my-2 max-h-[60%] bg-white p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <Link href="#" className="max-h-[50%] w-full flex items-center justify-center mt-4">
                <img
                  src={item?.image}
                  alt="coin"
                  className="w-[50%] h-[40%]"
                />
              </Link>
              <div className="p-5 w-full max-h-[50%] flex items-center justify-around flex-col">
                <Link href="#">
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-justify">
                    {item.id}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-xl" >
                  {item.symbol}
                </p>
                <Link
                  href={`/dashboard/coins/${item.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
