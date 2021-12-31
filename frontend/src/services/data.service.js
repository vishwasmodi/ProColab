import axios from "axios";

const API_URL = "/api/";

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

const joinproject = async (id) => {
  return axios.post(
    API_URL + "colaboratorsReq",
    {
      projectId: id,
    },
    {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
      },
    }
  );
};

const getcolabreqs = async () => {
  return axios.get(API_URL + "colaboratorsReq", {
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
    },
  });
};

const respondtoreq = async (status, reqId) => {
  return axios.post(
    API_URL + "colaboratorsReq/" + reqId.toString(),
    {
      status: status,
    },
    {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
      },
    }
  );
};

const getprofile = async (username) => {
  return axios.get(API_URL + "profile/" + username);
};

export default {
  addproject,
  getprojects,
  joinproject,
  getcolabreqs,
  respondtoreq,
  getprofile,
};
