import React from "react";

export default function Start({ handleStart }) {
  return (
    <button className="start" onClick={() => handleStart()}>
      START
    </button>
  );
}
