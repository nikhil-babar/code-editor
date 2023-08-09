import React from "react";
import Youtube from "react-youtube";

const DemoSection = () => {
  return (
    <>
      <section className="mt-32 flex justify-center items-center text-white mx-auto">
        <div>
          <h3 className="text-3xl font-bold mb-10">Demo video</h3>
          <Youtube videoId={"eJqXES6QvTk"} opts={{ width: '960px', height: '540px' }}/>
        </div>
      </section>
    </>
  );
};

export default DemoSection;
