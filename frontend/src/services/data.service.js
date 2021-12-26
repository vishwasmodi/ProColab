import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:5000/api/";

const addproject = async (name, description, limit, github, tech) => {
  return axios.post(
    API_URL + "projects",
    {
      name,
      description,
      colaboratorsLimit: limit,
      githubRepo: github,
      techStack: tech,
    },
    {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
      },
    }
  );
};

const getprojects = async () => {
  return axios.get(API_URL + "projects");
};

export default {
  addproject,
  getprojects,
};
