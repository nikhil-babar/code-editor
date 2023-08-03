import JavaIcon from "../assets/icons/java.png";
import CppIcon from "../assets/icons/cpp.png";
import PythonIcon from "../assets/icons/python.png";
import JsIcon from "../assets/icons/javascript.png";
import CrossIcon from "../assets/icons/cross.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFile,
  selectOpenFileIds,
  closeFile,
  openFile,
  selectCurrentFileId,
} from "../features/Editor/editorSlice";
import { useCallback } from "react";

const FILE_TO_ICON = {
  cpp: CppIcon,
  java: JavaIcon,
  python: PythonIcon,
  javascript: JsIcon,
};

const File = ({ fileId, isCurrentFile }) => {
  const fileDetails = useSelector((state) => selectFile(state.editor, fileId));
  const dispatch = useDispatch();

  const handleCloseFile = useCallback(
    (e) => {
      e.stopPropagation();

      dispatch(
        closeFile({
          fileId,
        })
      );
    },
    [dispatch, fileId]
  );

  const handleOpenFile = useCallback(() => {
    dispatch(
      openFile({
        fileId,
      })
    );
  }, [dispatch, fileId]);

  return (
    <>
      <li
        className={`flex gap-2 px-3 h-[40px] border-r-[1px] border-gray-500 justify-center items-center ${
          !isCurrentFile ? "opacity-60" : null
        }`}
        onClick={handleOpenFile}
      >
        <img
          src={FILE_TO_ICON[fileDetails.lang]}
          alt="lang"
          className="w-5 h-5"
        />
        <h3 className="text-slate-300 text-sm font-light cursor-pointer hover:text-white">
          {fileDetails.nameWithExtension}
        </h3>
        <button>
          <img
            src={CrossIcon}
            alt="cross"
            className="h-3 w-3"
            onClick={handleCloseFile}
          />
        </button>
      </li>
    </>
  );
};

const Header = () => {
  const filesIds = useSelector((state) => selectOpenFileIds(state.editor));
  const currentFileId = useSelector((state) =>
    selectCurrentFileId(state.editor)
  );

  return (
    <>
      <div className="h-[40px] w-full border border-gray-500 bg-se-gray flex justify-between pr-7">
        <ul className="flex items-center">
          {filesIds.map((file) => {
            return (
              <>
                <File fileId={file} isCurrentFile={file === currentFileId} key={file.fileId}/>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Header;
