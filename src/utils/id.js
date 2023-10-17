export const getMachineId = () => {
  let machineId = localStorage.getItem("MachineId");

  if (!machineId) {
    machineId = crypto.randomUUID();
    localStorage.setItem("MachineId", machineId);
  }

  return machineId;
};

export const setMachineUsername = (username) => {
  localStorage.setItem("Username", username);
};

export const getMachineUsername = () => {
  return localStorage.getItem("Username");
};

export const setMachineHighscore = (highscore) => {
  localStorage.setItem("Highscore", highscore);
};

export const getMachineHighscore = () => {
  return localStorage.getItem("Highscore");
};
