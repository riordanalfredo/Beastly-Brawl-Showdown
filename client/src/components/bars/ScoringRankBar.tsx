import React from "react";
import { OutlineText } from "../texts/OutlineText";
import { PlayerState } from "../../../../types/single/playerState";
import { PlayerScore } from "../../../../types/single/playerScore";

interface ScoringRankBarProps {
  player: PlayerState;
  rank: number;
  score?: PlayerScore;
}

export const ScoringRankBar = ({
  player,
  rank,
  score,
}: ScoringRankBarProps) => {
  const scoringRankBarStyleSets: Record<number, [string, string, string]> = {
    1: ["1st", "bg-saffron", "w-9/10"],
    2: ["2nd", "bg-brightsilver", "w-8/10"],
    3: ["3rd", "bg-terracotta", "w-7/10"],
  };

  const rankToDisplay = scoringRankBarStyleSets[rank][0];
  const colourToDisplay = scoringRankBarStyleSets[rank][1];
  const widthToDisplay = scoringRankBarStyleSets[rank][2];
  const imagePath =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    player.monster?.id +
    ".png";
  const altText = "Image of " + player.monster?.name;

  const rankingBarProperties = `
    absolute
    top-0
    left-0
    w-full
    h-full
    border-3
    flex
    items-center
    justify-center
    rounded-e-[0.5rem]
    justify-start pl-[3%]
    ${colourToDisplay}
  `;

  return (
    <div
      className={`flex flex-row h-full ${widthToDisplay} items-center justify-between`}
    >
      <div className="relative w-full h-full">
        <div className={`${rankingBarProperties}`}>
          <div className="flex justify-between items-center w-full px-3">
            <div className="flex flex-col leading-none pt-[0.25rem]">
              <OutlineText size="large">
                {player.name.toUpperCase()}
              </OutlineText>
            </div>
            <div className="flex items-center leading-none max-w-[5rem] text-center justify-end break-words">
              <OutlineText size="medium">{player.monster?.name}</OutlineText>
              <img
                src={imagePath}
                alt={altText}
                className="w-[100%] h-[100%] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pl-[0.5rem] flex items-baseline gap-2 whitespace-nowrap">
        <OutlineText size="large">{rankToDisplay}</OutlineText>
        {score ? (
          <OutlineText size="medium">&nbsp;(Score: {score.points})</OutlineText>
        ) : null}
      </div>
    </div>
  );
};
