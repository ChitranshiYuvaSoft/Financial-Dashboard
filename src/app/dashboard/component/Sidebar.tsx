"use client";

import { FaCoins } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/app/Redux/store";
import { useAppSelector } from "@/app/Redux/hooks";

const Sidebar = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const logoutUser = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="w-[20%] h-[98%] bg-slate-950 rounded-xl flex flex-col items-center justify-between">
      <div className="w-full h-[13%] rounded-xl border-t-2 border-l-2 border-r-2 border-slate-800 shadow-inner flex items-center justify-between">
        <div className="w-[20%] h-[70%] bg-slate-900 rounded-full ml-1">
          <Image src={"/user.png"} width={100} height={100} alt="noUser" />
        </div>
        <div className="w-[73%] h-[50%] flex items-start justify-around flex-col pl-1">
          <h6 className="text-white text-xs">{user.name}</h6>
          <p className="text-slate-300 text-xs">{user.email}</p>
        </div>
      </div>
      <div className="w-full h-[50%] shadow-inner flex items-center justify-start pl-5">
        <ul className="w-full h-[100%] flex items-start justify-satrt flex-col">
          <Link href="/dashboard/coins">
            <li className="text-slate-200 font-semibold text-sm flex items-center justify-around my-4">
              <span className="mr-5">
                <FaCoins className="text-xl" />
              </span>{" "}
              Coins
            </li>
          </Link>
        </ul>
      </div>
      <div className="w-full h-[10%] shadow-inner flex items-center justify-between pl-5">
        <ul className="w-full h-[100%] flex items-start justify-around flex-col">
          <button
            className="w-[95%]  py-3 px-3 text-slate-200 font-semibold text-sm bg-red-800 flex items-center justify-center"
            onClick={logoutUser}
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
