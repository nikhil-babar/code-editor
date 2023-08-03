import React, { useEffect, useState } from "react";
import { useMonaco } from "@monaco-editor/react";
import Sidebar  from "./components/Sidebar";
import Editor from './components/Editor'
import Header from './components/Header'

const App = () => {
  const monaco = useMonaco();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)

  useEffect(() => {
    if (!monaco?.editor) return;

    Promise.all([
      import("./assets/themes/blackboard.json"),
      import("./assets/themes/dracula.json"),
      import("./assets/themes/github-dark.json"),
      import("./assets/themes/monokai.json"),
      import("./assets/themes/solarized-dark.json"),
      import("./assets/themes/twilight.json"),
    ])
      .then(
        ([
          blackboard,
          dracula,
          githubDark,
          monokai,
          solarizedDark,
          twilight,
        ]) => {
          monaco.editor.defineTheme("blackboard", blackboard);
          monaco.editor.defineTheme("dracula", dracula);
          monaco.editor.defineTheme("github-dark", githubDark);
          monaco.editor.defineTheme("monokai", monokai);
          monaco.editor.defineTheme("solarized-dark", solarizedDark);
          monaco.editor.defineTheme("twilight", twilight);
          setIsThemeLoaded(true)
        }
      )
      .catch();
  }, [monaco?.editor]);

  if(!isThemeLoaded){
    return <h1>Loading..</h1>
  }

  return (
    <>
      <div className="flex w-full h-screen overflow-hidden">
        <Sidebar />
        <div className="w-full">
          <Header />
          <Editor className={'h-[94.6%]'}/>
        </div>
      </div>
    </>
  );
};

export default App;
