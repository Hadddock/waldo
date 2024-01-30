import React, { useState } from "react";
import waldoImage from "./../assets/waldo.jpeg";

export default function ImageTagger() {
  function captureClick(e) {
    // e = Mouse click event.
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    setMarkers([x, y]);
  }

  const [markers, setMarkers] = useState([-1, -1]);

  return (
    <div id="tagging-grid">
      <div
        className="marker"
        style={{
          position: "absolute",
          top: markers[1],
          left: markers[0],
        }}
      ></div>
      <div id="test-background">Test background</div>

      <img src={waldoImage} onClick={captureClick} className="waldo-image" />
    </div>
  );
}
