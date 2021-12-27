import React from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div>
      <div class="flex h-screen">
        <Sidebar class="flex-auto w-20" />
        <Feed class="flex-auto w-80" />
      </div>
    </div>
  );
};

export default Home;
