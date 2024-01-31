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
        zIndex: 2,
      }}
    >
      <div className="marker"></div>
      <div style={{ pointerEvents: "auto", backgroundColor: "black" }}>
        <fieldset>
          <legend>Select which character this is</legend>
          <ul>
            <li>
              <button onClick={submitCharacter.bind(null, "Waldo", x, y)}>
                Waldo
              </button>
            </li>
            <li>
              <button onClick={submitCharacter.bind(null, "Wilma", x, y)}>
                Wilma
              </button>
            </li>
            <li>
              <button onClick={submitCharacter.bind(null, "Woof", x, y)}>
                Woof
              </button>
            </li>
            <li>
              <button onClick={submitCharacter.bind(null, "Wizard", x, y)}>
                Wizard
              </button>
            </li>
            <li>
              <button onClick={submitCharacter.bind(null, "Odlaw", x, y)}>
                Odlaw
              </button>
            </li>
          </ul>
        </fieldset>
      </div>
    </div>
  );
}
