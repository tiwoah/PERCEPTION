import React from "react";
import { useState, useEffect } from "react";
import { getLeaderboard } from "../utils/api";
export default function Leaderboard({ isCentered }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortedHighToLowScores = (users) => {
    return users.sort((a, b) => {
      return b.score - a.score;
    });
  };

  const fetchLeaderboardData = async () => {
    try {
      const leaderboardData = await getLeaderboard();
      setUsers(sortedHighToLowScores(leaderboardData));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };
  //   fetchLeaderboardData();
  useEffect(() => {
    setLoading(true);
    fetchLeaderboardData();
  }, []);
  return (
    <div className={`leaderboard-container ${isCentered ? "centered" : ""}`}>
      <h2 className="leaderboard__title">leaderboard</h2>
      <div className="leaderboard">
        {loading && <div className="loading-indicator">loading...</div>}
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
