"use client";

import { useAppSelector } from "@/app/Redux/hooks";
import { RootState } from "@/app/Redux/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {

    // const {token} = useAppSelector(((state:RootState)=> state.auth ))
    const publicRoutes = ["/login", "/register", `/register/[emailVerification]`];
    const router = useRouter();
    const pathName = usePathname();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token || token=="undefined") {
        if (!publicRoutes.includes(pathName)) {
          router.push("/login");
        }
      } else {
        if (publicRoutes.includes(pathName)) {
          router.push("/dashboard");
        
        } else {
          router.push(pathName);
        }
      }
    }, [token, pathName]);

    if (!token && !publicRoutes.includes(pathName)) {
      return (
        <div className="w-full h-[100vh] bg-slate-950 flex items-center justify-center flex-col py-8">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
