import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Editor from "./components/Editor";
import { useMonaco } from "@monaco-editor/react";

const App = () => {
  const monaco = useMonaco();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)

  useEffect(() => {
    if (!monaco?.editor) return;

    Promise.all([
      import("./assets/themes/blackboard.json"),
      import("./assets/themes/chrome-devtools.json"),
      import("./assets/themes/dracula.json"),
      import("./assets/themes/github-dark.json"),
      import("./assets/themes/github.json"),
      import("./assets/themes/monokai.json"),
      import("./assets/themes/solarized-dark.json"),
      import("./assets/themes/twilight.json"),
    ])
      .then(
        ([
          blackboard,
          chromeDevtools,
          dracula,
          githubDark,
          github,
          monokai,
          solarizedDark,
          twilight,
        ]) => {
          monaco.editor.defineTheme("blackboard", blackboard);
          monaco.editor.defineTheme("chrome-devtools", chromeDevtools);
          monaco.editor.defineTheme("dracula", dracula);
          monaco.editor.defineTheme("github-dark", githubDark);
          monaco.editor.defineTheme("github", github);
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
      <div className="bg-slate-400 w-full h-screen flex overflow-hidden">
        <Sidebar />
        <div className="flex-grow">
          <Header />
          <Editor className={"w-full h-full"} />
        </div>
      </div>
    </>
  );
};

export default App;
