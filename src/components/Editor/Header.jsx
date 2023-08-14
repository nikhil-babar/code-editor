import CrossIcon from "../../assets/icons/cross.png";
import { useDispatch, useSelector } from "react-redux";
import PlayIcon from "../../assets/icons/play.png";
import { useCallback } from "react";
import {
  executeCode,
  selectFile,
  selectOpenFileIds,
  closeFile,
  openFile,
  selectCurrentFileId,
} from "../../features/Editor/editorSlice";
import { event } from "../../utils/events";
import AuthDetails from "./AuthDetails";
import { FILE_TO_ICON } from "../../utils/lang_icons";

const File = ({ fileId, isCurrentFile }) => {
  const fileDetails = useSelector((state) => selectFile(state.editor, fileId));
  const dispatch = useDispatch();

  const handleCloseFile = useCallback(
    (e) => {
      e.stopPropagation();

      event.emit("fetch-code");

      dispatch(
        closeFile({
          fileId,
        })
      );
    },
    [dispatch, fileId]
  );

  const handleOpenFile = useCallback(() => {
    event.emit("fetch-code");

    dispatch(
      openFile({
        fileId,
      })
    );
  }, [dispatch, fileId]);

  if (!fileDetails) return null;

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
  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    event.emit("fetch-code");

    dispatch(
      executeCode({
        fileId: currentFileId,
      })
    );
  }, [dispatch, currentFileId]);

  return (
    <>
      <div className="h-[40px] w-full border border-gray-500 bg-se-gray flex justify-between">
        <ul className="flex items-center">
          {filesIds.map((file) => {
            return (
              <>
                <File
                  fileId={file}
                  isCurrentFile={file === currentFileId}
                  key={file.fileId}
                />
              </>
            );
          })}
        </ul>
        <div className="mr-9 my-2">
          <button onClick={handleSubmit} className="mr-5">
            <img src={PlayIcon} alt="run" className="w-6 h-6" />
          </button>
          <AuthDetails className={"ml-5"} />
        </div>
      </div>
    </>
  );
};

export default Header;
