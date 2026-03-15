import React, { ReactNode } from "react";
import { BlackText } from "../texts/BlackText";
import { OutlineTextBP } from "../texts/OutlineTextBP";
import { ActionIdentifier } from "../../../../types/single/actionState";

interface WikiAbilityProps {
  image: ActionIdentifier;
  name: string;
  body: string;
  uses: string;
}

export const WikiAbilityCard = ({
  image,
  name,
  body,
  uses,
}: WikiAbilityProps) => {
  const imagePath =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/action/" +
    image +
    ".webp";

  return (
    <div className="flex flex-row md:h-[50rem] xl:h-[10rem] md:w-[50rem] xl:w-[100rem] bg-alto justify-start items-center whitespace-pre-line p-[1rem] space-x-[1rem] border-[0.4rem] border-blackCurrant rounded-xl">
      <img src={imagePath} className="w-[8rem] h-[8rem]" />

      <div className="w-[16rem]">
        <OutlineTextBP size="medium">{name}</OutlineTextBP>
      </div>

      <div>
        <BlackText size="medium">{`${body} \nUses: ${uses}`}</BlackText>
      </div>
    </div>
  );
};
