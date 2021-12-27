import * as actions from "./types";
import DataServices from "../services/data.service";

const addProject = (name, description, limit, github, tech) => (dispatch) => {
  return DataServices.addproject(name, description, limit, github, tech).then(
    (response) => {
      dispatch({
        type: actions.ADD_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const getProjects = () => (dispatch) => {
  return DataServices.getprojects().then(
    (response) => {
      dispatch({
        type: actions.GET_PROJECTS_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const joinProject = (id) => (dispatch) => {
  return DataServices.joinproject(id).then(
    (response) => {
      dispatch({
        type: actions.JOIN_REQ_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const getColabReqs = () => (dispatch) => {
  return DataServices.getcolabreqs().then(
    (response) => {
      dispatch({
        type: actions.GET_COLAB_REQ_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};
export default {
  addProject,
  getProjects,
  joinProject,
  getColabReqs,
};
