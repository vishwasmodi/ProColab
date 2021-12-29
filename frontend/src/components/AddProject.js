import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dataActions from "../actions/dataActions";
import { useNavigate } from "react-router-dom";

const AddProject = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState(2);
  const [github, SetGithub] = useState("");
  const [tech, setTech] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const sucessMsg = "Project added sucessfully!";
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  // useEffect(() => {
  //   console.log(editorState);
  // }, [editorState]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeGithub = (e) => {
    SetGithub(e.target.value);
  };
  const onChangeLimit = (e) => {
    setLimit(e.target.value);
  };
  const onChangeTech = (e) => {
    setTech(e.target.value);
  };

  const dispatch = useDispatch();

  const handleAddProject = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowMessage(false);
    dispatch(
      dataActions.addProject(name, description, limit, github, tech)
    ).then(() => {
      setLoading(false);
      setShowMessage(true);
    });
  };
  const navigate = useNavigate();
  return (
    <div>
      <div class="flex justify-end mr-12 mt-4">
        <button
          onClick={() => navigate("/", { replace: true })}
          class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back
        </button>
      </div>
      <div class="flex ml-24 mt-12 ">
        <form
          class="justify-start bg-gray-100 shadow-md rounded pl-10 pr-60 pt-6 pb-8 w-3/5"
          onSubmit={handleAddProject}
        >
          <div>
            <label
              class="block text-gray-700 text-lr font-bold mb-2  mt-5"
              for="projectName"
            >
              Project Name
            </label>
            <input
              type="text"
              class="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              value={name}
              onChange={onChangeName}
            />
          </div>

          <div>
            <label
              class="block text-gray-700 text-lr font-bold mb-2  mt-5"
              for="projectDescription"
            >
              Project Description
            </label>
            {/* <div class="shadow appearance-none border-rounded w-full py-3 px-3 h-60  bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline ">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              class="overflow-auto max-h-60 max-w-md"
            />
          </div> */}
            <input
              type="text"
              class="shadow appearance-none border rounded w-full py-28 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={onChangeDescription}
            />
          </div>

          <div>
            <label
              class="block text-gray-700 text-lr font-bold mb-2  mt-5"
              for="projectLimit"
            >
              Max Limit for colaborators
            </label>
            <input
              type="number"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={limit}
              onChange={onChangeLimit}
            />
          </div>

          <label
            class="block text-gray-700 text-lr font-bold mb-2  mt-5"
            for="github"
          >
            Github Link
          </label>
          <input
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={github}
            onChange={onChangeGithub}
          />

          <div>
            <label
              class="block text-gray-700 text-lr font-bold mb-2 mt-5"
              for="projectTech"
            >
              Tech Stack Used
            </label>
            <input
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={tech}
              onChange={onChangeTech}
            />
          </div>

          <div class="flex items-center justify-between pt-10 ">
            <button
              class="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              <span>Add Project</span>
              {loading === true ? (
                <svg
                  class=" bg-blue-500 border-t-white border-2 rounded-full animate-spin h-5 w-5 mr-3  ..."
                  viewBox="0 0 24 24"
                ></svg>
              ) : null}
            </button>
            {showMessage && (
              <div class="mb-3">
                <div class="text-green-500 text-mb italic" role="alert">
                  {sucessMsg}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
