import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import React, { useEffect, useState } from "react";
import { GameModeIdentifier } from "../../../../types/single/gameMode";
import { getSelectedBackgroundTheme } from "../../selectedBackgroundTheme";
interface LoserScreenProps {
  mode: GameModeIdentifier;
  finalScreen?: boolean;
  gameCode?: string;
}
//
const LoserScreen: React.FC<LoserScreenProps> = ({
  mode,
  gameCode,
  finalScreen = true,
}) => {
  socket.on("kick-warning", ({ message }) => {
    console.log(message);
    // UPDATE: add pop up when kicked
    FlowRouter.go("/");
  });

  const leave = () => {
    socket.emit("leave-game", { userID: socket.id });
    FlowRouter.go("/");
  };

  const spectate = () => {
    socket.emit("spectate-game", { userID: socket.id });
    FlowRouter.go(`/session/${gameCode}`, {}, { fromBattle: "true" });
  };

  var backgroundLocation = getSelectedBackgroundTheme().toUpperCase();
  var backgroundString =
    "url('https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/background/" +
    backgroundLocation +
    ".jpg')";

  return (
    <div
      style={{
        backgroundImage: backgroundString,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/60">
        <GenericHeader color="red">
          <OutlineText size="extraLarge">DEFEATED!</OutlineText>
        </GenericHeader>
        <div className="bg-peach flex items-center flex flex-col justify-around border-[4px] border-blackCurrant w-[90%] h-[75%] rounded-xl mt-[10%] xl:mt-[8%] xl: space-y-0 pl-[10%] pr-[10%] pt-[2%] text-center">
          <OutlineText size="large">BETTER LUCK NEXT TIME!</OutlineText>

          <img
            className="w-[40rem] h-[40rem] xl:w-[20rem] xl:h-[20rem]"
            src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/ending/GRAVE.png`}
            alt={`GRAVE image`}
          />
          <div className="flex flex-row gap-4">
            {" "}
            {/* Add this container div */}
            {mode === GameModeIdentifier.BATTLE_ROYALE && !finalScreen && (
              <ButtonGeneric
                color="red"
                size="medium"
                onClick={() => spectate()}
              >
                <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
                  <div>
                    <OutlineText size="medium">SPECTATE</OutlineText>
                  </div>
                </div>
              </ButtonGeneric>
            )}
            <ButtonGeneric color="red" size="medium" onClick={() => leave()}>
              <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
                <div>
                  <OutlineText size="medium">EXIT LOBBY</OutlineText>
                </div>
              </div>
            </ButtonGeneric>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoserScreen;
