import React, { useEffect, useState } from "react";
import socket from "../../socket"; // Ensure you import the socket instance
import { Screens } from "../../screens";
import WaitingScreen from "../Game/WaitingScreen";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { MonsterSelect } from "../Game/MonsterSelect";
import { DuelLobbyTemp } from "./DuelLobbyTemp";
import DuelLobby from "./DuelLobby";

interface GameProps {
  gameSessionId: string; // Add battleId as a prop
}

export const Game: React.FC<GameProps> = ({ gameSessionId }) => {
  const [isDuel, setIsDuel] = useState<boolean>(() => {
    const queryParams = FlowRouter.current().queryParams;
    return queryParams.duel === "true";
  });

  const [isHost, setIsHost] = useState<boolean>(() => {
    const queryParams = FlowRouter.current().queryParams;
    return queryParams.isHost === "true";
  });

  const [screen, setScreen] = useState<Screens>(() => {
    const queryParams = FlowRouter.current().queryParams;
    if (queryParams.fromBattle === "true") {
      // If returning from battle, go to appropriate waiting screen
      return queryParams.duel === "true"
        ? Screens.DUEL_WAITING_SCREEN
        : Screens.WAITING_SCREEN;
    }
    return Screens.CHARACTER_SELECT_SCREEN;
  }); // State to track the current screen

  useEffect(() => {
    const handleNewConnect = () => {
      FlowRouter.go("/");
    };

    socket.on("new-connect", handleNewConnect);

    return () => {
      socket.off("new-connect", handleNewConnect);
    };
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case Screens.CHARACTER_SELECT_SCREEN:
        return <MonsterSelect setScreen={setScreen} isDuel={isDuel} />;
      case Screens.WAITING_SCREEN:
        return isDuel ? (
          <DuelLobby
            setScreen={setScreen}
            isDuel={isDuel}
            isHost={isHost}
            gameSessionId={gameSessionId}
          />
        ) : (
          <WaitingScreen setScreen={setScreen} isDuel={isDuel} />
        );
      case Screens.DUEL_WAITING_SCREEN:
        return (
          <DuelLobby
            setScreen={setScreen}
            isDuel={isDuel}
            isHost={isHost}
            gameSessionId={gameSessionId}
          />
        );
      default:
        return <MonsterSelect setScreen={setScreen} isDuel={isDuel} />;
    }
  };

  return <div>{renderScreen()}</div>;
};
