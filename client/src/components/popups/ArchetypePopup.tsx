import { ArchetypeInfo } from "../../../../types/single/monsterState";
import { IconButton } from "../buttons/IconButton";
import { BlackText } from "../texts/BlackText";
import { OutlineText } from "../texts/OutlineText";
import { PopupClean } from "./PopupClean";
import React, { ReactNode, useState } from "react";

export interface ArchetypePopupProp {
  archetype: ArchetypeInfo;
  onExit: () => void;
}

export const ArchetypePopup = ({ archetype, onExit }: ArchetypePopupProp) => {
  return (
    <>
      <PopupClean>
        <div className="flex items-start w-full relative">
          <IconButton
            size="small"
            style="x"
            buttonColour="red"
            iconColour="black"
            onClick={() => onExit()}
          />
          {/* Archetype Name */}
          <div className="flex-1 flex justify-center">
            <OutlineText size="extraLarge">
              {`${archetype.name} Archetype`}
            </OutlineText>
          </div>
          {/* Spacer to balance */}
          <div className="w-[2rem]" />
        </div>

        <div className="flex flex-col">
          {/* Archetype Description */}
          <div className="pb-[1rem]">
            <BlackText size="medium">{`${archetype.description}`}</BlackText>
          </div>
          {/* Ability */}
          <div className="flex flex-row items-center justify-center w-full border-blackCurrant border-[4px] rounded-xl p-[1rem] bg-goldenRod">
            <img
              src={
                "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/action/" +
                archetype.ability.id +
                ".webp"
              }
              alt="ability icon"
              className="w-[7rem] h-[7rem] rounded-xl border-blackCurrant border-[4px] object-contain"
            />
            <div className="p-[0.5rem]">
              <p className="text-outline font-[Jua] text-left sm:text-[4rem] md:text-[2rem] lg:text[2rem]">
                {`Special: ${archetype.ability.name}`}
              </p>
              <p className="text-blackCurrant text-left font-[Jua] sm:text-[2rem] lg:text-[1.5rem]">
                {archetype.ability.description}
              </p>
            </div>
          </div>
        </div>
      </PopupClean>
    </>
  );
};
