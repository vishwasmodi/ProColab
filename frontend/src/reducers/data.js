import * as actions from "../actions/types";

const initialStateGet = {
  projects: [],
  loading: false,
};

const initialStateAdd = {
  newProject: {},
  loading: false,
};

export function addproject(state = initialStateAdd, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_SUCCESS:
      return {
        ...state,
        newProject: payload,
        loading: false,
      };
    case actions.ADD_FAIL:
      return state;
    default:
      return state;
  }
}

export function getprojects(state = initialStateGet, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case actions.GET_PROJECTS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
