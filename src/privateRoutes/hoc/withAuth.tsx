"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const publicRoutes = ["/login", "/register", `/register/[emailVerification]`];
    const router = useRouter();
    const pathName = usePathname();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token || token === "undefined") {
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
    }, [token, pathName, publicRoutes, router]); 

    if (!token && !publicRoutes.includes(pathName)) {
      return (
        <div className="w-full h-[100vh] bg-slate-950 flex items-center justify-center flex-col py-8">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default withAuth;
