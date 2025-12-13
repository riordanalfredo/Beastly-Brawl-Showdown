import React, { useRef, useState, useLayoutEffect } from "react";
import ActionButton from "../buttons/ActionButton";
import { ActionState } from "/types/single/actionState";
import socket from "../../socket";
import { BaseCard } from "./BaseCard";
import { OutlineText } from "../texts/OutlineText";

interface BattleFooterProp {
  possibleActions: ActionState[];
  battleId: string | null;
  isSpectating?: boolean;
}

export const BattleFooter = ({
  possibleActions,
  battleId,
  isSpectating = false,
}: BattleFooterProp) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const footer = `
    bg-goldenRod
    mx-auto
    rounded-tl-[5rem]
    rounded-tr-[5rem]
    border-consistent
    border-blackCurrant
    border-b-0
    flex 
    inset-x-0
    fixed
    w-[95%]
    xl:w-[60%]
    bottom-0
    z-[40]
    `;

  const button = `
    flex 
    place-items-center 
    w-full 
    justify-center 
    grid 
    grid-cols-2 
    gap-y-[7rem] 
    xl:gap-y-[3rem] 
    pb-[4%]
    xl: pb-[2%]
    
    `;

  // Get the height of the 4 buttons and make footer the 83% of that height
  const gridRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(0);
  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const h = gridRef.current.getBoundingClientRect().height;

    setFooterH(h * 0.83);
  }, [possibleActions]);

  return (
    <div className="fixed flex mx-auto flex-col inset-x-0 bottom-0 w-[95%] xl:w-[60%] justify-center">
      <div ref={gridRef}>
        <div className={`${button}`}>
          {possibleActions.map((action, index) => (
            <div key={action.id ?? index} className="z-[50]">
              <ActionButton
                actionState={action}
                battleId={battleId!}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                isDisabled={isSpectating}
              />
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: `${footerH}px` }} className={`${footer}`}></div>
    </div>
  );
};
