import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { IconButton } from "../../components/buttons/IconButton";
import socket from "../../socket";
import { MonsterIdentifier } from "/types/single/monsterState";
import { getBiomeString } from "./AdventureBattle";
import { monsterMeta } from "../../data/monsterMeta";
import { BlackText } from "../../components/texts/BlackText";
import { motion, AnimatePresence } from "framer-motion";
import { BaseCard } from "../../components/cards/BaseCard";
import { PlayerState } from "../../../../types/single/playerState";
import { BattleMonsterImage } from "../../components/player-screen/monsters/BattleMonsterImage";
import { MonsterImage } from "../../components/player-screen/monsters/MonsterImage";
import { MonsterImageResizable } from "../../components/player-screen/monsters/MonsterImageResizable";
import { ArchetypeIdentifier } from "../../../../types/single/monsterState";
import { PopupClean } from "../../components/popups/PopupClean";
import { QRCodeSVG } from "qrcode.react";
import { Screens } from "../../screens";
import { Meteor } from "meteor/meteor";
import { DuelLobbyInfoPopup } from "../../components/popups/DuelLobbyInfoPopup";

interface DuelLobbyProps {
  setScreen: (screen: Screens) => void;
  isDuel?: Boolean;
  isHost?: Boolean;
  gameSessionId: string;
}

const DuelLobby: React.FC<DuelLobbyProps> = ({
  setScreen,
  isDuel,
  isHost,
  gameSessionId,
}: DuelLobbyProps) => {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [opponentState, setOpponentState] = useState<PlayerState | null>(null);
  const [showingInvitePanel, setShowingInvitePanel] = useState<Boolean>(false);
  const [inviteAccepted, setInviteAccepted] = useState<Boolean>(false);
  const [exitPopup, setExitPopup] = useState<Boolean>();
  const [guestExitPopup, setGuestExitPopup] = useState<Boolean>(false);

  const handleStartGame = () => {
    console.log("DEBUGGING: STARTGAME CALLED");
    socket.emit("start-game", { gameCode: gameSessionId });
  };

  // deletes game session
  const closeGame = () => {
    // UPDATE: popup asking if they are sure before returning to game setup screen
    socket.emit("cancel-game", { gameCode: gameSessionId });
    // return game setup screen
    FlowRouter.go("/online");
  };

  const kickWarningHandler = ({ message }: { message: string }) => {
    console.log(message);
    setGuestExitPopup(true);
  };

  useEffect(() => {
    const battleStartedHandler = (battleId: string) => {
      FlowRouter.go(`/battle/${battleId}`);
    };

    const handleUpdatePlayers = ({
      message,
      players,
    }: {
      message: string;
      players: PlayerState[];
    }) => {
      console.log(message);

      // Update player list
      if (Array.isArray(players)) {
        console.log(players);
        //setPlayers(players);
        setPlayerState(players[0]);
        setOpponentState(players[1]);
        console.log("Current player state", playerState);
        console.log("Current opponent state", opponentState);
        if (opponentState != null) {
          console.log("Invite has been accepted");
          setInviteAccepted(true);
        }
      } else {
        console.error("'players' is not an array", players);
      }
    };

    socket.on("update-players", handleUpdatePlayers);
    socket.on("battle-started", battleStartedHandler);
    socket.on("kick-warning", kickWarningHandler);

    return () => {
      socket.off("update-players", handleUpdatePlayers);
    };
  }, [opponentState]);

  // Monster image (coloured or silhouette if locked)

  // Background image
  const backgroundString = `url('https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/background/FOREST.jpg')`;

  return (
    <div className="relative flex flex-col items-center justify-center h-[100dvh] w-full px-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: backgroundString,
        }}
      />
      {showingInvitePanel && (
        /**<PopupClean>
          <div className="relative bottom-20 right-12 h-min w-min">
            <IconButton
              size="small"
              style="x"
              buttonColour="red"
              iconColour="black"
              onClick={() => setShowingInvitePanel(false)}
            />
          </div>
          <div className="flex flex-col justify-between items-center">
            <div className="items-center flex-col inline-block inline-flex outline-offset-0 relative">
              <OutlineText size="choice-text">{`Room Code:`}</OutlineText>
              <OutlineText size="choice-text">{`${gameSessionId}`}</OutlineText>
            </div>
            <QRCodeSVG
              value={`${Meteor.settings.public.SERVER_URLS[0]}/join/${gameSessionId}`}
              size={300}
              bgColor="#FFFFFF"
              marginSize={2}
            />
            <div className="flex flex-row justify-evenly grow">
              <BaseCard color="alto">
                <BlackText size="tiny">
                  <p className="truncate text-ellipsis w-64">
                    {`${Meteor.settings.public.SERVER_URLS[0]}/join/${gameSessionId}`}
                  </p>
                </BlackText>
              </BaseCard>
              <IconButton
                style="copy"
                buttonColour="alto"
                iconColour="black"
                size="small"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${Meteor.settings.public.SERVER_URLS[0]}/join/${gameSessionId}`
                  );
                }}
              />
            </div>
          </div>
        </PopupClean>*/
        <DuelLobbyInfoPopup
          setShowingInvitePanel={setShowingInvitePanel}
          gameSessionId={`${gameSessionId}`}
        />
      )}

      {/* POPUPS */}
      {/* Popup: Confirming whether host wants to exit game. */}
      {exitPopup && isHost && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">EXIT GAME?</OutlineText>
            <BlackText size="large">
              THIS WILL CANCEL THE GAME SESSION, REMOVING ALL PLAYERS, AND END
              ALL BATTLES.
            </BlackText>
            <div className="mt-[1rem]">
              <BlackText size="large">ARE YOU SURE YOU WANT TO EXIT?</BlackText>
            </div>
            {/* <div className="flex flex-row justify-between items-center"> */}
            <div className="justify-center items-center flex lg:gap-[5rem] sm:gap-10 pb-[1rem] mt-[1rem]">
              <ButtonGeneric
                size="large"
                color="blue"
                onClick={() => setExitPopup(false)}
              >
                <OutlineText size={"small"}>CANCEL</OutlineText>
              </ButtonGeneric>
              <ButtonGeneric size="large" color="red" onClick={closeGame}>
                <OutlineText size={"small"}>EXIT</OutlineText>
              </ButtonGeneric>
            </div>
          </div>
        </PopupClean>
      )}

      {/* Popup */}
      {guestExitPopup && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">
              YOU HAVE BEEN REMOVED FROM THE GAME SESSION.
            </OutlineText>
            <div className="mt-10 flex flex-col items-center">
              <ButtonGeneric
                size="large"
                color="red"
                onClick={() => FlowRouter.go("/")}
              >
                EXIT
              </ButtonGeneric>
            </div>
          </div>
        </PopupClean>
      )}

      {/* Back arrow button */}

      {/* "CLASSIC" header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-20 pt-3">
        <BaseCard color="schoolBusYellow" width={60} height={12}>
          <OutlineText size="extraLarge">WAITING FOR OPPONENT....</OutlineText>
        </BaseCard>
      </div>

      <div className="absolute h-screen w-screen flex items-center justify-center z-10">
        <ButtonGeneric
          color={inviteAccepted ? "pink" : "purple"}
          isDisabled={
            (opponentState != null && !opponentState?.monster) || !isHost
          }
          size="battle"
          onClick={
            !inviteAccepted
              ? () => {
                  setShowingInvitePanel(true);
                }
              : () => {
                  handleStartGame();
                }
          }
        >
          <OutlineText size="choice-text">
            {opponentState != null ? "PLAY" : "INVITE"}
          </OutlineText>
        </ButtonGeneric>
        <div className="fixed bottom-4 left-0 lg:ml-5 lg:mt-5 sm:ml-6 sm:mt-6">
          <IconButton
            style="arrowleft"
            iconColour="black"
            buttonColour="red"
            size="medium"
            onClick={() => setExitPopup(true)}
          />
        </div>
      </div>
      <div className="lg:flex h-screen w-screen lg:h-[90%] lg:w-[80%] fixed">
        <div className="flex max-lg:items-end items-center justify-center max-lg:absolute max-lg:inset-0 lg:flex-1 bg-defender/70 max-lg:h-full max-lg:[clip-path:polygon(0_100%,100%_100%,0_0)] lg:border-blackcurrant lg:border-[4px] lg:rounded-l-xl">
          <div className="flex flex-col items-center max-lg:bottom-80 max-lg:left-35 max-lg:fixed">
            <OutlineText size="choice-text">
              {!playerState?.monster
                ? playerState?.name
                : playerState?.name + `'s`}
            </OutlineText>
            <OutlineText size="choice-text">
              {playerState?.monster ? `${playerState?.monster.name}` : ``}
            </OutlineText>
            <div className="transform -scale-x-100">
              <MonsterImageResizable
                name={playerState?.monster ? playerState?.monster?.id : "NONE"}
                width={20}
                height={20}
              ></MonsterImageResizable>
            </div>
          </div>
        </div>
        <svg
          className="lg:invisible absolute inset-0 z-15 pointer-events-none w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke="#1f1b2e" // blackCurrant
            strokeWidth="1"
          />
        </svg>
        <div className="flex max-lg:items-start items-center justify-center max-lg:absolute max-lg:inset-0 lg:flex-1 bg-attacker/70 max-lg:h-full max-lg:[clip-path:polygon(0_0,100%_100%,100%_0)] lg:border-blackcurrant lg:border-[4px] lg:rounded-r-xl">
          <div className="flex flex-col items-center max-lg:top-80 max-lg:right-35 max-lg:fixed">
            <OutlineText size="choice-text">
              {!opponentState?.monster
                ? opponentState?.name
                : opponentState?.name + `'s`}
            </OutlineText>
            <OutlineText size="choice-text">
              {opponentState?.monster ? `${opponentState?.monster.name}` : ``}
            </OutlineText>
            <MonsterImageResizable
              name={
                opponentState?.monster ? opponentState?.monster?.id : "NONE"
              }
              width={20}
              height={20}
            ></MonsterImageResizable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuelLobby;
