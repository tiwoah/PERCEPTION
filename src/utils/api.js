const API_BASE_URL = "https://perception-server.vercel.app";
import { getMachineId } from "./id";
import axios from "axios";

export const uploadHighscore = async (username, highscore) => {
  const id = getMachineId();
  const name = username;
  const time = new Date().getTime();
  const mode = "practice";
  const score = highscore;
  const tries = 0;

  // $.getJSON("https://api.db-ip.com/v2/free/self", function (data) {
  //   console.log(JSON.stringify(data, null, 2));
  // });

  axios
    .post(API_BASE_URL + "/createUser", { id, name, time, mode, score, tries })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};
