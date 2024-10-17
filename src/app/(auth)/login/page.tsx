"use client";

import { loginUser } from "@/app/Redux/auth/authSlice";
import { useAppSelector } from "@/app/Redux/hooks";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

interface UserData {
  email: string;
  password: string;
}

const Page = () => {
  const { isLoading } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  useEffect(() => {
    const tokenGet = localStorage.getItem("token");
    if (!tokenGet || tokenGet === "undefined") {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  const handlePasswordShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordShow((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const random = Math.random().toString(36).substr(2);
    if (email === "user@gmail.com" && password === "123456") {
      dispatch(
        loginUser({
          email,
          password,
          token: random.repeat(5),
        })
      );
      router.push("/dashboard");
    } else {
      toast.error("Login Failure, Check Your Credential's.");
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-950 flex items-center justify-center text-white">
      <div className="w-80 h-[60%] rounded-2xl bg-slate-900 flex items-center justify-center flex-col">
        <div className="h-[30%] space-y-2 text-center mt-3">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            By logging in, you accept our&nbsp;
            <a className="text-blue-500 hover:text-blue-700" href="#">
              terms&nbsp;
            </a>
            and &nbsp;
            <a className="text-blue-500 hover:text-blue-700" href="#">
              privacy policy&nbsp;
            </a>
            .
          </p>
        </div>

        <form
          className="w-full h-[75%] flex items-center justify-around flex-col"
          onSubmit={handleLoginUser}
        >
          <div className="flex h-[100%] flex-col gap-2 p-8 items-center justify-around">
            <input
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />

            <div className="bg-slate-900 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center">
              <input
                className="bg-transparent w-[80%] h-[100%] px-4 py-2 transition duration-300 ease-in-out focus:border-transparent focus:outline-none hover:border-black"
                placeholder="Password"
                type={passwordShow ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
              />
              <button
                onClick={handlePasswordShow}
                className="flex items-center justify-center w-[20%]"
              >
                {!passwordShow ? (
                  <IoEyeSharp className="text-xl" />
                ) : (
                  <FaEyeSlash className="text-xl" />
                )}
              </button>
            </div>
            <button
              className="w-full inline-block mt-2 cursor-pointer rounded-md bg-gray-700 px-4 py-2.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
              type="submit"
            >
              Login
            </button>

            {isLoading && (
              <div className="flex flex-row gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
              </div>
            )}

            <h6 className="text-center text-sm font-bold flex align-center justify-around flex-col">
              Use This User Data For Login
              <span className="text-slate-600"> email - user@gmail.com</span>
              <span className="text-slate-600">password - 123456</span>
            </h6>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
