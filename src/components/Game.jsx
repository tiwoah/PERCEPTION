import React from "react";
import Start from "../components/Start";
import { useState } from "react";
import sound_loss from "../assets/loss.mp3";
import sound_boop from "../assets/boop.mp3";

export default function Game() {
  console.log("Game component rendered");

  let newest = null;
  let dead = true;
  let i = 0;
  const [highscore, setHighscore] = useState(0);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

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
    newest = classes[keys[(keys.length * Math.random()) << 0]];

    new Audio(sound_boop).play();
    newest.classList.add("selected");
  };

  const handleClick = async (event) => {
    if (dead) return;
    if (event.target.classList.contains("item")) {
      if (event.target == newest) {
        handleNextRound();
        i += 1;
      } else {
        dead = true;
        if (i > highscore) {
          setHighscore(i);
          console.log(highscore);
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
    dead = false;
    i = 0;
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

  return (
    <>
      <span className="highscore" style={{ color: "#FFF" }}>
        BEST SCORE: {highscore}
      </span>
      <div className="game-container">
        <div className="game" onMouseDown={handleClick}>
          <div className="group group-1">
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
          </div>
          <div className="group group-2">
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
          </div>
          <div className="group group-3">
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
          </div>
          <div className="group group-4">
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
          </div>
          <div className="group group-5">
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
          </div>
          <div className="group group-6">
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
          </div>
          <div className="group group-7">
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
          </div>
          <div className="group group-8">
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
          </div>
          <div className="group group-9">
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
            <div className="item item-x"></div>
          </div>
        </div>
      </div>
      <Start handleStart={handleStart}></Start>
    </>
  );
}
