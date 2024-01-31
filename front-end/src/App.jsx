import React, { useEffect } from "react";
import "./App.css";
import Test from "./components/Test";
import ImageTagger from "./components/ImageTagger";

function App() {
  useEffect(() => {
    localStorage.setItem("token", "test");
  }, []);

  return <ImageTagger></ImageTagger>;
}

export default App;
