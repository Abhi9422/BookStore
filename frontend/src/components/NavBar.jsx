import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = ({ setShowSearch, showSearch }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Update the login state to false
    navigate("/login");
    window.location.replace('/login'); // Redirect to the login page
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium">
        <p className="text-3xl font-serif shadow-md p-3 rounded">
          BookStore...
        </p>

        {/* Only show NavLinks if the user is logged in */}
        {isAuthenticated && (
          <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            <NavLink to={"/"} className="flex flex-col items-center gap-1">
              <p>HOME</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to={"/collection"}
              className="flex flex-col items-center gap-1"
            >
              <p>COLLECTION</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to={"/about"} className="flex flex-col items-center gap-1">
              <p>ABOUT</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to={"/contact"}
              className="flex flex-col items-center gap-1"
            >
              <p>CONTACT</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </ul>
        )}

        <div className="flex items-center gap-6">
          {/* Search and profile buttons */}
          {isAuthenticated ? (
            <Link to = "/collection"> <img
            onClick={() => setShowSearch(!showSearch)}
             className="w-5 cursor-pointer"
            src={assets.search_icon}
            alt=""
          /></Link>
          ) : (
            <Link to="/login">
              <img
                className="w-5 cursor-pointer"
                src={assets.search_icon}
                alt="search icon"
              />
            </Link>
          )}

          {isAuthenticated ? (
            <div className="group z-50 relative">
              <img
                className="w-5 cursor-pointer"
                src={assets.profile_icon}
                alt="profile icon"
              />
              <div className="group-hover:block hidden absolute dropdown-menu pt-4 right-0">
                <div className="bg-slate-100 flex flex-col gap-2 py-3 px-5 w-36 text-gray-500 rounded">
                  <Link  onClick={()=>{localStorage.removeItem('token')
                  navigate("/register")
                  window.location.replace('/register')
                  }} to={"/register"}>
                    <p   className="cursor-pointer hover:text-black">
                     Register as Author
                    </p>
                  </Link>
                  <p
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <img
                className="w-5 cursor-pointer"
                src={assets.profile_icon}
                alt="profile icon"
              />
            </Link>
          )}

          <img
            className="w-5 cursor-pointer block sm:hidden"
            src={assets.menu_icon}
            alt="menu icon"
            onClick={() => setShowSidebar(true)}
          />
        </div>
      </div>

      {/* Sidebar - Only show if logged in */}
      {isAuthenticated && (
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out sm:hidden`}
        >
          <div className="p-6 flex justify-between items-center border-b-2">
            <p className="text-2xl font-serif">ShopFerry...</p>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-xl font-semibold"
            >
              &times;
            </button>
          </div>
          <ul className="flex flex-col gap-5 p-5 text-sm text-gray-700">
            <NavLink to={"/"} onClick={() => setShowSidebar(false)}>
              HOME
            </NavLink>
            <NavLink to={"/collection"} onClick={() => setShowSidebar(false)}>
              COLLECTION
            </NavLink>
            <NavLink to={"/about"} onClick={() => setShowSidebar(false)}>
              ABOUT
            </NavLink>
            <NavLink to={"/contact"} onClick={() => setShowSidebar(false)}>
              CONTACT
            </NavLink>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;
