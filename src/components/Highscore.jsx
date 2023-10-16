import React from "react";
import Leaderboard from "./Leaderboard";

export default function Highscore({
  handleCloseHighscorePopup,
  handleShare,
  setUsername,
}) {
  return (
    <div className="highscore-main">
      <div className="highscore-container">
        <h2 className="highscore-title">NEW HIGHSCORE!</h2>
        <button className="close" onClick={() => handleCloseHighscorePopup()}>
          ✖
        </button>
        <input
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
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="share" onClick={() => handleShare()}>
          SHARE!
        </button>
      </div>
      <Leaderboard isCentered={false}></Leaderboard>
    </div>
  );
}
