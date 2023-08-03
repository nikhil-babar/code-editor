import React from "react";
import CanvasProvider from "../../context/CanvasContext";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";
import ColorPicker from "./ColorPicker";
import Modal from "../Modal";

const DrawingBoard = ({ width, height, color, handleClick }) => {
  return (
    <CanvasProvider>
      <Modal handleClick={handleClick} className={`max-w-[${width}px] flex justify-center items-center`}>
        <div className={`w-[${width}px] h-[${height}px] flex relative`}>
          <Sidebar className={`h-[${height}] p-2 bg-gray-500`} />
          <Canvas
            className={"flex-grow"}
            width={width}
            height={height}
            color={color}
          />
          <ColorPicker />
        </div>
      </Modal>
    </CanvasProvider>
  );
};

export default DrawingBoard;
