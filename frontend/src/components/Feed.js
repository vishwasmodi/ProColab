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
    <div class="m-auto mt-8">
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project._id}
            name={project.name}
            description={project.description}
            githubRepo={project.githubRepo}
            techStack={project.techStack}
            colaborators={project.colaborators}
            votes={project.votes}
            colaboratorsLimit={project.colaboratorsLimit}
            user={project.user}
            userName={project.userName}
          />
        );
      })}
    </div>
  );
};

export default Feed;
