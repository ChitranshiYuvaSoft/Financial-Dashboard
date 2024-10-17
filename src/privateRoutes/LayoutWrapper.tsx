"use client";

import React from "react";
import withAuth from "./hoc/withAuth";

interface LayoutWrapperProps {
  children: React.ReactNode; 
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

export default withAuth(LayoutWrapper);
