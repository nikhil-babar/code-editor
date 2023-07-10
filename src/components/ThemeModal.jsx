import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectThemes, setTheme } from "../features/Editor/editorSlice";
import Modal from "./Modal";
import Slider from "react-slick";

const getThemeImages = ({ themes }) => {
  const images = [];
  themes.forEach((theme) => {
    images.push({ theme, image: require(`../assets/images/${theme}.svg`) });
  });
  return images;
};

const ThemeModal = ({ handleClick }) => {
  const themes = useSelector((state) => selectThemes(state.editor));
  const currentTheme = useRef(themes[0]);
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_oldIndex, newIndex) => {
      currentTheme.current = themes[newIndex];
    },
  };

  useEffect(() => {
    return () => {
      dispatch(setTheme(currentTheme.current));
    };
  }, [dispatch]);

  return (
    <>
      <Modal
        handleClick={handleClick}
        className={"max-w-[600px] h-96 flex justify-center items-center"}
      >
        <Slider {...settings} className="w-[500px]">
          {getThemeImages({ themes }).map(({ theme, image }) => {
            return (
              <>
                <img
                  key={theme}
                  src={image}
                  alt="theme"
                  className="w-[500px] h-80 mx-auto"
                />
              </>
            );
          })}
        </Slider>
      </Modal>
    </>
  );
};

export default ThemeModal;
