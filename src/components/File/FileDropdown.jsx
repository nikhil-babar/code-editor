import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  openFile,
  closeFile,
  deleteFile,
  downloadFile,
} from "../../features/Editor/editorSlice";
import UpdateFile from "./UpdateFile";
import { event } from "../../utils/events";

const options = {
  Open: openFile,
  Close: closeFile,
  Download: downloadFile,
  Delete: deleteFile,
};

const FileDropdown = ({ fileId, closeDropdown }) => {
  const dispatch = useDispatch();
  const [isFileUpdate, setIsFileUpdate] = useState(false);

  const handleClick = useCallback(
    (e, opt) => {
      e.stopPropagation();
      event.emit('fetch-code')
      dispatch(options[opt]({ fileId }));
      closeDropdown();
    },
    [closeDropdown, dispatch, fileId]
  );

  useEffect(() => {
    const handleClick = (event) => {
      const isOutsideComponent = !event.target.closest("#file-dropdown");

      if (isOutsideComponent) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [closeDropdown]);

  return (
    <>
      <ul
        className="list-none p-2 pl-4 rounded-sm bg-pr-gray text-white absolute top-2 right-0 w-24 z-10"
        id="file-dropdown"
      >
        <li
          onClick={() => {setIsFileUpdate(true)}}
          className="cursor-pointer hover:opacity-70 text-sm my-2"
        >
          Update
        </li>
        {Object.keys(options).map((opt) => {
          return (
            <li
              onClick={(e) => handleClick(e, opt)}
              className={`cursor-pointer hover:opacity-70 text-sm my-2 ${
                opt.localeCompare("Delete") === 0 ? "text-red-400" : null
              }`}
              key={opt}
            >
              {opt}
            </li>
          );
        })}
        <li className="w-5 h-5 absolute top-1 -left-2 rotate-45 bg-pr-gray rounded-sm"></li>
      </ul>
      {isFileUpdate ? (
        <UpdateFile
          handleClose={() => setIsFileUpdate(false)}
          fileId={fileId}
        />
      ) : null}
    </>
  );
};

export default FileDropdown;
