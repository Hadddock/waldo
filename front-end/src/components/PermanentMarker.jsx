import React, { useState } from "react";

export default function PermanentMarker({ x, y }) {
  return (
    <div
      className="marker"
      style={{
        position: "relative",
        top: y + 190,
        borderColor: "lime",
        left: x,
      }}
    ></div>
  );
}
