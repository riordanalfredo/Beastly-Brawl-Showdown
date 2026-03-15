import React from "react";
import { PlayerState } from "/types/single/playerState";
import { BattleHealthBar } from "../bars/BattleHealthBar";
import { OutlineText } from "../texts/OutlineText";
import { Status } from "/server/src/model/game/status/status";
import { BlackText } from "../texts/BlackText";
import { MonsterIdentifier } from "/types/single/monsterState";

interface AdventureInfoPanelProps {
  playerState: PlayerState;
  level: MonsterIdentifier;
  stage: number;
}

export const AdventureInfoPanel: React.FC<AdventureInfoPanelProps> = ({
  playerState,
  level,
  stage,
}) => {
  return (
    <>
      <div
        className="
      bg-[#ffe9af]
      flex flex-col gap-2
      box-border
      border-4
      border-[#3d2f4f]
      rounded-bl-[20px]
      rounded-br-[20px]
      sm:outline-[0.25rem]
      md:outline-[0.1rem]
      w-auto
      sm:h-[20rem]
      lg:h-auto
      mx-[8px]
      lg:mt-[-8px]
      sm:mt-[-2rem]
      xl:px-[1rem]
      px-[2rem]
      py-[0.5rem]
      lg:pt-[1rem]  
      sm:pt-[3rem]
    "
      >
        {/* Player Name */}
        <div className="flex leading-none pt-[0] gap-y-[0]">
          <BlackText size="medium">
            {`${playerState.name.toUpperCase()}'S ${playerState.monster?.name.toUpperCase()}`}
          </BlackText>
        </div>

        <div>
          {/* Health Bar */}
          <BattleHealthBar
            currentHealth={playerState.currentHealth}
            maxHealth={playerState.monster?.maxHealth ?? 10000}
          />
          {/* Status Map */}
          <div className="flex flex-row xl:pt-[0.5rem] pt-[1.5rem] gap-x-[0.5rem] xl:gap-x-[0.5rem]">
            {playerState.statuses.length === 0 && (
              <div className="lg:size-[1rem] sm:size-[3rem]" />
            )}{" "}
            {playerState.statuses.map((status) => (
              <img
                className=" size-[4.5rem] xl:size-[2.5rem] object-contain rounded-md inline-block"
                src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/status/${status.name
                  .toUpperCase()
                  .replace(/\s+/g, "_")}.png`}
                alt={`${status.name.toUpperCase()} image`}
              />
            ))}
          </div>
        </div>
        {/* Adventure Level/Stage */}
        <div className="flex justify-between pt-0 xl:mt-[-0.5rem]">
          <BlackText size="medium">LEVEL: {level.replace(/_/g, " ")}</BlackText>
          <BlackText size="medium">STAGE: {stage}</BlackText>
        </div>
      </div>
    </>
  );
};
