import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger menu button for small screens */}
      <button
        className="md:hidden p-2 m-2 text-gray-600 border  font-mono focus:outline-none"
        onClick={toggleSidebar}
      >
        manage
      </button>

      {/* Sidebar content */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block bg-slate-100 max-h-96 shadow-lg md:w-64 w-48 p-4 fixed md:relative z-10`}
      >
        <h2 className="text-xl font-bold mb-4">Book Management</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin"
              className="block p-2 rounded-lg hover:bg-gray-200"
            >
              Add New Book
            </Link>
          </li>
          <li>
            <Link to="/list" className="block p-2 rounded-lg hover:bg-gray-200">
              List Books
            </Link>
          </li>
          <li></li>
        </ul>
      </div>

      {/* Overlay to close the sidebar when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default SideBar;
