import React, { useState, useEffect, useRef } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { LoginPopup } from "./Login";
import { IconButton } from "../../components/buttons/IconButton";
import { isBGMEnabled, playBGM,toggleBGM,initBGM } from "../../audioManager";
import { PopupClean } from "../../components/popups/PopupClean";
import { userInfo } from "os";
import { SeasonalEventIdentifier } from "../../../../types/single/seasonalEventState";
import { BlackText } from "../../components/texts/BlackText";
import { Screens } from "../../screens";

interface DuelLobbyTempProps {
  setScreen: (screen: Screens) => void;
  isDuel?: boolean;
}

export const DuelLobbyTemp: React.FC<DuelLobbyTempProps> = ({ setScreen, isDuel }) => {
  const [players, setPlayers] = useState<PlayerState[]>([]);

  useEffect(() => {
    socket.on("update-players", ({ message, players }) => {
      console.log(message);

      // Update player list
      if (Array.isArray(players)) {
        setPlayers(players);
      } else {
        console.error("'players' is not an array", players);
      }
    });

    return () => {
      socket.off("update-players", handleUpdatePlayers);
    };
  }, []);

  return (
    <BlankPage>
      <div className="flex lg:flex-row lg:h-1/2 sm:flex-col w-full">
        <div className="flex flex-row w-1/4 sm:h-1/4">
          <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
          </div>
        </div>
        <div className="flex flex-row lg:h-full lg:w-1/2 sm:h-3/4 lg:items-center sm:items-end justify-around">
          <LogoResizable className="lg:w-1/2 h-full"></LogoResizable>
        </div>
      </div>

        <div className="flex flex-col lg:space-y-[1rem] space-y-[3rem] items-center flex-grow justify-center ">
            {/* Player labels for testing */}
            <div className="flex flex-col gap-4 mb-8">
              {players.map((player, index) => (
                <BlackText key={index} size="large">
                  Player {index + 1}: {player.name}
                </BlackText>
              ))}
            </div>

            <ButtonGeneric
            color="ronchi"
            size="large"
            mobileHidden="true"
            >
            <OutlineText size="large">INVITE</OutlineText>
          </ButtonGeneric>
        </div>
    </BlankPage>
  );
};

const seasonalEventMap = new Map([[9, SeasonalEventIdentifier.SPOOK_GARDEN]]);
