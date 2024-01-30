import React, { useState } from "react";

export default function SelectionMarker({ x, y }) {
  return (
    <div
      style={{
        position: "relative",
        top: y,
        left: x,
        gridColumn: "1/-1",
        gridRow: "1/-1",
      }}
    >
      <div className="marker"></div>
      <div style={{ zIndex: 1, fontSize: "xx-large" }}>ZDQWADDDDDDDDDDD</div>
    </div>
  );
}
