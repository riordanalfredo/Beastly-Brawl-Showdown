import React, { useEffect } from "react";
import { BattleHealthBar } from "../bars/BattleHealthBar";
import { BattleState } from "/types/composite/battleState";
import { OutlineText } from "../texts/OutlineText";

interface AdventureBattleHeaderProps {
  battleState: BattleState;
}

export const AdventureBattleHeader: React.FC<AdventureBattleHeaderProps> = ({
  battleState,
}) => {
  return (
    <div
      className="
      bg-[#ffe9af]
      border
      border-4
      border-[#3d2f4f]
      rounded-bl-[20px]
      rounded-br-[20px]
      flex
      justify-between
      px-[20px]
      py-[12px]
      w-auto
      box-border
      mx-[8px]
      mt-[-8px]
    "
    >
      {/* Your Player's Details */}
      <div
        className="
        flex
        flex-col
        gap-[4px]
        w-[45%]
        items-start
        text-left
      "
      >
        {/* Health Bar */}
        <BattleHealthBar
          currentHealth={battleState.yourPlayer.currentHealth}
          maxHealth={battleState.yourPlayerMonster.maxHealth}
        />
        {/* Status Map */}
        <div className="flex flex-row xl:pt-[0.5rem] pt-[1.5rem] gap-x-[0.5rem] xl:gap-x-[0.5rem]">
          {battleState.yourPlayer.statuses.length === 0 && (
            <div className="lg:size-[1rem] sm:size-[3rem]" />
          )}{" "}
          {battleState.yourPlayer.statuses.map((status) => (
            <img
              className=" size-[4.5rem] xl:size-[2.5rem] object-contain rounded-md inline-block"
              src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/status/${status.name
                .replace(/\s+/g, "_")
                .toUpperCase()}.png`}
              alt={`${status.name.toUpperCase()} image`}
            />
          ))}
        </div>
        {/* Player / Monster Name */}
        <div className="leading-none pt-[2%]">
          <OutlineText size="small">
            {battleState.yourPlayerMonster.id.toUpperCase().replace("_", " ")}
          </OutlineText>
        </div>
        <div className="leading-none pb-[2%]">
          <OutlineText size="medium">
            {battleState.yourPlayer.name.toUpperCase()}
          </OutlineText>
        </div>
      </div>

      {/* Enemy Player's Details */}
      <div
        className="
        flex
        flex-col
        gap-[4px]
        w-[45%]
        items-end
        text-right
      "
      >
        {/* Health Bar */}
        <BattleHealthBar
          currentHealth={battleState.opponentPlayer.currentHealth}
          maxHealth={battleState.opponentPlayerMonster.maxHealth}
        />

        {/* Status Map */}
        <div className="flex flex-row xl:pt-[0.5rem] pt-[1.5rem] gap-x-[0.5rem] xl:gap-x-[0.5rem]">
          {battleState.opponentPlayer.statuses.length === 0 && (
            <div className="lg:size-[1rem] sm:size-[3rem]" />
          )}{" "}
          {battleState.opponentPlayer.statuses.map((status) => (
            <img
              className=" size-[4.5rem] xl:size-[2.5rem] object-contain rounded-md inline-block"
              src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/status/${status.name
                .replace(/\s+/g, "_")
                .toUpperCase()}.png`}
              alt={`${status.name.toUpperCase()} image`}
            />
          ))}
        </div>

        {/* Player / Monster Name */}
        <div className="leading-none pt-[2%]">
          <OutlineText size="small">
            {battleState.opponentPlayerMonster.id
              .toUpperCase()
              .replace("_", " ")}
          </OutlineText>
        </div>
        <div className="leading-none pb-[2%]">
          <OutlineText size="medium">
            {battleState.opponentPlayer.name.toUpperCase()}
          </OutlineText>
        </div>
      </div>
    </div>
  );
};

export default AdventureBattleHeader;
