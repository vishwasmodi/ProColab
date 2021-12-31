import axios from "axios";

const API_URL = "/api/";
const register = async (
  name,
  username,
  email,
  password,
  cfUsername,
  ccUsername,
  ghUsername
) => {
  console.log(cfUsername);
  return axios
    .post(API_URL + "users", {
      name,
      username,
      email,
      password,
      cfUsername,
      ccUsername,
      ghUsername,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const login = async (username, password) => {
  return axios
    .post(API_URL + "auth", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
