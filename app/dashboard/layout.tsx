import AsideBar from "@/components/common/AsideBar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <AsideBar />
      {children}
    </div>
  );
};

export default DashboardLayout;
