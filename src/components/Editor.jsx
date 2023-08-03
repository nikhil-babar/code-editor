import MonacoEditor from "@monaco-editor/react";
import PlayIcon from "../assets/icons/play.png";
import Brand from "../assets/icons/logo.png";
import { useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  executeCode,
  updateFile,
  selectCurrentFileId,
  selectFile,
  FILE_STATUS,
  selectCurrentTheme,
} from "../features/Editor/editorSlice";
import { ClockLoader } from "react-spinners";
import ReactDOM from "react-dom";

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      <div className="fixed top-0 left-0 right-0 bottom-0 m-auto w-fit h-fit">
        <ClockLoader color="#10E6D7" loading={isLoading} />
      </div>
    </>,
    document.getElementById("loader")
  );
};

const Editor = ({ className }) => {
  const currentFileId = useSelector((state) =>
    selectCurrentFileId(state.editor)
  );
  const editor = useSelector((state) =>
    selectFile(state.editor, currentFileId)
  );
  const theme = useSelector((state) => selectCurrentTheme(state.editor));
  const editorRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const isLoading =
    editor?.status.localeCompare(FILE_STATUS.pending) === 0 ? true : false;

  const handleSubmit = useCallback(() => {
    dispatch(
      executeCode({
        code: editorRef.current?.getValue(),
        input: inputRef.current?.getValue(),
        fileId: currentFileId,
      })
    );
  }, [dispatch, currentFileId]);

  useEffect(() => {
    if (!currentFileId) return;

    const id = currentFileId;

    return () => {
      if (!id) return;

      dispatch(
        updateFile({
          fileId: id,
          code: editorRef.current?.getValue(),
          input: inputRef.current?.getValue(),
        })
      );

      editorRef.current?.setValue("");
      inputRef.current?.setValue("");
    };
  }, [currentFileId, dispatch]);

  if (!currentFileId) {
    return (
      <div className="flew-grow bg-pr-gray h-full flex justify-center items-center">
        <div>
          <img src={Brand} alt="Logo" className="w-80 h-80 opacity-50 relative bottom-10" />
          <h1 className="text-stone-600 text-2xl font-bold font-mono text-center relative left-5 bottom-10">Create/Open a new file..</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`flex ${className}`}>
        <div className="flex-grow">
          <MonacoEditor
            theme={theme}
            value={editor?.code}
            onMount={(e) => (editorRef.current = e)}
            language={editor?.lang}
          />
        </div>
        <div className="w-[400px]">
          <MonacoEditor
            language="plaintext"
            theme={theme}
            height={"50%"}
            onMount={(e) => (inputRef.current = e)}
            value={editor?.input}
          />
          <MonacoEditor
            language="plaintext"
            theme={theme}
            options={{
              readOnly: true,
            }}
            height={"50%"}
            value={editor?.output}
          />
        </div>
      </div>
      <button
        className="absolute top-0 right-0 mr-9 my-2"
        onClick={handleSubmit}
      >
        <img src={PlayIcon} alt="run" className="w-6 h-6" />
      </button>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default Editor;
