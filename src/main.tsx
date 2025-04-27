import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Workbox } from "workbox-window";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("src/app/serviceworker/sw.ts");

  wb.addEventListener("installed", (event) => {
    if (event.isUpdate) {
      console.log("Service Worker updated");
    } else {
      console.log("Service Worker installed for the first time");
    }
  });

  wb.register().then(() => {
    console.log("Service Worker registered successfully!");
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
