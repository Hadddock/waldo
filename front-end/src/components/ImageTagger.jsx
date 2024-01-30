import React, { useState } from "react";
import waldoImage from "./../assets/waldo.jpeg";

export default function ImageTagger() {
  function captureClick(e) {
    // e = Mouse click event.
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    setMarkers("Left? : " + x + " ; Top? : " + y + ".");
  }

  const [markers, setMarkers] = useState();

  return (
    <div>
      {markers}
      <img src={waldoImage} onClick={captureClick} />
    </div>
  );
}
