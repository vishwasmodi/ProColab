import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
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
      <div class="flex space-between justify-between mb-4 pb-2">
        <h1 class="font-bold text-3xl mb-2">&nbsp; &nbsp;Top Projects</h1>

        <Link to="/addproject" class="flex items-stretch ">
          <button
            class="flex  mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            // disabled={loading}
          >
            Add Your Own Project!
            {/* {loading === true ? (
          <svg
            class=" bg-blue-500 border-t-white border-2 rounded-full animate-spin h-5 w-5 mr-3  ..."
            viewBox="0 0 24 24"
          ></svg>
        ) : null} */}
          </button>
        </Link>
      </div>
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
