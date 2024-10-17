"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const token = localStorage.getItem("token");
  const router = useRouter();
  return (
    <div className="w-full h-[100vh] bg-slate-950 flex items-center justify-center flex-col">
      <div className="w-full h-[10%] flex items-end justify-between shadow-md shadow-slate-700">
        <span className="w-[20%] h-[100%] flex items-center justify-center">
          <h1 className="text-white font-bold text-xl">Financial Dashboard</h1>
        </span>

       
      </div>
      <div className="w-full h-[90%] bg-bluw-900 flex items-center justify-center flex-col">
        {/* <div className="w-[50%] h-[100%] "></div>
        <div className="w-[50%] h-[100%]"></div> */}
        <div className="w-full h-[100%] flex items-center justify-center shadow-md shadow-slate-700 flex-col">
          <h1 className="text-white text-4xl font-bold text-center">Welcome To <span className="text-green-600">Financial</span> Dashboard</h1>
        <div className="w-full h-[50%] flex items-center justify-center">
          <Image src={'/wlcm.gif'} alt="noImg" width={150}  height={300}/>
        </div>
        <div className="w-full h-[10%] flex items-center justify-center">
        {token ? (
          <>
            <span className="w-[20%] h-[100%] flex items-center justify-around">
              <button
                className="px-5 py-1 text-sm font-bold text-slate-900 bg-white "
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="px-5 py-1 text-sm font-bold text-slate-900 bg-white"
                onClick={() => router.push("/register")}
              >
                Register
              </button>
            </span>
          </>
        ) : (
          <></>
        )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default page;
