import React from "react";
import { ConsumableState } from "/types/single/itemState";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";

interface ConsumableProps {
  consumable: ConsumableState;
  onClick: () => void;
}

export const ConsumableCard = ({ consumable, onClick }: ConsumableProps) => {
  return (
    <button
      onClick={onClick}
      className="
    bg-consumablePink
    border border-blackCurrant
    rounded-2xl
    w-[40rem]
    p-[1rem]
    justify-center
    items-center
    lg:h-[8rem]
    cursor-pointer
    transition-transform
    duration-200
    ease-in-out 
    hover:scale-102 
    hover:shadow-lg
    border-consistent
    "
    >
      <div className="grid grid-cols-[1fr_4fr] gap-4 w-full p-2 justify-center items-center">
        {/* Left column (always square) */}
        <div
          className="lg:h-[5rem] aspect-square bg-goldenRod outline-blackCurrant 
                  lg:outline-[0.25rem] sm:outline-[0.25rem] 
                  rounded-2xl flex justify-center items-center p-2"
        >
          <img
            className="w-full h-full object-contain"
            src={`https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/items/${consumable.imageString}.png`}
          />
        </div>

        {/* Right column */}
        <div
          className="flex flex-col justify-center items-center 
                  rounded-2xl p-2 h-full"
        >
          <OutlineText size="inventory">
            {consumable.name.toUpperCase()}
          </OutlineText>
          <BlackText size="tiny">{consumable.statDescription}</BlackText>
        </div>
      </div>
    </button>
  );
};
