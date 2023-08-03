import React, { createContext, useCallback, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import { v4 as uuid } from "uuid";
import useHistory from "../hooks/useHistory";

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

const createLine = (x1, y1, x2, y2, color, width, generater) => {
  return generater.line(x1, y1, x2, y2, { stroke: color, strokeWidth: width });
};

const createRectangle = (x1, y1, x2, y2, color, width, generater) => {
  return generater.rectangle(x1, y1, x2 - x1, y2 - y1, {
    stroke: color,
    strokeWidth: width,
  });
};

const createCircle = (x1, y1, x2, y2, color, width, generater) => {
  return generater.circle(x1, y1, 2 * distance(x1, y1, x2, y2), {
    stroke: color,
    strokeWidth: width,
  });
};

const createCurve = (points, color, width, generater) => {
  return generater.curve(points, { stroke: color, strokeWidth: width });
};

const resizeCoordinates = (x, y, canvas) => {
  const { left, top, width, height } = canvas.getBoundingClientRect();
  const mouse = { x: 0, y: 0 };

  mouse.x = x - left;
  mouse.y = y - top;

  mouse.x /= width;
  mouse.y /= height;

  mouse.x *= canvas.width;
  mouse.y *= canvas.height;

  return mouse;
};

const CanvasProvider = ({ children }) => {
  const [drawable, setDrawable, undoDrawable, redoDrawable] = useHistory();
  const [active, setActive] = useState(false);
  const [tool, setTool] = useState(TOOLS.line);
  const [settings, setSettings] = useState({
    color: "white",
    width: 1,
  });

  const createDrawable = useCallback(
    (x, y, target) => {
      if (isNaN(x) || isNaN(y)) return;

      const generater = rough.canvas(target).generator;
      let newElement = null;

      switch (tool) {
        case TOOLS.line:
          newElement = createLine(
            x,
            y,
            x,
            y,
            settings.color,
            settings.width,
            generater
          );
          break;

        case TOOLS.rectangle:
          newElement = createRectangle(
            x,
            y,
            x,
            y,
            settings.color,
            settings.width,
            generater
          );
          break;

        case TOOLS.circle:
          newElement = createCircle(
            x,
            y,
            x,
            y,
            settings.color,
            settings.width,
            generater
          );
          break;

        case TOOLS.pencil:
          newElement = createCurve(
            [[x, y]],
            settings.color,
            settings.width,
            generater
          );
          break;

        case TOOLS.erase:
          newElement = createCurve(
            [[x, y]],
            "#333333",
            30,
            generater
          );
          break;

        default:
          break;
      }

      switch (tool) {
        case TOOLS.erase:
        case TOOLS.pencil:
          setDrawable(
            (prev) => [
              ...prev,
              { element: newElement, points: [[x, y]], tool, id: uuid() },
            ],
            false
          );
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
    [setDrawable, tool, settings]
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
            settings.color,
            settings.width,
            generater
          );
          break;

        case TOOLS.rectangle:
          newElement = createRectangle(
            drawable[elementIndex].x,
            drawable[elementIndex].y,
            x,
            y,
            settings.color,
            settings.width,
            generater
          );
          break;

        case TOOLS.circle:
          newElement = createCircle(
            drawable[elementIndex].x,
            drawable[elementIndex].y,
            x,
            y,
            settings.color,
            settings.width,
            generater
          );
          break;

        case TOOLS.pencil:
          newElement = createCurve(
            [...drawable[elementIndex].points, [x, y]],
            settings.color,
            settings.width,
            generater
          );
          break;

        case TOOLS.erase:
          newElement = createCurve(
            [...drawable[elementIndex].points, [x, y]],
            "#333333",
            30,
            generater
          );

        default:
          break;
      }

      switch (tool) {
        case TOOLS.erase:
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

      setDrawable(copy, true);
    },
    [setDrawable, active, tool, drawable, settings]
  );

  const handleMouseDown = useCallback(
    (e) => {
      const coordinates = resizeCoordinates(e.clientX, e.clientY, e.target);
      createDrawable(coordinates.x, coordinates.y, e.target);
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
      const coordinates = resizeCoordinates(e.clientX, e.clientY, e.target);
      updateDrawable(id, coordinates.x, coordinates.y, e.target);
    },
    [updateDrawable, active, drawable]
  );

  const selectTool = useCallback(
    (tool) => {
      setTool(tool);
    },
    [setTool]
  );

  const setColor = useCallback(
    (color) => {
      setSettings((prev) => ({ ...prev, color: color }));
    },
    [setSettings]
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
          undoDrawable,
          redoDrawable,
          setColor,
        }}
      >
        {children}
      </CanvasContext.Provider>
    </>
  );
};

export default CanvasProvider;
