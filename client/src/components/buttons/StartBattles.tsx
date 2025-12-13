import React, { useState } from "react";
import socket from "../../socket";

const StartBattles: React.FC = () => {
  const handleClick = () => {
    socket.emit("start_battle");
  };

  return (
    <div>
      <button onClick={handleClick } className="outline-consistent">Start Battles</button>
    </div>
  );
};

export default StartBattles;
