import React, { ReactNode, useEffect, useState } from "react";
import { PopupClean } from "./PopupClean";
import { ChoicePopup } from "./ChoicePopup";
import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { OutlineText } from "../texts/OutlineText";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { DialogueChoiceButton } from "../buttons/DialogueChoiceButton";
import { PlayerState } from "/types/single/playerState";
import { Status } from "/server/src/model/game/status/status";
import { IconButton } from "../buttons/IconButton";
import { OutlineTextResizable } from "../texts/ResizableOutlineText";
import { PopupAdventure } from "./PopupAdventure";
import {
  ActionIdentifier,
  ActionState,
  AttackState,
} from "/types/single/actionState";
import { BlackText } from "../texts/BlackText";
import { StatInfoIcon } from "../cards/StatInfoIcon";
import { AdventureStatBar } from "../bars/AdventureStatBar";
import { StatusButton } from "../buttons/StatusButton";

export interface MonsterInfoPopupProp {
  playerState: PlayerState | null | undefined;
  attackState: AttackState | null | undefined;
  opponent?: Boolean;
  biome: string;
  onClose?: () => void;
}

export const MonsterInfoPopup = ({
  playerState,
  attackState,
  opponent,
  biome,
  onClose,
}: MonsterInfoPopupProp) => {
  const [viewingTab, setViewingTab] = useState<number>(0);
  const [currentAbilities, setCurrentAbilities] = useState<ActionState[]>([]);
  const currentlyViewing = ["MONSTER STATS", "CURRENT STATUSES"];

  const nameLabelColour = opponent ? `wyvernred` : `pictonBlue`;

  useEffect(() => {
    console.log(attackState);
    //REMOVES ATTACK/DEFEND AND ANY DUPLICATE ABILITIES
    const uniqueActions = new Map<
      ActionIdentifier,
      (typeof playerState.monster.possibleActions)[0]
    >();
    for (const action of playerState?.monster?.possibleActions ?? []) {
      if (
        action.id !== ActionIdentifier.ATTACK &&
        action.id !== ActionIdentifier.DEFEND
      ) {
        uniqueActions.set(action.id, action);
      }
    }

    setCurrentAbilities(Array.from(uniqueActions.values()));
    console.log(playerState);
  }, [playerState?.monster?.possibleActions]);

  const monsterId =
    playerState?.monster?.id === "SLIME"
      ? `${playerState.monster.id}_${biome.toUpperCase()}`
      : playerState?.monster?.id;
  const monsterImgPath =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    monsterId +
    ".png";

  var playerName = `${playerState?.name}'s ${playerState?.monster?.name}`;

  if (playerState?.name == playerState?.monster?.name) {
    playerName = `${playerState?.name}`;
  }

  return (
    <PopupAdventure colour="goldenRod">
      <div className=" flex items-center flex-col outline-offset-0 relative gap-2 w-full h-full">
        <div
          className={`mt-[1rem] xl:mt-[0.5rem] bg-${nameLabelColour} outline-blackCurrant lg:outline-[0.2rem] sm:outline-[0.3rem] rounded-2xl flex flex-col px-[1rem] items-center justify-center`}
        >
          <OutlineText size="choice-text">{playerName}</OutlineText>
        </div>
        <img className="sm:size-[30vw] lg:size-[20vh]" src={monsterImgPath} />
        <div
          className={`flex  
            border-[4px] 
            border-blackCurrant rounded-xl
            grow
            sm:min-h-[20vh]
            sm:w-[90%]
            lg:min-h-[20vh]
            lg:w-[80%]
            border-[5px]
            border-blackCurrant
            rounded-[5rem] 
            mb-[3rem]
            xl:mb-[1rem]
            box-border
            bg-peach
            flex-col
            gap-[1%]
            items-center
            py-[2rem] xl:py-[0.5rem]
            overflow-y-auto
            [scrollbar-width:none]`}
        >
          <div className="bg-ronchi outline-blackCurrant px-[2rem] lg:outline-[0.20rem] sm:outline-[0.4rem] rounded-2xl flex flex-col items-center justify-center sm:w-[95%]">
            <OutlineText size="medium">
              {currentlyViewing[viewingTab]}
            </OutlineText>
          </div>
          {viewingTab === 0 && (
            <>
              <div className="flex flex-row w-[90%] pt-3">
                <StatInfoIcon
                  stat="AC"
                  statVal={playerState?.currentArmourClassStat!}
                  monsterStat={playerState.monster.startingAC}
                ></StatInfoIcon>
                <StatInfoIcon
                  stat="HP"
                  statVal={playerState?.currentHealth!}
                  monsterStat={playerState.monster.startingHP}
                ></StatInfoIcon>
                <StatInfoIcon
                  stat="ATK+"
                  statVal={playerState?.currentAttackStat!}
                  monsterStat={playerState.monster.startingATK}
                ></StatInfoIcon>
              </div>

              <div className="flex flex-col w-full gap-1 pb-3">
                <AdventureStatBar
                  stat="Attack Damage"
                  statVal={attackState?.attackDamage! ?? "?"}
                ></AdventureStatBar>
                <AdventureStatBar
                  stat="Critical Hit Rate"
                  statVal={attackState?.critRate! ?? "?"}
                ></AdventureStatBar>
                <AdventureStatBar
                  stat="Dice Roll Range"
                  statVal={attackState?.diceRange! ?? "?"}
                ></AdventureStatBar>
              </div>

              <div className="bg-ronchi border-blackCurrant lg:border-[0.2rem] sm:border-[0.4rem] rounded-2xl flex flex-col items-center justify-center sm:w-[95%]">
                <OutlineText size="medium">ABILITIES</OutlineText>
              </div>
              <div className="sm:w-[95%] lg:w-full flex sm:flex-col lg:flex-row justify-evenly">
                {currentAbilities.map((ability, idx) => (
                  <div
                    key={ability.id || idx}
                    className="flex flex-row items-center gap-[2%] lg:w-[45%]"
                  >
                    <img
                      src={
                        "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/action/" +
                        ability.id +
                        ".webp"
                      }
                      alt="ability icon"
                      className="w-[5rem] h-[5rem] rounded-xl border-blackCurrant border-2"
                    />
                    <div className="flex flex-col items-start text-justify">
                      <OutlineTextResizable size="medium">
                        {ability.name}
                      </OutlineTextResizable>
                      {/**<BlackText size="medium">{ability.description}</BlackText>*/}
                      <BlackText size="tiny">{ability.description}</BlackText>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {viewingTab === 1 && (
            <>
              {/* <div className="min-h-0 flex flex-row justify-center w-full items-center px-3 " style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}> */}
              <div className="w-full flex items-center justify-center content-center relative ">
                {playerState?.statuses[0] ? (
                  <></>
                ) : (
                  <div className="items-center justify-center xl:mt-[4rem] mt-[6rem] absolute ">
                    {/* <BlackText size="medium">You are normal...</BlackText> */}
                    {/* <OutlineText size="medium">You are normal...</OutlineText> */}
                    <BlackText size="medium">
                      {playerState?.monster?.name} feels perfectly fine!!
                    </BlackText>
                  </div>
                )}
                <div className="xl:mt-[1rem] mt-[2rem] grid grid-cols-3 gap-y-[2.5rem] gap-x-[3rem] xl:gap-y-[0.5rem] xl:gap-x-[3rem] items-center justify-center">
                  {playerState?.statuses.map((c: Status) => (
                    <>
                      <StatusButton status={c}></StatusButton>
                    </>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="grid grid-cols-3 justify-items-center">
          <div className="flex justify-center items-center">
            {viewingTab !== 0 && (
              <IconButton
                style="arrowleft"
                buttonColour="blue"
                iconColour="black"
                size="medium"
                onClick={() => setViewingTab(viewingTab - 1)}
              />
            )}
          </div>

          <div className="w-min">
            <ButtonGeneric color="red" size="battle" onClick={onClose}>
              <OutlineText size="choice-text">BACK</OutlineText>
            </ButtonGeneric>
          </div>

          <div className="flex justify-center items-center">
            {viewingTab !== 1 && (
              <IconButton
                style="arrowright"
                buttonColour="blue"
                iconColour="black"
                size="medium"
                onClick={() => setViewingTab(viewingTab + 1)}
              />
            )}
          </div>
        </div>
      </div>
    </PopupAdventure>
  );
};
