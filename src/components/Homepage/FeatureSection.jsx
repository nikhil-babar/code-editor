import React from "react";
import LanguageIcon from "../../assets/images/code.png";
import CpIcon from "../../assets/images/cp.png";
import DrawingBoardIcon from "../../assets/images/drawing_board_icon.png";

const features = [
  {
    id: "abc123xyz",
    title: "Multi-language Support",
    image: LanguageIcon,
    content:
      "Explore over 10 programming languages, including Java, C++, Python, and JavaScript. Seamlessly switch between languages in a single workspace.",
  },
  {
    id: "def456pqr",
    title: "CP Playground",
    image: CpIcon,
    content:
      "Boost your competitive programming skills with a dedicated input-output terminal and a lightning-fast coding environment.",
  },
  {
    id: "ghi789uvw",
    title: "Rough Work Board",
    image: DrawingBoardIcon,
    content:
      "Unleash your creativity with the built-in sketch board. Solve problems interactively using integrated shapes like squares, rectangles, lines, and more.",
  },
];

const Feature = () => {
  return (
    <>
      <section className="lg:mt-32 md:mt-24 mt-20 text-white max-w-[90%] mx-auto md:max-w-full" id="feature">
        <h1 className="lg:text-3xl text-2xl font-bold lg:mb-10 md:mb-5 mb-3 lg:pl-20 md:pl-10 pl-2">
          Product Features
        </h1>
        <ul className="md:border-y-2 md:border-gray-500 md:flex justify-evenly">
          {features.map((feature) => {
            return (
              <li
                className="md:border-r-2 md:border-gray-500 py-5 lg:px-10 md:px-5 px-2 text-white w-[0.33fr] md:text-center"
                key={feature.id}
              >
                <h4 className="text-xl font-bold mb-5">{feature.title}</h4>
                <p className="text-md font-semibold text-gray-400">
                  {feature.content}
                </p>
                <img
                  src={feature.image}
                  alt="feature"
                  className="lg:w-48 lg:h-48 md:w-40 md:h-40 mx-auto mt-3 w-44 h-44"
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Feature;
