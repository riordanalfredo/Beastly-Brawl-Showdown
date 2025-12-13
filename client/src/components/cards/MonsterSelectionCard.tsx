import React from "react";
import { MonsterImageResizable } from "../player-screen/monsters/MonsterImageResizable";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";
import { ArchetypeIdentifier, MonsterState } from "/types/single/monsterState";
import { MonsterImage } from "../player-screen/monsters/MonsterImage";
import { Archetype } from "/server/src/model/game/archetype/archetype";

interface MonsterSelectionProps {
  monster: MonsterState;
  type: ArchetypeIdentifier;
  onClick: () => void;
}

export const MonsterSelectionCard = ({
  monster,
  type,
  onClick,
}: MonsterSelectionProps) => {
  const colorLoader: Record<ArchetypeIdentifier, string> = {
    [ArchetypeIdentifier.ATTACKER]: "bg-attacker",
    [ArchetypeIdentifier.DEFENDER]: "bg-defender",
    [ArchetypeIdentifier.BALANCED]: "bg-balanced",
    [ArchetypeIdentifier.NEUTRAL]: "bg-quillGray",
  };

  return (
    <button
      className={`${colorLoader[type]} 
                
                rounded-xl
                sm:w-[95%]
                lg:w-[70%]
                flex flex-row items-center
                min-h-[17rem]
                cursor-pointer
                transition-transform
                duration-200
                ease-in-out 
                hover:scale-102 
                hover:shadow-lg
                z-10
                outline-consistent
                duration-200
                `}
      onClick={onClick}
    >
      <div className="flex flex-col shrink-0 justify-center items-center">
        <MonsterImage
          name={monster.id}
          className="sm:w-[20rem] sm:h-[20rem] lg:w-[15rem] lg:h-[15rem]"
        />
      </div>
      <div className="flex flex-col text-center grow">
        <p className="text-outline sm:text-[4rem] lg:text-[4rem] font-[Jua]">
          {monster.name}
        </p>
        <BlackText size="medium">{monster.description}</BlackText>
      </div>
    </button>
  );
};
