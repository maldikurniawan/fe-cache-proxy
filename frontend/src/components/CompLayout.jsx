import React, { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";

// components
import CompSidebar from "./CompSidebar";
import CompHeader from "./CompHeader";

const CompLayout = () => {
  const [sideOpen, setSideOpen] = useState(
    window.innerWidth < 640 ? false : true
  );
  return (
    <Fragment>
      <div className="flex ">
        <CompSidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
        <div className="w-full h-screen overflow-clip flex flex-col">
          <CompHeader sideOpen={sideOpen} setSideOpen={setSideOpen} />
          <div className="bg-slate-100 h-full overflow-y-auto custom-scroll px-8 py-10">
            <Outlet />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CompLayout;
