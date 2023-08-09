import React from "react";
import FileSystemIcon from "../../assets/images/main1.png";
import ThemesIcon from "../../assets/images/themes.png";
import DrawingBoardIcon from "../../assets/images/drawing_board.png";

const WorkflowItems = [
  {
    id: "jkl456mno",
    title: "Dedicated FileSystem",
    image: FileSystemIcon,
    content:
      "Organize your projects efficiently with a dedicated and secure file system. Easily manage and navigate through your code files, ensuring a seamless coding experience.",
  },
  {
    id: "pqr789stu",
    title: "Multiple Themes",
    image: ThemesIcon,
    content:
      "Personalize your coding environment with multiple themes to match your preferences. Choose from a variety of eye-catching themes, reducing strain during long coding sessions.",
  },
  {
    id: "vwx123yza",
    title: "Rough Workspace",
    image: DrawingBoardIcon,
    content:
      "Let your creativity flow in our rough workspace. Utilize the built-in sketch board to brainstorm ideas, design algorithms, and visually map out your thought process.",
  },
];

const Workflow = () => {
  return (
    <>
      <section className="lg:mt-32 md:mt-28 mt-14 text-white lg:w-[85%] md:w-[90%] mx-auto w-[97%]" id="workspace">
        <h1 className="text-2xl md:hidden font-bold pl-4">
          Workspace features
        </h1>
        {WorkflowItems.map((item, i) => {
          return (
            <div
              className={`md:flex justify-between lg:mb-32 md:mb-24 mb-14 ${
                i % 2 === 0 ? "flex-row-reverse" : null
              }`}
              key={item.id}
            >
              <div className="p-5 md:max-w-[50%]">
                <h3 className="md:text-2xl text-lg font-bold my-3">
                  {item.title}
                </h3>
                <p className="text-md font-semibold text-gray-400">
                  {item.content}
                </p>
              </div>
              <div className="md:w-[45%] w-[87%] mx-auto rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 p-1">
                <img
                  src={item.image}
                  alt="workspace"
                  className=" rounded-lg w-full h-full"
                />
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Workflow;
