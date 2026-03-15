import React, { ReactNode } from "react";
import { BlackText } from "../texts/BlackText";
import { OutlineTextBP } from "../texts/OutlineTextBP";
import { MonsterIdentifier } from "../../../../types/single/monsterState";
import { ActionIdentifier } from "../../../../types/single/actionState";

interface WikiMonsterProps {
  image: MonsterIdentifier;
  name: string;
  description: string;
  ability1: string;
  ability2: string;
  abilityimage1: ActionIdentifier;
  abilityimage2: ActionIdentifier;
  HP: string;
  attackBonus: string;
  AC: string;
  archetype: string;
}

export const WikiMonsterCard = ({
  image,
  name,
  description,
  ability1,
  ability2,
  abilityimage1,
  abilityimage2,
  HP,
  attackBonus,
  AC,
  archetype,
}: WikiMonsterProps) => {
  const imagePath1 =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/action/" +
    abilityimage1 +
    ".webp";

  const imagePath2 =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/action/" +
    abilityimage2 +
    ".webp";

  const imagePathMonster =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    image +
    ".png";

  const stats = `HP: ${HP}\nAttack Bonus: ${attackBonus}\nAC: ${AC}`;

  return (
    <div
      className={`flex flex-col md:h-[70rem] xl:h-[40rem] md:w-[50rem] xl:w-[100rem] bg-alto justify-start items-center whitespace-pre-line p-[1rem] space-y-[1rem] border-[0.4rem] border-blackCurrant rounded-xl`}
    >
      <div className="flex flex-row items-center justify-around w-[80rem]">
        <OutlineTextBP size="large">{name}</OutlineTextBP>
      </div>

      <div className="flex flex-row w-full justify-center items-center space-x-[10rem]">
        <img src={imagePathMonster} className="w-[14rem] h-[14rem]" />

        <div className="w-[60rem]">
          <BlackText size="medium">{`${description}`}</BlackText>
        </div>
      </div>

      <div className="flex flex-row w-full justify-between items-start space-x-[1rem]">
        <div className="flex flex-col space-y-[1rem]">
          <OutlineTextBP size="medium">Archetype:</OutlineTextBP>

          <BlackText size="large">{archetype}</BlackText>
        </div>

        <div className="flex flex-col space-y-[1rem]">
          <OutlineTextBP size="medium">Stats:</OutlineTextBP>

          <BlackText size="large">{stats}</BlackText>
        </div>

        <div className="flex flex-col space-y-[1rem]">
          <div className="flex flex-row w-full justify-start items-center space-x-[1rem]">
            <OutlineTextBP size="medium">Abilities:</OutlineTextBP>
          </div>

          <div className="flex flex-row w-full justify-start items-center space-x-[1rem]">
            <img src={imagePath1} className="w-[4rem] h-[4rem]" />

            <div>
              <BlackText size="medium">{`${ability1}`}</BlackText>
            </div>
          </div>

          <div className="flex flex-row w-full justify-start items-center space-x-[1rem]">
            <img src={imagePath2} className="w-[4rem] h-[4rem]" />

            <div>
              <BlackText size="medium">{`${ability2}`}</BlackText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
