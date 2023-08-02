import React from "react";
import CanvasProvider from "../../context/CanvasContext";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";

const DrawingBoard = () => {
  return (
    <CanvasProvider>
      <div className="w-full h-full flex">
        <Sidebar />
        <Canvas />
      </div>
    </CanvasProvider>
  );
};

export default DrawingBoard;
