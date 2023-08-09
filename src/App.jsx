import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Editor from "./pages/Editor";
import "./App.css";
import PrivateRoute from "./components/utils/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"/editor"} />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/editor" element={<PrivateRoute />}>
        <Route index element={<Editor />} />
      </Route>
    </Routes>
  );
};

export default App;
