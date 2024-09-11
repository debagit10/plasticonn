import React, { ReactNode } from "react";

import Navbar from "../components/side_nav/Navbar";
import SideBar from "../components/side_nav/SideBar";

interface ContainerProps {
  children: ReactNode;
}

const Side_nav_container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="bg-[#0B490D] h-[100vh] fixed w-[15%] rounded-tr-lg rounded-br-lg hidden md:block">
        <SideBar />
      </div>

      <div className="h-[100vh] md:ml-[15%] ">
        <Navbar />
      </div>

      <div className="mt-20">{children}</div>
    </div>
  );
};

export default Side_nav_container;
