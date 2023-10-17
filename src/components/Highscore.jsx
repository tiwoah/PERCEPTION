import React from "react";
import Leaderboard from "./Leaderboard";
import { setMachineUsername, getMachineUsername } from "../utils/id";
import { useEffect, useRef, useState } from "react";

export default function Highscore({
  handleCloseHighscorePopup,
  handleShare,
  setUsername,
}) {
  const ref = useRef(null);
  const [displayError, setDisplayError] = useState(false);
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
          pattern="^[a-zA-Z0-9]+$"
          onChange={(e) => {
            setUsername(e.target.value);
            setMachineUsername(e.target.value);
          }}
        />
        <h2
          className="highscore-error"
          style={{ display: displayError ? "" : "none" }}
        >
          invalid username
        </h2>
        <button
          className="share"
          onClick={() => {
            if (ref.current.checkValidity() == false) {
              console.log(ref.current.validity);
              setDisplayError(true);
            } else {
              handleShare();
              setDisplayError(false);
            }
          }}
        >
          SHARE!
        </button>
      </div>
      {/* <Leaderboard isCentered={false}></Leaderboard> */}
    </div>
  );
}
