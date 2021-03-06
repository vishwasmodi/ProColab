import React, { useState } from "react";
import Search from "./Search";
import ColabReqDropdown from "./ColabReqDropdown";
import logo from "../static/pcLogo.png";
import avatar from "../static/avatar.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

const Nav = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div class="h-20 bg-gray-700 flex items-center justify-between ">
      <div class=" ml-8">
        <Link to="/">
          <img src={logo} class="h-14" alt="" />
        </Link>
      </div>
      <Search class="w-40 justify-between" />
      {isLoggedIn ? (
        <div class="flex  flex-row mr-10">
          <ColabReqDropdown />
          <Link to={`/profile/${user.username}`} class="flex">
            <img class="max-h-10 ml-20" src={avatar} alt="" />
            <h2 class="flex text-lg ml-2 mr-4 mt-2 text-white">{user.name}</h2>
          </Link>
          <button
            onClick={handleLogout}
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline ml-6"
          >
            Logout
          </button>
        </div>
      ) : (
        <div class="flex flex-row mr-10">
          <Link to="/login">
            <button class=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-6">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button class=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-6">
              SignUp
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
