import React, { useContext } from "react";
import { CanvasContext } from "../../context/CanvasContext";
import Circle from "../../assets/icons/circle.png";
import Rectangle from "../../assets/icons/rectangle.png";
import Line from "../../assets/icons/line.png";
import Pencil from "../../assets/icons/pen.png";
import Erase from "../../assets/icons/erase.png";
import Undo from "../../assets/icons/undo.png"
import Redo from "../../assets/icons/redo.png"

const TOOL_TO_ICON = {
  line: Line,
  rectangle: Rectangle,
  circle: Circle,
  pencil: Pencil,
  erase: Erase,
};

const Sidebar = ({ className }) => {
  const { TOOLS, selectTool, undoDrawable, redoDrawable } =
    useContext(CanvasContext);

  return (
    <div className={`${className} flex flex-col justify-evenly`}>
      {Object.values(TOOLS).map((e) => {
        const tool = e?.toLowerCase();
        return (
          <button
            type="button"
            className="block w-7 h-7"
            onClick={() => selectTool(e)}
            key={tool}
          >
            <img src={TOOL_TO_ICON[tool]} alt={tool} key={tool} />
          </button>
        );
      })}

      <button
        type="button"
        className="w-7 h-7 block"
        onClick={() => undoDrawable()}
      >
        <img src={Undo} alt={"undo"} />
      </button>

      <button
        type="button"
        className="w-7 h-7  block"
        onClick={() => redoDrawable()}
      >
        <img src={Redo} alt={"redo"} />
      </button>
    </div>
  );
};

export default Sidebar;
