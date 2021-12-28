import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dataActions from "../actions/dataActions";

const ProjectCard = ({
  id,
  name,
  description,
  githubRepo,
  techStack,
  colaborators,
  votes,
  colaboratorsLimit,
  user,
  userName,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleJoinProject = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(dataActions.joinProject(id)).then(setLoading(false));
  };
  return (
    <div class="">
      <div class="max-w-lg rounded overflow-hidden shadow-lg pb-4 mb-4">
        <div class="px-6 py-4">
          <div class="flex space-between">
            <div class="font-bold text-xl mb-2">{name}</div>
            <div class="text-l ml-10">{userName}</div>
          </div>
          <p class="text-gray-700 text-base">{description}</p>
          <h2 class="text-gray-700 text-base mt-3">
            Github Repo:
            <Link to={`${githubRepo}`}> {githubRepo}</Link>{" "}
          </h2>
        </div>
        <div class="px-6 pt-4 pb-2">
          {techStack.map((tech) => {
            return (
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {tech}
              </span>
            );
          })}
        </div>
        <div class="flex justify-end mr-6">
          <button
            onClick={handleJoinProject}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            <span>Join Project</span>
            {loading === true ? (
              <svg
                class=" bg-blue-500 border-t-white border-2 rounded-full animate-spin h-5 w-5 mr-3  ..."
                viewBox="0 0 24 24"
              ></svg>
            ) : null}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
