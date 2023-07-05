import MonacoEditor from "@monaco-editor/react";
import PlayIcon from "../assets/icons/play.png";
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

  return (
    <>
      <div className={`flex ${className}`}>
        <div className="flex-grow">
          <MonacoEditor
            theme={theme}
            value={editor?.code}
            width={"100%"}
            height={"100%"}
            onMount={(e) => (editorRef.current = e)}
            language={editor?.lang}
          />
        </div>
        <div className="max-w-[400px] flex-grow">
          <MonacoEditor
            language="plaintext"
            theme={theme}
            height={"50%"}
            width={"100%"}
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
            width={"100%"}
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
