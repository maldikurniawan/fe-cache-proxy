import React, { Fragment, useContext, useEffect, useState } from "react";
import { icons } from "../../../public/assets/icons";
import { Popover, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "@/context/ThemeContext";
import { API_URL_updatesuperuser } from '@/constants';
import axios from 'axios';
import { Switch } from "@/components"

const Header = ({ sideOpen, setSideOpen }) => {
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt_access");
    localStorage.removeItem("jwt_refresh");
    navigate("/login");
  };
  const { colorMode, setColorMode } = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  // Function to toggle color mode
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    axios
      .get(`${API_URL_updatesuperuser}${userId}/`)
      .then((response) => {
        const { user, user_data } = response.data;
        setUsername(user.username);
        setProfileImageUrl(user_data.foto_profile); // Set the profile image URL
      })
  }, [userId]);

  return (
    <Fragment>
      <div className="w-full flex bg-white dark:bg-[#1E293B] dark:text-white py-2 justify-between items-center px-3 drop-shadow-sm">
        <div
          onClick={() => setSideOpen(!sideOpen)}
          className={`p-1 rounded-lg bg-white text-slate-600 text-xl cursor-pointer hover:bg-slate-100 transition-all`}
        >
          {icons.himenualt2}
        </div>

        <div className="flex items-center gap-4">
          <Switch toggleColorMode={toggleColorMode} colorMode={colorMode} />

          <Popover as={"div"} className="flex relative">
            <Popover.Button>
              <div className="w-10 h-10 rounded-full cursor-pointer overflow-hidden">
                <img
                  className="object-cover h-full w-full"
                  src={profileImageUrl ? profileImageUrl : 'assets/images/nophoto.png'}
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
                  <div className="text-xs font-medium capitalize">
                    {username}
                  </div>
                  <div className="text-[10px]">Admin</div>
                </div>
                <div className="flex flex-col">
                  <Link
                    to="/profile"
                    className="text-xs py-2 px-2 rounded-lg text-left hover:bg-white hover:text-slate-600 transition-all"
                  >
                    Edit Profile
                  </Link>
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
      </div>
    </Fragment>
  );
};

export default Header;
