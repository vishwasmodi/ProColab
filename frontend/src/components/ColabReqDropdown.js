import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dataActions from "../actions/dataActions";

const ColabReqDropdown = () => {
  const [colabDropdown, setColabDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const requests = useSelector((state) => state.getcolabreqs.colabReqs);

  const setShowColabDropdown = (e) => {
    e.preventDefault();
    setLoading(true);
    setColabDropdown(!colabDropdown);
    if (colabDropdown)
      dispatch(dataActions.getColabReqs()).then(setLoading(false));
  };
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={setShowColabDropdown}
        class="bg-stone-400 hover:bg-blue-600 text-white font-bold px-2 py-2 rounded-full focus:outline-none focus:shadow-outline ml-6"
      >
        REQ
      </button>

      {colabDropdown ? (
        <div class="z-10 absolute overflow-auto">
          {requests.map((request) => {
            return (
              <div class="rounded shadow-lg pb-4 px-2 mb-2 w-72 bg-blue-100 opacity-90">
                <h1>{request.senderName}</h1>
                <h2>{request.projectName}</h2>
                <button class="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-1 rounded focus:outline-none focus:shadow-outline ml-6">
                  Accept
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-1 rounded focus:outline-none focus:shadow-outline ml-6">
                  Deny
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ColabReqDropdown;
