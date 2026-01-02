import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import ThemeToggle from "../Darktoogle/themetoggle";

export default function NavBar() {
  const authInfo = useContext(AuthContext);
  const user = authInfo.user;

  const handleSignOut = () => {
    authInfo
      .signoutUser()
      .then(() => { })
      .catch((error) => console.error("❌ Sign-out error:", error));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allproducts">All Products</NavLink>
      </li>
      <li>
        <NavLink to="/addexports">Add Exports</NavLink>
      </li>
      <li>
        <NavLink to="/myimports">My Imports</NavLink>
      </li>
      <li>
        <NavLink to="/myexports">My Exports</NavLink>
      </li>

    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <img
        src="./logo.png"
        alt="logo"
        className="w-12 h-12 ml-4 rounded-full"
      />
      <ThemeToggle />
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-base-100"
          >
            {links}
          </ul>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="relative group">
              <img
                src={user.photoURL || "vite.svg"}
                alt="user avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-sm rounded px-2 py-1">
                {user.displayName}
              </div>
            </div>
            <button onClick={handleSignOut} className="btn btn-sm">
              Log out
            </button>
          </div>
        ) : (
          <div>
            <NavLink to="/login" className="btn">
              Login
            </NavLink>
            <NavLink to="/registration" className="btn btn-primary ml-2">
              Sign up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
