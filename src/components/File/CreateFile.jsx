import React from "react";
import Modal from "../utils/Modal";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addFile } from "../../features/Editor/editorSlice";
import config from "../../config.json";

const CreateFile = ({ handleClick }) => {
  const [filename, setFilename] = useState(null);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!filename || filename.length === 0) return;

      const [name, extension] = filename.split(".");

      if (
        !name ||
        !extension ||
        !Object.keys(config.languages).includes(extension)
      ) {
        setIsError(true);
        return;
      }

      dispatch(
        addFile({
          name,
          extension,
        })
      );

      handleClick();
    },
    [filename, dispatch, handleClick]
  );

  return (
    <Modal handleClick={handleClick} className={"max-w-[400px]"}>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="small-input"
            className="block mb-4  text-xl font-medium text-gray-400"
          >
            Create New File
          </label>
          <div className="flex justify-between gap-2">
            <input
              type="text"
              id="small-input"
              className={`block w-full p-2 border border-gray-300 rounded-lg h-1/2 bg-pr-gray text-base text-white focus:ring-blue-500 focus:border-blue-500 ${
                isError
                  ? "text-red-500 border-red-500 placeholder-red-500"
                  : null
              }`}
              onChange={(e) => setFilename(e.target.value)}
              onFocus={() => setIsError(false)}
              autoFocus
            />
            <button
              type="submit"
              className="text-whit font-medium rounded-lg text-base px-4 py-1.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              onke
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateFile;
