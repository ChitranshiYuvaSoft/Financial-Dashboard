"use client";

import withAuth from "./hoc/withAuth";

const LayoutWrapper = ({ children }: any) => {
  return <>{children}</>;
};

export default withAuth(LayoutWrapper);
