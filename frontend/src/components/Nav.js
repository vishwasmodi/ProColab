import React from "react";
import Search from "./Search";

const Nav = () => {
  return (
    <div class="h-12 bg-slate-300 flex justify-evenly items-center ">
      <div class="flex-auto w-20 m-auto">Logo</div>
      <Search class="flex-auto w-40 justify-between" />
      <div class="flex-auto w-40 ">Profile</div>
    </div>
  );
};

export default Nav;
