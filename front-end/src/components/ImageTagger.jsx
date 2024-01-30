import React, { useState, useEffect } from "react";
import waldoImage from "./../assets/waldo.jpeg";
import SelectionMarker from "./SelectionMarker";
import PermanentMarker from "./PermanentMarker";

export default function ImageTagger() {
  function submitCharacter(characterName, x, y) {
    const charactersCurrentlyFound = charactersFound;
    const checkCharacterPosition = true;
    if (checkCharacterPosition) {
      setMarker([-1000, -1000]);
      charactersCurrentlyFound[characterName] = { found: true, x: x, y: y };
      setCharactersFound(charactersCurrentlyFound);
    } else {
      console.log("Sorry, that's not " + characterName);
    }
  }

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

  const characters = {
    Waldo: { found: false, x: -100, y: -100 },
    Wilma: { found: false, x: -100, y: -100 },
    Wizard: { found: false, x: -100, y: -100 },
    Woof: { found: false, x: -100, y: -100 },
    Odlaw: { found: false, x: -100, y: -100 },
  };

  const [charactersFound, setCharactersFound] = useState(characters);
  useEffect(() => {
    console.log("stateUpdated");
  }, [charactersFound]);

  return (
    <div id="tagging-grid">
      <SelectionMarker
        x={marker[0]}
        y={marker[1]}
        submitCharacter={submitCharacter}
      ></SelectionMarker>

      <PermanentMarker
        x={charactersFound["Waldo"].x}
        y={charactersFound["Waldo"].y}
      ></PermanentMarker>
      <PermanentMarker
        x={charactersFound["Wilma"].x}
        y={charactersFound["Wilma"].y}
      ></PermanentMarker>
      <PermanentMarker
        x={charactersFound["Wizard"].x}
        y={charactersFound["Wizard"].y}
      ></PermanentMarker>
      <PermanentMarker
        x={charactersFound["Woof"].x}
        y={charactersFound["Woof"].y}
      ></PermanentMarker>
      <PermanentMarker
        x={charactersFound["Odlaw"].x}
        y={charactersFound["Odlaw"].y}
      ></PermanentMarker>

      <img
        src={waldoImage}
        onClick={captureClick}
        className="waldo-image"
        id="waldo-image"
      />
    </div>
  );
}
