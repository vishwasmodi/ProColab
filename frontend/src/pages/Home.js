import React from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Messenger from "../components/Messenger";

const Home = () => {
  return (
    <div>
      <div class="flex relative w-full overflow-hidden">
        <Sidebar />
        <Feed />
        <Messenger />
      </div>
    </div>
  );
};

export default Home;
