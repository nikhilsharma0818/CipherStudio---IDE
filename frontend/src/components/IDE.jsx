import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

export default function IDE({ files, activeFile, setFiles }) {

  const handleChange = (code, fileName) => {
    setFiles(p => ({
      ...p,
      [fileName]: { ...p[fileName], code }
    }));
  };

  const sandpackFiles = {};
  Object.keys(files).forEach(f => {
    sandpackFiles[f] = files[f].code;
  });

  return (
    <Sandpack
      template="react"
      files={sandpackFiles}
      options={{
        showTabs: true,
        showLineNumbers: true,
        wrapContent: true,
        activeFile: activeFile
      }}
      customSetup={{
        dependencies: {
          react: "18.2.0",
          "react-dom": "18.2.0"
        }
      }}
      onChange={handleChange}
    />
  );
}

