import React, { useState } from "react";

export default function PermanentMarker({ x, y }) {
  return (
    <div
      className="marker"
      style={{
        position: "relative",
        top: y + 166,
        left: x,
      }}
    ></div>
  );
}
