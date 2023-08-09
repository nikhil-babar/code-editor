import React, { useCallback, useState } from "react";
import Modal from "../utils/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectFile, updateFile } from "../../features/Editor/editorSlice";

const UpdateFile = ({ handleClose, fileId }) => {
  const file = useSelector((state) => selectFile(state.editor, fileId));
  const [filename, setFilename] = useState(file.nameWithExtension);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!filename || filename.length === 0) return;

    const [name, extension] = filename.split(".");

    if (!name || !extension) {
      setIsError(true);
      return;
    }

    dispatch(
      updateFile({
        fileId,
        nameWithExtension: filename,
      })
    );

    handleClose();
  }, [dispatch, filename, fileId, handleClose]);

  return (
    <Modal handleClick={handleClose} className={"max-w-[400px]"}>
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="small-input"
            className="block mb-4  text-xl font-medium text-gray-400"
          >
            Update File
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
              value={filename}
            />
            <button
              type="submit"
              className="text-whit font-medium rounded-lg text-base px-4 py-1.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              onke
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateFile;
