import React from "react";

export default function SelectionMarker({ x, y, submitCharacter }) {
  return (
    <div
      style={{
        position: "relative",
        top: y,
        left: x,
        gridColumn: "1/-1",
        gridRow: "1/-1",
        display: "flex",
        transform: "translateY(100%)",
        pointerEvents: "none",
        maxWidth: "300px",

        zIndex: 2,
      }}
    >
      <div className="marker"></div>
      <div style={{ pointerEvents: "auto", backgroundColor: "black" }}>
        <fieldset>
          <legend>Select the character </legend>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <button onClick={submitCharacter.bind(null, "Waldo", x, y)}>
              Waldo
            </button>

            <button onClick={submitCharacter.bind(null, "Wilma", x, y)}>
              Wilma
            </button>

            <button onClick={submitCharacter.bind(null, "Woof", x, y)}>
              Woof
            </button>

            <button onClick={submitCharacter.bind(null, "Wizard", x, y)}>
              Wizard
            </button>

            <button onClick={submitCharacter.bind(null, "Odlaw", x, y)}>
              Odlaw
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
