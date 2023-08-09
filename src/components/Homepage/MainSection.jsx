import React from "react";
import EditorImage from "../../assets/images/main2.png";
import getGoogleAuthUrl from "../../utils/getGoogleAuthUrl";

const MainSection = () => {
  return (
    <section className="flex justify-center text-white lg:mt-28 md:mt-24 mt-14 lg:max-w-[90%] md:max-w-[95%] w-[90%] mx-auto" id="home">
      <div className="lg:px-5 md:px-3 px-2">
        <h1 className="lg:text-5xl md:text-4xl text-4xl text-bold bg-gradient-to-r from-primary to-danger bg-clip-text lg:mb-5">
          It's time to write some{" "}
          <span className="text-orange-500">{"{code()}"}</span>
        </h1>
        <div className="lg:ml-3 lg:border-l-2 lg:border-gray-600 relative top-10">
          <p className="text-gray-400 text-sm font-semibold pr-3 lg:px-5 block lg:block md:hidden">
          "Enhance competitive coding with our specialized Editor. Enjoy organized files, themes, a rough work board, terminals for I/O, and multi-language support. Swift debugging, rapid compilation, and smart suggestions boost efficiency. Conquer challenges with ease using our potent editor – your gateway to victory."
          </p>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-5 lg:ml-5 md:px-2"
          >
            <a href={getGoogleAuthUrl()}>{"Get Started >"}</a>
          </button>
        </div>
      </div>
      <div className="md:block hidden mx-auto rounded-lg bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 p-1">
        <img
          src={EditorImage}
          alt="workspace"
          className=" rounded-lg w-full h-full"
        />
      </div>
    </section>
  );
};

export default MainSection;
