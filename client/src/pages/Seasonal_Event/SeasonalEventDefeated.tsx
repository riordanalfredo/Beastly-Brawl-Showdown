import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import React, { useEffect, useState } from "react";

//
const SeasonalEventDefeated: React.FC = () => {
  const leave = () => {
    socket.emit("leave-game", { userID: socket.id });
    FlowRouter.go("/");
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-ronchi ">
      <GenericHeader color="red">
        <OutlineText size="extraLarge">DEFEATED!</OutlineText>
      </GenericHeader>
      <div className="bg-peach flex items-center flex flex-col justify-around border-[4px] border-blackCurrant w-[90%] h-[75%] rounded-xl mt-[10%] xl:mt-[8%] xl: space-y-0 pl-[10%] pr-[10%] pt-[2%] text-center">
        <OutlineText size="large">BETTER LUCK NEXT TIME!</OutlineText>

        <img
          className="w-[40rem] h-[40rem] xl:w-[20rem] xl:h-[20rem]"
          src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/ending/GRAVE.png`}
          alt={`GRAVE image`}
        />

        <ButtonGeneric color="blue" size="medium" onClick={() => leave()}>
          <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
            <div>
              <OutlineText size="medium">BACK</OutlineText>
            </div>
          </div>
        </ButtonGeneric>
      </div>
    </div>
  );
};

export default SeasonalEventDefeated;
