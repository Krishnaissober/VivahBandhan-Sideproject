// main.jsx
// ─────────────────────────────────────────────────────────────────────────────
// The entry point of the React app.
// React.StrictMode helps you find bugs by intentionally double-invoking
// some functions during development (has no effect in production).
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Tailwind CSS styles

// ReactDOM.createRoot() mounts the React app into the <div id="root"> in index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
