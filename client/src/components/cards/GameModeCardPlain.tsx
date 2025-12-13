import React from "react";
import { GameModeCardData } from "../../types/SelectorCardData";
import { BlackText } from "../texts/BlackText";
import { OutlineText } from "../texts/OutlineText";

interface GameModeCardPlainProps {
  cardData: GameModeCardData;
}

export const GameModeCardPlain = ({ cardData }: GameModeCardPlainProps) => {
  return (
    <div className="border-consistent bg-peach p-6 rounded-xl w-120 h-65 text-center flex flex-col justify-center items-center">
      <OutlineText size="large">{cardData.title}</OutlineText>
      <BlackText size="medium">{cardData.description}</BlackText>
    </div>
  );
};
