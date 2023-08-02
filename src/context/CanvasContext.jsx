import React, { createContext, useCallback, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import { v4 as uuid } from "uuid";

export const CanvasContext = createContext({});

const TOOLS = {
  line: "LINE",
  rectangle: "RECTANGLE",
  pencil: "PENCIL",
  circle: "CIRCLE",
  erase: "ERASE",
};

const distance = (x1, y1, x2, y2) => {
  return Math.pow((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1), 1 / 2);
};

const createLine = (x1, y1, x2, y2, generater) => {
  return generater.line(x1, y1, x2, y2);
};

const createRectangle = (x1, y1, x2, y2, generater) => {
  return generater.rectangle(x1, y1, x2 - x1, y2 - y1);
};

const createCircle = (x1, y1, x2, y2, generater) => {
  return generater.circle(x1, y1, 2 * distance(x1, y1, x2, y2));
};

const createCurve = (points, generater) => {
  return generater.curve(points, { strokeWidth: 2 });
};

const CanvasProvider = ({ children }) => {
  const [drawable, setDrawable] = useState([]);
  const [active, setActive] = useState(false);
  const [tool, setTool] = useState(TOOLS.line);

  const createDrawable = useCallback(
    (x, y, target) => {
      if (isNaN(x) || isNaN(y)) return;

      const generater = rough.canvas(target).generator;
      let newElement = null;

      switch (tool) {
        case TOOLS.line:
          newElement = createLine(x, y, x, y, generater);
          break;

        case TOOLS.rectangle:
          newElement = createRectangle(x, y, x, y, generater);
          break;

        case TOOLS.circle:
          newElement = createCircle(x, y, x, y, generater);
          break;

        case TOOLS.pencil:
          newElement = createCurve([[x, y]], generater);
          break;

        default:
          break;
      }

      switch (tool) {
        case TOOLS.pencil:
          setDrawable((prev) => [
            ...prev,
            { element: newElement, points: [[x, y]], tool, id: uuid() },
          ]);
          break;

        case TOOLS.line:
        case TOOLS.rectangle:
        case TOOLS.circle:
          setDrawable((prev) => [
            ...prev,
            { element: newElement, x, y, tool, id: uuid() },
          ]);
          break;

        default:
          break;
      }
    },
    [setDrawable, tool]
  );

  const updateDrawable = useCallback(
    (id, x, y, target) => {
      if (!active) return;

      const generater = rough.canvas(target).generator;

      const elementIndex = drawable.findIndex(
        (e) => e.id.localeCompare(id) === 0
      );

      const copy = [...drawable];

      let newElement = null;

      switch (tool) {
        case TOOLS.line:
          newElement = createLine(
            drawable[elementIndex].x,
            drawable[elementIndex].y,
            x,
            y,
            generater
          );
          break;

        case TOOLS.rectangle:
          newElement = createRectangle(
            drawable[elementIndex].x,
            drawable[elementIndex].y,
            x,
            y,
            generater
          );
          break;

        case TOOLS.circle:
          newElement = createCircle(
            drawable[elementIndex].x,
            drawable[elementIndex].y,
            x,
            y,
            generater
          );
          break;

        case TOOLS.pencil:
          newElement = createCurve(
            [...drawable[elementIndex].points, [x, y]],
            generater
          );
          break;

        default:
          break;
      }

      switch (tool) {
        case TOOLS.pencil:
          copy[elementIndex] = {
            points: [...drawable[elementIndex].points, [x, y]],
            id,
            tool: drawable[elementIndex].tool,
            element: newElement,
          };
          break;

        case TOOLS.line:
        case TOOLS.rectangle:
        case TOOLS.circle:
          copy[elementIndex] = {
            x: drawable[elementIndex].x,
            y: drawable[elementIndex].y,
            id,
            tool: drawable[elementIndex].tool,
            element: newElement,
          };
          break;

        default:
          break;
      }

      setDrawable(copy);
    },
    [setDrawable, active, tool, drawable]
  );

  const handleMouseDown = useCallback(
    (e) => {
      createDrawable(e.clientX, e.clientY, e.target);
      setActive(true);
    },
    [createDrawable, setActive]
  );

  const handleMouseUp = useCallback(
    (e) => {
      setActive(false);
    },
    [setActive]
  );

  const handleMouseMove = useCallback(
    (e) => {
      e.preventDefault();
      if (!active || drawable.length === 0) return;
      const id = drawable[drawable.length - 1].id;
      updateDrawable(id, e.clientX, e.clientY, e.target);
    },
    [updateDrawable, active, drawable]
  );

  const selectTool = useCallback(
    (tool) => {
      setTool(tool);
    },
    [setTool]
  );

  return (
    <>
      <CanvasContext.Provider
        value={{
          drawable,
          active,
          tool,
          TOOLS,
          handleMouseDown,
          handleMouseMove,
          handleMouseUp,
          selectTool,
        }}
      >
        {children}
      </CanvasContext.Provider>
    </>
  );
};

export default CanvasProvider;
