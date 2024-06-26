import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

// Hooks
import { useOnClickOutside } from "../hooks/useOnClickOutside";

// Components
import { Disclosure, Popover, Transition } from "@headlessui/react";

// Assets
import { BiChevronRight } from "react-icons/bi";
import { menuItem } from "../atoms/menutItem";
import logo from "../assets/images/logo-cache.png";
import { useRef } from "react";

const CompSidebar = ({ sideOpen, setSideOpen }) => {
  const initNav = {
    pricelist: false,
  };
  const [navopen, setNavopen] = useState(initNav);
  const navOpen = (data) => {
    setNavopen({ ...initNav, [data]: !navopen[data] });
  };

  const ref = useRef();
  useOnClickOutside(ref, () => navOpen(initNav));

  return (
    <Fragment>
      <div
        onClick={() => setSideOpen(!sideOpen)}
        className={`fixed w-screen h-screen sm:hidden ${
          sideOpen ? "" : "hidden"
        }`}
      ></div>

      {/* Sidebar */}
      <div
        className={`${
          sideOpen ? "w-48 sm:w-60 left-0" : "w-14 -left-96 sm:left-0 sm:block"
        } z-10 fixed sm:relative h-screen flex flex-col bg-slate-600 shadow-lg shadow-slate-400 sm:shadow-none text-white transition-all rounded-r-3xl sm:rounded-none`}
      >
        {/* Logo */}
        <div className="w-full flex justify-center">
          <img className="w-32" src={logo} alt="logo" />
        </div>

        {/* Menu */}
        <div className="px-2 pt-1 pb-5 text-sm overflow-y-auto max-h-[80vh] hidden-scroll">
          {menuItem.map((menu, menuIdx) => {
            if (menu.subMenu.length === 0) {
              return (
                <NavLink
                  key={menuIdx}
                  to={menu.menuLink}
                  end={menuIdx === 0 ? true : false}
                >
                  {({ isActive }) => (
                    <div
                      className={`${
                        sideOpen
                          ? "flex px-3 py-2 rounded-lg"
                          : "block p-2 rounded-full shadow-md hover:shadow-xl"
                      } ${
                        isActive
                          ? "bg-white text-slate-600 shadow-md"
                          : "shadow-none"
                      } my-1 justify-between items-center w-full transition-all duration-150 hover:bg-white hover:text-slate-600 focus:outline-none`}
                    >
                      <span className={`${sideOpen ? "flex" : "block"}`}>
                        <span
                          className={` ${
                            sideOpen ? "text-lg" : "text-2xl"
                          } flex justify-center items-center`}
                        >
                          {menu.menuIcon}
                        </span>
                        <span className={`${sideOpen ? "ml-2" : "hidden"}`}>
                          {menu.menuName}
                        </span>
                      </span>
                    </div>
                  )}
                </NavLink>
              );
            }

            if (menu.subMenu.length >= 0 && sideOpen) {
              return (
                <Disclosure key={menuIdx} as={"div"} className="my-1">
                  <>
                    <Disclosure.Button
                      onClick={() => navOpen(menu.menuLink)}
                      className={`${
                        navopen[menu.menuLink]
                          ? "bg-white text-slate-600 shadow-md"
                          : ""
                      } ${
                        sideOpen
                          ? "flex px-3 py-2 rounded-lg"
                          : "block p-2 rounded-full hover:shadow-xl"
                      }
                      }  justify-between items-center w-full transition-all duration-150 hover:bg-white hover:text-slate-600`}
                    >
                      <span className={`${sideOpen ? "flex" : "block"}`}>
                        <span
                          className={` ${
                            sideOpen ? "text-lg" : "text-2xl"
                          } flex justify-center items-center`}
                        >
                          {menu.menuIcon}
                        </span>
                        <span className={`${sideOpen ? "ml-2" : "hidden"}`}>
                          {menu.menuName}
                        </span>
                      </span>
                      <BiChevronRight
                        className={`${sideOpen ? "" : "hidden"} ${
                          navopen[menu.menuLink] ? "rotate-90" : ""
                        } transition-all`}
                      />
                    </Disclosure.Button>
                    <Transition
                      show={navopen[menu.menuLink]}
                      className="overflow-hidden"
                      enter="transition-[max-height] duration-300 ease-in"
                      enterFrom="max-h-0"
                      enterTo="max-h-screen"
                      leave="transition-[max-height] duration-300 ease-out"
                      leaveFrom="max-h-screen"
                      leaveTo="max-h-0"
                    >
                      <Disclosure.Panel>
                        {menu.subMenu.map((subMenu, subMenuIdx) => (
                          <NavLink key={subMenuIdx} to={subMenu.subMenuLink}>
                            {({ isActive }) => (
                              <div
                                className={`${
                                  isActive ? "bg-white text-slate-600" : ""
                                } px-3 py-2 rounded-lg mt-1 ml-[26px] transition hover:bg-white hover:text-slate-600`}
                              >
                                {subMenu.subMenuName}
                              </div>
                            )}
                          </NavLink>
                        ))}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                </Disclosure>
              );
            }

            if (menu.subMenu.length >= 0 && !sideOpen) {
              return (
                <Popover key={menuIdx} as={"div"} className="my-1">
                  <Popover.Button
                    onClick={() => navOpen(menu.menuLink)}
                    className={`${
                      navopen[menu.menuLink]
                        ? "bg-white text-slate-600 shadow-md"
                        : ""
                    } ${
                      sideOpen
                        ? "flex px-3 py-2 rounded-lg"
                        : "block p-2 rounded-full hover:shadow-xl"
                    }
                      }  justify-between items-center w-full transition-all duration-150 hover:bg-white hover:text-slate-600`}
                  >
                    <span className={`${sideOpen ? "flex" : "block"}`}>
                      <span
                        className={` ${
                          sideOpen ? "text-lg" : "text-2xl"
                        } flex justify-center items-center`}
                      >
                        {menu.menuIcon}
                      </span>
                      <span className={`${sideOpen ? "ml-2" : "hidden"}`}>
                        {menu.menuName}
                      </span>
                    </span>
                    <BiChevronRight
                      className={`${sideOpen ? "" : "hidden"} ${
                        navopen[menu.menuLink] ? "rotate-90" : ""
                      } transition-all`}
                    />
                  </Popover.Button>
                  <Transition
                    show={navopen[menu.menuLink]}
                    className="absolute left-16 hidden sm:block"
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Popover.Panel
                      ref={ref}
                      className="bg-slate-600 w-36 p-1 rounded-lg shadow-md gap-1 flex flex-col"
                    >
                      {menu.subMenu.map((subMenu, subMenuIdx) => (
                        <NavLink key={subMenuIdx} to={subMenu.subMenuLink}>
                          {({ isActive }) => (
                            <div
                              className={`${
                                isActive
                                  ? "bg-white text-slate-600"
                                  : "hover:bg-white hover:text-slate-600"
                              } px-3 py-2 transition rounded-lg`}
                            >
                              {subMenu.subMenuName}
                            </div>
                          )}
                        </NavLink>
                      ))}
                    </Popover.Panel>
                  </Transition>
                </Popover>
              );
            }

            return <></>;
          })}
        </div>

        {/* Copyright */}
        {sideOpen && (
          <div className="text-[8px] text-center flex w-full mt-auto mb-2 items-center justify-center">
            Copyright &copy; PT. Queen Network Nusantara
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CompSidebar;
