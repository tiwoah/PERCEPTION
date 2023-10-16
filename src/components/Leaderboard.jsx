import React from "react";
import { useState, useEffect } from "react";
import { getLeaderboard } from "../utils/api";
export default function Leaderboard({ isCentered }) {
  const [users, setUsers] = useState([]);

  const sortedHighToLowScores = (users) => {
    return users.sort((a, b) => {
      return b.score - a.score;
    });
  };

  const fetchLeaderboardData = async () => {
    try {
      const leaderboardData = await getLeaderboard();
      //   setUsers(leaderboardData);
      //   console.log("Leaderboard data:", leaderboardData);
      //   console.log(sortedHighToLowScores(leaderboardData));
      setUsers(sortedHighToLowScores(leaderboardData));
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);
  return (
    <div className={`leaderboard-container ${isCentered ? "centered" : ""}`}>
      <h2 className="leaderboard__title">leaderboard</h2>
      <div className="leaderboard">
        {users.map((user) => {
          return (
            <div className="leaderboard-item" key={user.id}>
              <div className="leaderboard-item__username">{user.name}</div>
              <div className="leaderboard-item__score">{user.score}</div>
              {/* <div className="leaderboard-item__awd">{user.mode}</div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
