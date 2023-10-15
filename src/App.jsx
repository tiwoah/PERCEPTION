import { useState } from "react";
import "./App.css";
import eye from "./assets/eye.png";
import eye_gif from "./assets/eye.gif";
import Game from "./components/Game";
import sound_boot from "./assets/boot.mp3";

function App() {
  console.log("App rendered");

  function play() {
    new Audio(sound_boot).play();
  }

  return (
    <>
      <div>
        <h1>
          PERCEPTI<img className="eye" src={eye_gif}></img>N
        </h1>
        <Game />
      </div>
    </>
  );
}

export default App;
