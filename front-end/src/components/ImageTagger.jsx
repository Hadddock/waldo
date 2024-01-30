import React, { useState } from "react";
import waldoImage from "./../assets/waldo.jpeg";
import PermanentMarker from "./PermanentMarker";

export default function ImageTagger() {
  function captureClick(e) {
    const x = e.clientX;
    const y = e.clientY;
    const divElement = document.getElementById("waldo-image");
    const rect = divElement.getBoundingClientRect();
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;
    setMarker([offsetX, offsetY]);
    console.log("You clicked here: " + offsetX + " " + offsetY);
  }

  const [marker, setMarker] = useState([-1000, -1000]);

  return (
    <div id="tagging-grid">
      <PermanentMarker x={marker[0]} y={marker[1]}></PermanentMarker>
      <img
        src={waldoImage}
        onClick={captureClick}
        className="waldo-image"
        id="waldo-image"
      />
    </div>
  );
}
