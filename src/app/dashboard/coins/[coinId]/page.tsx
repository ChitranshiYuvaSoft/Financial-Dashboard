"use client";
import { getCoinDetails } from "@/app/Redux/coin/coinSlice";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const dispatch = useAppDispatch();
  const { coinId } = useParams();

  const { coin, isLoading, isSuccess, isError } = useAppSelector(
    (state: RootState) => state.coin
  );

  useEffect(() => {
    dispatch(getCoinDetails(coinId));
  }, []);

  if (isLoading) {
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[100%] flex items-center justify-center">
      <div className="w-[95%] h-[95%] flex items-center flex-col justify-center  flex-wrap relative overflow-x-auto shadow-md sm:rounded-lg ">
        <div className="w-full h-[10%]">
          <h2 className="text-2xl text-slate-200 font-semibold text-start">
            Coin Info - {coinId}
          </h2>
        </div>
        <div className="w-full h-[90%] flex items-center justify-center flex-col ">
          <div className="w-full h-[80%] flex items-center justify-around">
            <div className="w-[30%] h-[95%] flex items-center justify-center flex-col">
              <div className="w-[100%] h-[70%] flex items-center justify-center bg-white">
                <img
                  src={coin?.image?.large}
                  alt="no"
                  className="w-[50%] h-[60%]"
                />
              </div>
              <div className="w-[100%] h-[30%]  flex items-center justify-center flex-col">
                <h3 className="text-slate-300 text-xl font-bold">
                  Name: {coin?.name}
                </h3>
                <h4 className="text-slate-300 textxgl font-bold mt-1">
                  Symbol: {coin?.symbol}
                </h4>
              </div>
            </div>
            <div className="w-[58%] h-[95%]"></div>
          </div>
          <div className="w-full h-[20%] flex flex-col items-start justify-around px-3">
            <h5 className="text-slate-300 text-sm">
              {" "}
              Current price[INR]: {coin?.market_data?.current_price?.inr}
            </h5>
            <h5 className="text-slate-300 text-sm">
              {" "}
              Current price[USD]: {coin?.market_data?.current_price?.usd}
            </h5>
            <p className="text-slate-300 text-sm">{coin.description?.en}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
