import React from "react";
import Start from "../components/Start";
import { useState } from "react";
import sound_loss from "../assets/loss.mp3";
import sound_boop from "../assets/boop.mp3";
import Highscore from "../components/Highscore";
import { uploadHighscore } from "../utils/api";
import {
  getMachineHighscore,
  getMachineUsername,
  setMachineHighscore,
  setMachineUsername,
} from "../utils/id";

export default function Game() {
  console.log("Game component rendered");

  const [newest, setNewest] = useState(null);
  let dead = true;
  const [deadState, setDeadState] = useState(true);
  const [i, setI] = useState(0);
  const [highscore, setHighscore] = useState(
    getMachineHighscore() ? getMachineHighscore() : "0"
  );
  const [showHighscorePopup, setShowHighscorePopup] = useState(false);
  const [username, setUsername] = useState(
    getMachineUsername() ? getMachineUsername() : ""
  );

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  let lastClick = Date.now();

  const handleNextRound = async (isFirst) => {
    var classes = document.querySelectorAll(".item:not(.selected)");

    classes.forEach(function (item) {
      item.classList.add("selected");
    });

    isFirst ? null : await timeout(400);
    classes.forEach(function (item) {
      item.classList.remove("selected");
    });

    var keys = Object.keys(classes);

    const newestTemp = classes[keys[(keys.length * Math.random()) << 0]];
    setNewest(newestTemp);

    new Audio(sound_boop).play();
    newestTemp.classList.add("selected");
  };

  const handleClick = async (event) => {
    if (deadState) return;
    if (Date.now() - lastClick < 400) return;
    lastClick = Date.now();
    if (event.target.classList.contains("item")) {
      if (event.target == newest) {
        handleNextRound();
        setI(i + 1);
      } else {
        dead = true;
        setDeadState(true);

        if (i > highscore) {
          setHighscore(i);
          if (i > 1) {
            setShowHighscorePopup(true);
          }
        }
        new Audio(sound_loss).play();
        var items = document.querySelectorAll(".item");

        items.forEach(function (item) {
          item.classList.add("dead");
        });

        await timeout(250);
        items.forEach(function (item) {
          item.classList.remove("dead");
        });

        newest.classList.add("reveal");
      }
    }
  };

  const handleStart = async (event) => {
    if (!deadState) return;
    dead = false;
    setDeadState(false);
    setI(0);
    var classes = document.querySelectorAll(".reveal");

    classes.forEach(function (item) {
      item.classList.remove("reveal");
    });

    var items = document.querySelectorAll(".item");

    items.forEach(function (item) {
      if (item.classList.contains("selected")) {
        item.classList.remove("selected");
      }
    });

    handleNextRound(true);
  };

  const handleCloseHighscorePopup = () => {
    setShowHighscorePopup(false);
  };

  const handleShare = () => {
    var groups = document.querySelectorAll(".group");

    let eyeText = "👁";
    let squareSelected = "🟩";
    let square = "⬛"; //
    let squareReveal = "🟥";

    // cuz groups have two rows
    let firstRow = "";
    let secondRow = "";

    let output =
      "PERCEPTI" + eyeText + "N " + "|" + " " + highscore + "/36 \n\n";

    let i = 0;
    let j = 0; // item # in group
    groups.forEach(async function (group) {
      i += 1;
      // when j = 4  group is done.
      if (i < 4) {
        group.querySelectorAll(".item").forEach(function (item) {
          j += 1;
          if (j < 3) {
            if (item.classList.contains("reveal")) {
              firstRow += squareReveal;
            } else if (item.classList.contains("selected")) {
              firstRow += squareSelected;
            } else {
              firstRow += square;
            }
          } else {
            if (item.classList.contains("reveal")) {
              secondRow += squareReveal;
            } else if (item.classList.contains("selected")) {
              secondRow += squareSelected;
            } else {
              secondRow += square;
            }
          }
          if (j == 4) {
            j = 0;
          }
        });
      }
      if (i == 3) {
        output += "\n" + firstRow + "\n" + secondRow;
        firstRow = "";
        secondRow = "";
        i = 0;
      }
    });

    setUsername(username);
    setMachineUsername(username);
    setMachineHighscore(highscore);
    uploadHighscore(username, highscore);

    navigator.clipboard.writeText(output);
    setShowHighscorePopup(false);
  };

  return (
    <>
      <span className="score">
        SCORE: {i} | BEST SCORE: {highscore}
      </span>
      <div className="game-container">
        <div className="game" onMouseDown={handleClick}>
          {Array.from({ length: 9 }, (_, index) => (
            <div className={`group group-${index + 1}`} key={index}>
              {Array.from({ length: 4 }, (_, itemIndex) => (
                <div className="item" key={itemIndex}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Start handleStart={handleStart} deadState={deadState}></Start>
      {showHighscorePopup && (
        <Highscore
          handleCloseHighscorePopup={handleCloseHighscorePopup}
          handleShare={handleShare}
          setUsername={setUsername}
        />
      )}
    </>
  );
}
