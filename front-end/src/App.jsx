import React, { useEffect } from "react";
import "./App.css";
import Test from "./components/Test";
import ImageTagger from "./components/ImageTagger";

function App() {
  useEffect(() => {
    async function getToken() {
      const response = await fetch("http://localhost:3000/login");
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const tokenJson = await response.json();

      localStorage.setItem("token", tokenJson.token);
    }

    getToken();
  }, []);

  return <ImageTagger></ImageTagger>;
}

export default App;
