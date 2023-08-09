import React from "react";
import { ClockLoader } from "react-spinners";
import ReactDOM from "react-dom";

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      <div className="fixed top-0 left-0 right-0 bottom-0 m-auto w-fit h-fit">
        <ClockLoader color="#10E6D7" loading={isLoading} />
      </div>
    </>,
    document.getElementById("loader")
  );
};

export default Loader;
