import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import waldoImage from "./../assets/waldo.jpeg";
import SelectionMarker from "./SelectionMarker";
import PermanentMarker from "./PermanentMarker";

const characterNames = ["Waldo", "Wilma", "Wizard", "Woof", "Odlaw"];
const url =
  import.meta.env.VITE_ENVIRONEMNT === "production"
    ? "http://localhost:3000"
    : "https://w-waldo-855c2f9cefa0.herokuapp.com";

export default function ImageTagger() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  async function submitCharacter(characterName, x, y) {
    if (!characterNames.includes(characterName)) {
      window.alert("Invalid character name");
      return;
    }

    const response = await fetch(
      `${url}/guess/` + characterName + "/" + x + "/" + y,
      {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const responseJson = await response.json();

    if (responseJson.correct) {
      //get a new token containing correctly guessed characters
      localStorage.setItem("token", responseJson.token);
      const charactersCurrentlyFound = charactersFound;

      charactersCurrentlyFound[characterName] = { found: true, x: x, y: y };
      setCharactersFound(charactersCurrentlyFound);
      setMarker([-1000, -1000]);
      if (responseJson.end_time !== undefined) {
        navigate("/score/" + responseJson.end_time);
        return;
      }
    } else {
      window.alert("Sorry, that's not " + characterName);
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
  }

  async function getToken() {
    const response = await fetch(`${url}/login`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const tokenJson = await response.json();

    localStorage.setItem("token", tokenJson.token);
  }

  const [marker, setMarker] = useState([-1000, -1000]);

  const characters = {
    Waldo: { found: false, x: -10000, y: -100 },
    Wilma: { found: false, x: -10000, y: -100 },
    Wizard: { found: false, x: -10000, y: -100 },
    Woof: { found: false, x: -10000, y: -100 },
    Odlaw: { found: false, x: -10000, y: -100 },
  };

  const [charactersFound, setCharactersFound] = useState(characters);
  useEffect(() => {}, [charactersFound]);

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
        onLoad={getToken}
        style={{
          justifySelf: "center",
          alignSelf: "center",
          border: "10px solid red",
        }}
      />
    </div>
  );
}
