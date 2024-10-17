"use client";

// import { register } from "@/app/Redux/auth/authSlice";
import { useAppDispatch } from "@/app/Redux/hooks";
import { RootState } from "@/app/Redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface UserData {
  name: string;
  email: string;
  password: string;
}

const page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isSuccess, isLoading, registerUser, message, isError } =
    useSelector((state: RootState) => state.auth);

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userData;

  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // dispatch(register(userData));
  };

  useEffect(() => {
    if (registerUser && isSuccess) {
      router.push(`/register/[emailVerification]`);
    } else if (isError && message) {
      toast.error(message);
    }
  }, [registerUser, isSuccess, isError, message]);

  const tokenGet = localStorage.getItem("token");

  useEffect(() => {
    if (tokenGet) {
      router.push("/dashboard");
    } else if (isError && message) {
      toast.error(message);
    }
  }, [tokenGet]);
  return (
    <div className="w-full h-[100vh] bg-slate-950 flex items-center justify-center  text-white">
      <div className="w-80 h-[60%] rounded-2xl bg-slate-900 flex items-center justify-center flex-col">
        <div className="h-[10%] space-y-2 text-center mt-3">
          <h1 className="text-2xl font-bold ">Register</h1>
        </div>
        <form
          action=""
          className="w-full h-[100%] flex items-center justify-center"
        >
          <div className="flex h-[90%] flex-col gap-2 p-8 items-center justify-around">
            <input
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="Name"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />

            <input
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <input
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />

            <button
              className="w-full inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-2.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </button>

            {isLoading ? (
              <>
                <div className="flex flex-row gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                </div>
              </>
            ) : (
              <>
                <p></p>
              </>
            )}

            <h6 className="text-center text-sm font-bold flex flex-col align-center justify-around">
              You have already account ,{" "}
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            </h6>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
