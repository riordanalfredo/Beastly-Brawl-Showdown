import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlackText } from "../../components/texts/BlackText";
import { GenericIcon } from "../../components/icons/GenericIcon";
import { IconButton } from "../../components/buttons/IconButton";

export const AdventureSelectMode: React.FC = () => {
  const [endlessBest, setEndlessBest] = useState<number>(0);

  useEffect(() => {
    // Request the monster list once when component mounts
    socket.emit("request_adventure_endless_record");

    // Listen for the monster list from server
    socket.on("adventure_endless_record", (endlessRecord: number) => {
      setEndlessBest(endlessRecord);
    });

    return () => {
      socket.off("adventure_endless_record");
    };
  }, []);

  const renderAdventureMonsterSelect = () => {
    socket.emit("adventure_level_selected", { level: 0 });
    FlowRouter.go("/adventure/monster-select");
  };

  return (
    <div
      className="inset-0 w-screen h-screen bg-cover bg-center overscroll-contain"
      style={{
        backgroundImage:
          "url('https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/background/FOREST.jpg')",
      }}
    >
      <div className="fixed z-2 lg:ml-5 lg:mt-5 sm:ml-6 sm:mt-6">
        <IconButton
          style="arrowleft"
          iconColour="black"
          buttonColour="red"
          size="medium"
          onClick={() => {
            FlowRouter.go("/");
          }}
        />
      </div>
      <div className="fixed w-full sm:h-[10vh] lg:h-[20vh] flex items-center justify-center invisible lg:visible">
        <div className="bg-ronchi outline-blackCurrant px-[2rem]  outline-consistent rounded-2xl flex flex-col items-center justify-center">
          <OutlineText size="extraLarge">CHOOSE YOUR PATH</OutlineText>
        </div>
      </div>
      <div className="flex sm:flex-col lg:flex-row items-center justify-center h-screen gap-[8rem]">
        <div className="sm:w-[90vw] lg:w-[40vw] sm:min-h-[37vh] lg:min-h-[50vh] bg-peach outline-blackCurrant outline-consistent rounded-2xl flex flex-col items-center justify-evenly text-center">
          <div className="-mb-4">
            <OutlineText size="extraLarge">CLASSIC MODE</OutlineText>
          </div>
          <BlackText size="choice-text">
            The base adventure game mode. Play through to unlock monsters!
          </BlackText>
          <ButtonGeneric
            color="blue"
            size="battle"
            onClick={() => FlowRouter.go("/adventure/level-select")}
          >
            <OutlineText size={"choice-text"}>SELECT</OutlineText>
          </ButtonGeneric>
        </div>
        <div className="sm:w-[90vw] lg:w-[40vw] sm:min-h-[37vh] lg:min-h-[50vh] bg-peach outline-blackCurrant outline-consistent rounded-2xl flex flex-col items-center justify-evenly text-center">
          <div className="-mb-4">
            <OutlineText size="extraLarge">ENDLESS MODE</OutlineText>
          </div>

          <BlackText size="choice-text">
            Test your mettle and see how far you can journey!
          </BlackText>
          <div className="w-[70%] bg-ronchi outline-blackCurrant outline-consistent rounded-full justify-between px-[2rem] flex flex-row ">
            <div className="flex flex-row items-center gap-2">
              <GenericIcon
                size={"sm"}
                style={"trophy"}
                colour={"black"}
              ></GenericIcon>
              <BlackText size="medium">Current Best: </BlackText>
            </div>
            <BlackText size="medium">Stage {endlessBest}</BlackText>
          </div>
          {/* <div className="w-[70%] bg-ronchi outline-blackCurrant outline-consistent rounded-full justify-center items-center px-[2rem] flex flex-row ">
            <GenericIcon
              size={"sm"}
              style={"trophy"}
              colour={"black"}
            ></GenericIcon>
            <BlackText size="medium">Stage {endlessBest}</BlackText>
          </div> */}
          <ButtonGeneric
            color="blue"
            size="battle"
            onClick={renderAdventureMonsterSelect}
          >
            <OutlineText size={"choice-text"}>SELECT</OutlineText>
          </ButtonGeneric>
        </div>
      </div>
    </div>
  );
};
