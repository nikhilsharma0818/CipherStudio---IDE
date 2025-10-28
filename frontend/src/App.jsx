import React, { useState, useEffect } from "react";
import IDE from "./components/IDE";

export default function App() {
  const projectId = "my_cipherstudio_project";

  // load files from localStorage 
  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem("proj_" + projectId);
    if (saved) {
      try {
        return JSON.parse(saved).files;
      } catch {
        return getDefaultFiles();
      }
    }
    return getDefaultFiles();
  });

  function getDefaultFiles() {
    return {
      "/src/App.js": {
        code: `export default function App() {
  return <div style={{padding:20}}>Hello Cipher Studio by Nikhil Sharma</div>
}`,
      },
      "/src/index.js": {
        code: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
createRoot(document.getElementById("root")).render(<App />);`,
      },
      "/package.json": {
        code: JSON.stringify({
          name: "cipherstudio",
          version: "1.0.0",
          main: "src/index.js",
          dependencies: {
            react: "18.2.0",
            "react-dom": "18.2.0",
          },
        }, null, 2),
      },
    };
  }

  const [activeFile, setActiveFile] = useState("/src/App.js");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // toggle button betwenn theme
  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === "light" ? "dark" : "light"));
  };

  // Save project
  const saveProject = () => {
    localStorage.setItem("proj_" + projectId, JSON.stringify({ files }));
    alert("Project saved!");
  };

  // Load projects
  const loadProject = () => {
    const saved = localStorage.getItem("proj_" + projectId);
    if (saved) {
      setFiles(JSON.parse(saved).files);
      alert("Project loaded!");
    } else alert("No saved project found.");
  };

  // Add new file
  const addFile = () => {
    const name = prompt("Enter new file name like /src/NewFile.js:");
    if (name && !files[name]) {
      setFiles(prev => ({ ...prev, [name]: { code: "// new file" } }));
      setActiveFile(name);
    }
  };

  // Rename file
  const renameFile = oldName => {
    const newName = prompt("Enter new file name:", oldName);
    if (!newName || newName === oldName) return;
    const updated = { ...files };
    updated[newName] = updated[oldName];
    delete updated[oldName];
    setFiles(updated);
    if (activeFile === oldName) setActiveFile(newName);
  };

  // Delete file
  const deleteFile = name => {
    if (window.confirm(`Delete ${name}?`)) {
      const updated = { ...files };
      delete updated[name];
      setFiles(updated);
      if (activeFile === name) setActiveFile(Object.keys(updated)[0] || "");
    }
  };

  return (
    <div className="app">
      <div className="left">
        <button onClick={toggleTheme} className="btn" style={{ marginBottom: 10 }}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <h3>CipherStudio</h3>
        <p>Files</p>

        {Object.keys(files).map(f => (
          <div
            key={f}
            className="file"
            style={{
              background: activeFile === f ? "#e5e7eb" : "",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 6,
              cursor: "pointer",
            }}
          >
            <span
              onClick={() => setActiveFile(f)}
              onDoubleClick={() => renameFile(f)}
              style={{ flexGrow: 1 }}
            >
              {f}
            </span>
            <button
              onClick={() => deleteFile(f)}
              style={{
                background: "none",
                border: "none",
                color: "#dc2626",
                cursor: "pointer",
                fontSize: 14,
              }}
              title="Delete file"
            >
              🗑️
            </button>
          </div>
        ))}

        <button className="btn" onClick={addFile} style={{ marginTop: 8 }}>
          + New File
        </button>
      </div>

      <div className="center">
        <div className="toolbar">
          <button className="btn" onClick={saveProject}>
            💾 Save
          </button>
          <button className="btn" onClick={loadProject}>
            📂 Load
          </button>
        </div>
        <IDE files={files} activeFile={activeFile} setFiles={setFiles} />
      </div>

      <div className="right">
        <h4>Live Preview</h4>
        <div id="live-preview" style={{ height: "85%" }}></div>
      </div>
    </div>
  );
}
