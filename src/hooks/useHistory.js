import { useCallback, useState } from "react";

const useHistory = () => {
  const [history, setHistory] = useState([[]]);
  const [currState, setCurrState] = useState(0);

  const setState = useCallback(
    (e, overwrite) => {
      let newState = null;
      if (typeof e === "function") {
        newState = e(history[currState]);
      } else {
        newState = e;
      }

      const updatedHistory = history.slice(0, currState + 1);

      if (overwrite) {
        updatedHistory[currState] = newState;
        setHistory(updatedHistory);
      } else {
        setHistory([...updatedHistory, newState]);
        setCurrState((prev) => prev + 1);
      }
    },
    [history, setCurrState, setHistory, currState]
  );

  const redo = useCallback(() => {
    if (currState === history.length - 1) return;
    setCurrState((prev) => prev + 1);
  }, [setCurrState, currState, history]);

  const undo = useCallback(() => {
    if (currState === 0) return;
    setCurrState((prev) => prev - 1);
  }, [setCurrState, currState]);

  return [history[currState], setState, undo, redo];
};

export default useHistory;
