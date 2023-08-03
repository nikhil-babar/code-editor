import React, { useState } from "react";
import FileSystem from "./FileSystem";
import FileIcon from "../assets/icons/file.png";
import ThemeModal from "./ThemeModal";
import ThemeIcon from "../assets/icons/theme.png";
import DrawingBoard from "./DrawingBoard/DrawingBoardModal";
import DrawingBoardIcon from "../assets/icons/drawing_board.png"

const Sidebar = ({ className }) => {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false)

  return (
    <>
      <div className={`flex h-full w-fit ${className}`}>
        <div className="w-12 h-full bg-pr-gray flex flex-col items-center pt-4 gap-5">
          <button>
            <img src={FileIcon} alt="File" className="w-7 h-7" />
          </button>
          <button onClick={() => setIsThemeModalOpen((prev) => !prev)}>
            <img src={ThemeIcon} alt="theme" className="w-8 h-8" />
          </button>
          <button onClick={() => setIsCanvasOpen((prev) => !prev)}>
            <img src={DrawingBoardIcon} alt="color_pallet" className="w-8 h-8" />
          </button>
        </div>
        <FileSystem/>
        {isThemeModalOpen && (
          <ThemeModal handleClick={() => setIsThemeModalOpen(false)} />
        )}
        {isCanvasOpen && (
          <DrawingBoard handleClick={() => setIsCanvasOpen(false)} width={1000} height={600}/>
        )}
      </div>
    </>
  );
};

export default Sidebar;
