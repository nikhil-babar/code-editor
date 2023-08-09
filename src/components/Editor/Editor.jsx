import MonacoEditor from "@monaco-editor/react";
import Brand from "../../assets/icons/logo.jpg";
import { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFile,
  selectCurrentFileId,
  selectFile,
  FILE_STATUS,
  selectCurrentTheme,
} from "../../features/Editor/editorSlice";
import { event } from "../../utils/events";
import Loader from "../utils/Loader";

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

  const dispatchCode = useCallback(
    (id = currentFileId) => {
      if (!id) return;
      dispatch(
        updateFile({
          fileId: id,
          code: editorRef.current?.getValue(),
          input: inputRef.current?.getValue(),
        })
      );
    },
    [dispatch, currentFileId]
  );

  useEffect(() => {
    event.on("fetch-code", dispatchCode);

    return () => {
      event.off("fetch-code", dispatchCode);
    };
  }, [dispatchCode]);

  useEffect(() => {
    return () => {
      editorRef.current?.setValue("");
      inputRef.current?.setValue("");
    };
  }, [currentFileId]);

  if (!currentFileId || !editor) {
    return (
      <div className="flew-grow bg-pr-gray h-full flex justify-center items-center">
        <div>
          <img
            src={Brand}
            alt="Logo"
            className="w-80 h-80 opacity-50 relative bottom-10"
          />
          <h1 className="text-stone-600 text-2xl font-bold font-mono text-center relative left-5 bottom-10">
            Create/Open a new file..
          </h1>
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
      <Loader isLoading={isLoading} />
    </>
  );
};

export default Editor;
