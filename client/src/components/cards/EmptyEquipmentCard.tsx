import React from "react";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";

export const EmptyEquipmentCard = ({}) => {
  return (
    <button
      className="
    bg-[#A3A3A3]
    border-blackCurrant
    rounded-2xl
    w-[40rem]
    xl:w-[40rem]
    p-[1rem]
    justify-center
    items-center
    lg:h-[8rem]
    border-consistent
    "
    >
      <div className="flex flex-col justify-center items-center rounded-2xl">
        <OutlineText size="medium">EMPTY</OutlineText>
        <BlackText size="tiny">
          Continue adventuring to find more equipment!!
        </BlackText>
      </div>
    </button>
  );
};
