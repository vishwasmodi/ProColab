import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import dataActions from "../actions/dataActions";

const Feed = (props) => {
  const projects = useSelector((state) => state.getprojects.projects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataActions.getProjects()).then(() => {
      console.log("Hi");
    });
  }, []);

  return (
    <div class="flex ">
      <h1>Feed</h1>
    </div>
  );
};

export default Feed;
