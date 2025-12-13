import React, { useState } from "react";
import socket from "../../socket";

const CreatePlayer: React.FC = () => {
  const [name, setName] = useState("");

  const handleClick = () => {
    if (name.trim()) {
      socket.emit("create_player", name);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleClick} className="outline-consistent">Create Player</button>
    </div>
  );
};

export default CreatePlayer;
