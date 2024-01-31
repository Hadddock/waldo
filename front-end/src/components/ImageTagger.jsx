import React, { useState, useEffect } from "react";
import waldoImage from "./../assets/waldo.jpeg";
import SelectionMarker from "./SelectionMarker";
import PermanentMarker from "./PermanentMarker";

const characterNames = ["Waldo", "Wilma", "Wizard", "Woof", "Odlaw"];
const tolerance = 20;

export default function ImageTagger() {
  async function submitCharacter(characterName, x, y) {
    if (!characterNames.includes(characterName)) {
      console.log("Sorry, that's not a valid character");
      return;
    }

    const response = await fetch(
      `http://localhost:3000/guess/` + characterName + "/" + x + "/" + y
    );
    const records = await response.json();
    if (records.correct) {
      const charactersCurrentlyFound = charactersFound;

      charactersCurrentlyFound[characterName] = { found: true, x: x, y: y };
      setCharactersFound(charactersCurrentlyFound);
      setMarker([-1000, -1000]);
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
