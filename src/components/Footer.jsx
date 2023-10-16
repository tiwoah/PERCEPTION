import React from "react";
import { Link } from "react-router-dom";
import leaderboard_icon from "../assets/leaderboard.svg";
import home_icon from "../assets/home.svg";

export default function Footer() {
  return (
    <>
      <a href="https://portfolio-tim.vercel.app/" target="_blank">
        <div className="footer">Portfolio ↗</div>
      </a>
      <Link to="/leaderboard">
        <button className="leaderboard-button">
          <img src={leaderboard_icon}></img>
        </button>
      </Link>
      <Link to="">
        <button className="home-button">
          <img src={home_icon}></img>
        </button>
      </Link>
    </>
  );
}
