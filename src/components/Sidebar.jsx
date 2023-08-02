import React, { useState } from "react";
import FileSystem from "./FileSystem";
import FileIcon from "../assets/icons/file.png";
import ThemeModal from "./ThemeModal";
import ThemeIcon from "../assets/icons/theme.png";

const Sidebar = ({ className }) => {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

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
        </div>
        <FileSystem/>
        {isThemeModalOpen && (
          <ThemeModal handleClick={() => setIsThemeModalOpen(false)} />
        )}
      </div>
    </>
  );
};

export default Sidebar;
