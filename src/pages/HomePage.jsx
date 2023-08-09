import React from "react";
import Navbar from "../components/Homepage/Navbar";
import MainSection from "../components/Homepage/MainSection";
import FeatureSection from "../components/Homepage/FeatureSection";
import Workflow from "../components/Homepage/Workflow";
import Footer from "../components/Homepage/Footer";

const HomePage = () => {
  return (
    <>
      <div className="">
        <Navbar />
        <MainSection />
        <FeatureSection />
        <Workflow />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
