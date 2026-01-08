import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import config from "../config";

function Header() {
  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );

  function themeChange(isDarkTheme) {
    // Here, you can implement the logic to change the theme based on the `isDarkTheme` parameter.
    // You might update CSS classes, update styles, or toggle classes on the root HTML element.
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add("dark-theme");
    } else {
      root.classList.remove("dark-theme");
    }
  }

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
  }, []);

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  function logoutUser() {
    axios
      .post(`${config.baseUrl}/logout`)
      .then((response) => {
        // Assuming your backend returns a message indicating successful logout
        if (response.data.message === "Logged out successfully") {
          // Clear local storage
          localStorage.clear();
          // Redirect to the home page or any other desired route
          window.location.href = "/admin/login";
        } else {
          // Handle any other response from the backend
          console.error("Logout failed:", response.data);
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

  return (
    <>
      <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toggle for mobile view or small screen */}
        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
        </div>

        <div className="order-last">
          {/* Light and dark theme selection toggle {/*
          {/* <label className="swap">
            <input type="checkbox" />
            <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={`fill-current w-6 h-6 ${currentTheme === 'dark' ? 'swap-on' : 'swap-off'}`} />
            <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={`fill-current w-6 h-6 ${currentTheme === 'light' ? 'swap-on' : 'swap-off'}`} />
          </label>*/}

          {/* Notification icon */}
          {/*   <button className="btn btn-ghost ml-4  btn-circle" onClick={openNotification}>
            <div className="indicator">
              <BellIcon className="h-6 w-6" />
              {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null}
            </div>
          </button>*/}

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://www.dubaiprivatetour.com/assets/images/logo-sm.png"
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link to={"/app/settings-profile"}>
                  Profile Settings
                  <span className="badge">New</span>
                </Link>
              </li>
              <li className="">
                <Link to={"/app/settings-billing"}>Bill History</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <Link onClick={logoutUser}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
