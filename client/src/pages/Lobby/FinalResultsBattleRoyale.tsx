import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BaseCard } from "../../components/cards/BaseCard";
import socket from "../../socket";
import { PlayerState } from "../../../../types/single/playerState";
import { BackgroundThemePage } from "../../components/pagelayouts/BackgroundThemePage";
import { removeSelectedBackgroundTheme } from "../../selectedBackgroundTheme";

interface FinalResultsBattleRoyaleProps {
  gameCode?: string;
}

export const FinalResultsBattleRoyale = ({
  gameCode,
}: FinalResultsBattleRoyaleProps) => {
  const [finalWinner, setFinalWinner] = useState<
    PlayerState | null | undefined
  >(undefined); // null means there is no final winner (i.e., draws)

  useEffect(() => {
    if (!socket) return;

    socket.emit("get-final-winner", { gameCode });
    socket.on("final-winner-response", ({ finalWinner }) => {
      setFinalWinner(finalWinner);
    });

    return () => {
      socket.off("final-winner-response");
    };
  }, [gameCode]);

  // Wait until final results are available
  if (finalWinner === undefined) {
    console.log("Waiting for winner to be fetched...");
    return (
      <div>
        <OutlineText size="large">Loading final results...</OutlineText>
      </div>
    );
  }

  console.log(
    `Winner fetched: ${
      finalWinner ? finalWinner.name : "There is no final winner"
    }`,
  );

  // Button handler for restarting a new lobby
  const renderConfigPage = () => {
    socket.emit("cancel-game", { gameCode });
    removeSelectedBackgroundTheme();
    FlowRouter.go("/host/choose-mode");
  };

  // Button handler for exiting to home
  const exitToHome = () => {
    socket.emit("cancel-game", { gameCode });
    removeSelectedBackgroundTheme();
    FlowRouter.go("/");
  };

  return (
    <BackgroundThemePage>
      <div className="flex lg:flex-row lg:h-1/4 sm:flex-col w-full">
        <div className="flex flex-row w-1/8 sm:h-1/2">
          <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
            <LogoResizable className="h-[200%] w-[200%]" />
          </div>
        </div>
        <div className="flex flex-row lg:h-full lg:w-3/4 sm:h-3/4 lg:items-start sm:items-end justify-around">
          <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
            <BaseCard color="springLeaves" width={50} height={8}>
              <OutlineText size="extraLarge">
                {finalWinner ? "FINAL WINNER" : "NO SURVIVORS"}
              </OutlineText>
            </BaseCard>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start w-3/4 bg-peach outline-blackCurrant outline-[0.25rem] rounded-2xl px-6 py-2 h-[200%]">
        {finalWinner ? (
          <>
            <div className="mb-2 text-center">
              <OutlineText size="large">{finalWinner.name}</OutlineText>
              <OutlineText size="medium">
                {finalWinner.monster?.name}
              </OutlineText>
            </div>
            <img
              className="max-w-[30%] max-h-full object-contain"
              src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/ending/${finalWinner.monster?.id}_WIN.png`}
              alt={`${finalWinner.monster?.id}_WIN image`}
            />
          </>
        ) : (
          <>
            <div className="mb-2 text-center">
              <OutlineText size="large">
                All players were eliminated.
              </OutlineText>
            </div>
            <div className="flex flex-row items-center justify-center space-x-[3rem]">
              <img
                className="max-w-[15%] max-h-full object-contain"
                src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/ending/GRAVE.png`}
                alt="Small GRAVE left"
              />
              <img
                className="max-w-[30%] max-h-full object-contain"
                src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/ending/GRAVE.png`}
                alt="Main GRAVE image"
              />
              <img
                className="max-w-[15%] max-h-full object-contain"
                src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/ending/GRAVE.png`}
                alt="Small GRAVE right"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex flex-row items-center justify-center h-1/2 space-x-[5rem]">
        <ButtonGeneric color="ronchi" size="medium" onClick={renderConfigPage}>
          <OutlineText size="medium">NEW LOBBY</OutlineText>
        </ButtonGeneric>
        <ButtonGeneric color="red" size="medium" onClick={exitToHome}>
          <OutlineText size="medium">EXIT TO HOME</OutlineText>
        </ButtonGeneric>
      </div>
    </BackgroundThemePage>
  );
};
