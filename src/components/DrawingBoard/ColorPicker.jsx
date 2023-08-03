import { useContext } from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { CirclePicker } from "react-color";

const ColorPicker = () => {
  const { setColor } = useContext(CanvasContext);

  return (
    <div className="absolute top-7 right-8">
      <CirclePicker onChange={(color) => setColor(color.hex)} />
    </div>
  );
};

export default ColorPicker;
