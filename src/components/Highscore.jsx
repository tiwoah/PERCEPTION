import React from "react";
import Leaderboard from "./Leaderboard";
import { setMachineUsername, getMachineUsername } from "../utils/id";
import { useEffect, useRef } from "react";

export default function Highscore({
  handleCloseHighscorePopup,
  handleShare,
  setUsername,
}) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.value = getMachineUsername();
  }, []);

  return (
    <div className="highscore-main">
      <div className="highscore-container">
        <h2 className="highscore-title">NEW HIGHSCORE!</h2>
        <button className="close" onClick={() => handleCloseHighscorePopup()}>
          ✖
        </button>
        <input
          ref={ref}
          className="username-input"
          type="text"
          id="username"
          name="perception-username"
          required
          minLength="3"
          maxLength="16"
          size="8"
          placeholder="username"
          spellCheck="false"
          onChange={(e) => {
            setUsername(e.target.value);
            setMachineUsername(e.target.value);
          }}
        />
        <button className="share" onClick={() => handleShare()}>
          SHARE!
        </button>
      </div>
      <Leaderboard isCentered={false}></Leaderboard>
    </div>
  );
}
