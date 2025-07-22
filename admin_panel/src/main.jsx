import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

function Root() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <App />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <Root />
  </React.StrictMode>
);
