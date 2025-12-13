import React, { useState } from "react";
import { GameModeCardData } from "../../types/SelectorCardData";
import { Slider } from "../sliders/Slider";
import { BlackText } from "../texts/BlackText";
import { OutlineText } from "../texts/OutlineText";

interface GameModeCardSliderProps {
  cardData: GameModeCardData;
  sliderText: string;
  sliderMin: number;
  sliderMax: number;
  selectedSliderValue: number;
  setSelectedSliderValue: (index: number) => void;
}

export const GameModeCardSlider = ({
  cardData,
  sliderText,
  sliderMin,
  sliderMax,
  selectedSliderValue,
  setSelectedSliderValue
}: GameModeCardSliderProps) => {
  return (
    <div className="border-consistent bg-peach p-6 rounded-xl w-120 h-65 text-center">
      <OutlineText size="large">{cardData.title}</OutlineText>
      <BlackText size="medium">{cardData.description}</BlackText>
      <div className="flex flex-row items-center justify-center h-1/16 pt-5">
        <OutlineText size="medium">{sliderText}</OutlineText>
      </div>
      <div className="flex flex-row items-center justify-center h-3/16 pt-10">
        <Slider max={sliderMax} min= {sliderMin} selectedValue={selectedSliderValue} setSelectedValue={setSelectedSliderValue} />
      </div>
    </div>
  );
};
