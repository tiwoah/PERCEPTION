import React from "react";
import Start from "../components/Start";
import { useState } from "react";
import sound_loss from "../assets/loss.mp3";
import sound_boop from "../assets/boop.mp3";

export default function Game() {
  console.log("Game component rendered");

  let newest = null;

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const handleNextRound = async () => {
    var classes = document.querySelectorAll(".item:not(.selected)");
    var keys = Object.keys(classes);
    newest = classes[keys[(keys.length * Math.random()) << 0]];

    await timeout(200);
    new Audio(sound_boop).play();
    newest.classList.add("selected");
  };

  const handleClick = (event) => {
    if (event.target.classList.contains("item")) {
      if (event.target == newest) {
        console.log("W, going next round.");
        handleNextRound();
      } else {
        console.log("L");
        new Audio(sound_loss).play();
      }
    }
  };

  const handleStart = async (event) => {
    console.log("start");

    var items = document.querySelectorAll(".item");

    // Loop through each element and remove class "selected" if it exists
    items.forEach(function (item) {
      if (item.classList.contains("selected")) {
        item.classList.remove("selected");
      }
    });

    handleNextRound();
  };

  return (
    <>
      <div className="container" onClick={handleClick}>
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
      <Start handleStart={handleStart}></Start>
    </>
  );
}
