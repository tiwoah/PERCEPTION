import React from "react";

export default function Start({ handleStart, deadState }) {
  console.log("Start component rendered");
  return (
    <button
      className={`start ${deadState ? "" : "inactive"}`}
      onClick={() => handleStart()}
    >
      START
    </button>
  );
}
