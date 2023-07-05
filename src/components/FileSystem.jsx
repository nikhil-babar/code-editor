import React, { useState } from "react";
import CreateFileIcon from "../assets/icons/create_file.png";
import CreateFolderIcon from "../assets/icons/create_folder.png";
import JavaIcon from "../assets/icons/java.png";
import CppIcon from "../assets/icons/cpp.png";
import PythonIcon from "../assets/icons/python.png";
import JsIcon from "../assets/icons/javascript.png";
import CreateFile from "./CreateFile";
import { useSelector, useDispatch } from "react-redux";
import { openFile, selectAllFiles } from "../features/Editor/editorSlice";
import { useCallback } from "react";

const FILE_TO_ICON = {
  cpp: CppIcon,
  java: JavaIcon,
  python: PythonIcon,
  javascript: JsIcon,
};

const File = ({ details }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(
      openFile({
        fileId: details?.fileId,
      })
    );
  }, [details?.fileId, dispatch]);

  return (
    <>
      <li className="flex gap-1 p-2" onClick={handleClick}>
        <img src={FILE_TO_ICON[details.lang]} alt="lang" className="w-5 h-5" />
        <button className="text-slate-300 text-sm font-medium cursor-pointer hover:text-white">
          {details.nameWithExtension}
        </button>
      </li>
    </>
  );
};

const FileSystem = () => {
  const [isCreateFileOpen, setIsCreateFileOpen] = useState(false);
  const files = useSelector((state) => selectAllFiles(state.editor));

  return (
    <>
      <div className="w-60 h-full bg-se-gray pt-3 border-r-[1px] border-gray-500">
        <div className="border-neon-blue border-b-[1px] px-4 pb-2">
          <div className="flex justify-between items-center">
            <h3 className="flex grow text-base text-white font-semibold">
              Explorer
            </h3>
            <div className="flex gap-2">
              <img
                src={CreateFileIcon}
                alt="file"
                className="h-5 w-5 hover:opacity-75 cursor-pointer"
                onClick={() => setIsCreateFileOpen(true)}
              />
              <img
                src={CreateFolderIcon}
                alt="folder"
                className="h-5 w-5 hover:opacity-75 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <ul className="list-none">
            {files.map((file) => {
              return <File details={file} key={file.fileId} />;
            })}
          </ul>
        </div>
      </div>
      {isCreateFileOpen && (
        <CreateFile
          isOpen={isCreateFileOpen}
          handleClick={() => setIsCreateFileOpen(false)}
        />
      )}
    </>
  );
};

export default FileSystem;
