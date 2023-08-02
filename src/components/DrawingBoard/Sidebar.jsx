import React, { useContext } from "react";
import { CanvasContext } from "../../context/CanvasContext";
import Circle from "../../assets/icons/circle.png";
import Rectangle from "../../assets/icons/rectangle.png";
import Line from "../../assets/icons/line.png";
import Pencil from "../../assets/icons/pen.png";
import Erase from "../../assets/icons/erase.png";

const TOOL_TO_ICON = {
  line: Line,
  rectangle: Rectangle,
  circle: Circle,
  pencil: Pencil,
  erase: Erase,
};

const Sidebar = () => {
  const { TOOLS, selectTool } = useContext(CanvasContext);

  return (
    <div className="w-20 h-full bg-gray-600 p-2">
      {Object.values(TOOLS).map((e) => {
        const tool = e?.toLowerCase();
        return (
          <button
            type="button"
            className="w-7 h-7 my-4"
            onClick={() => selectTool(e)}
          >
            <img src={TOOL_TO_ICON[tool]} alt={tool} key={tool} />
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
