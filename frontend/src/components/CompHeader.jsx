import React, { Fragment } from "react";
import { icons } from "../../public/assets/icons";
import { Popover, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const CompHeader = ({ sideOpen, setSideOpen }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <Fragment>
      <div className="w-full flex bg-white py-2 justify-between items-center px-3 drop-shadow-sm">
        <div
          onClick={() => setSideOpen(!sideOpen)}
          className={`p-1 rounded-lg bg-white text-slate-600 text-xl cursor-pointer hover:bg-slate-100 transition-all`}
        >
          {icons.himenualt2}
        </div>
        <Popover as={"div"} className="flex relative">
          <Popover.Button>
            <div className="w-10 h-10 rounded-full cursor-pointer overflow-hidden">
              <img
                className="object-cover h-full w-full"
                src={"https://picsum.photos/200"}
                alt="user"
              />
            </div>
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute w-max min-w-[170px] flex flex-col right-3 top-14 rounded-lg shadow-lg bg-[#0F172A] pt-3 pb-1 px-1 text-white">
              <div className="px-2 pb-2">
                <div className="text-xs font-medium">
                  M. Aldi Kurniawan
                </div>
                <div className="text-[10px]">Admin</div>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={handleLogout}
                  className="text-xs py-2 px-2 rounded-lg text-left hover:bg-white hover:text-slate-600 transition-all"
                >
                  Keluar
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </Fragment>
  );
};

export default CompHeader;
