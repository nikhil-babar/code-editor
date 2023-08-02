import React, { useContext, useLayoutEffect, useRef } from "react";
import { CanvasContext } from "../../context/CanvasContext";
import rough from "roughjs/bundled/rough.esm";

const Canvas = () => {
  const canvasRef = useRef();
  const { drawable, handleMouseDown, handleMouseMove, handleMouseUp } =
    useContext(CanvasContext);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(document.getElementById("canvas"));
    const context = canvasRef.current.getContext("2d");

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    drawable.forEach(({ element }) => {
      roughCanvas.draw(element);
    });
  }, [drawable]);

  return (
    <div>
      <canvas
        className="bg-blue-400 text-emerald-600"
        ref={canvasRef}
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </div>
  );
};

export default Canvas;
