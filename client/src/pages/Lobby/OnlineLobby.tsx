import React, { useState, useEffect, useRef } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { LoginPopup } from "./Login";
import { IconButton } from "../../components/buttons/IconButton";
import { isBGMEnabled, playBGM,toggleBGM,initBGM } from "../../audioManager";
import { PopupClean } from "../../components/popups/PopupClean";
import { userInfo } from "os";
import { SeasonalEventIdentifier } from "../../../../types/single/seasonalEventState";
import { BlackText } from "../../components/texts/BlackText";


export const OnlineLobby = () => {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [adventurePopup, setAdventurePopup] = useState(false);


  const createGame = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };


  const renderJoinLobby = () => {

    FlowRouter.go("/join");
  };



useEffect(() => {
  initBGM();

  // Only auto-play once when user interacts (first visit)
  if (isBGMEnabled()) {
    playBGM("/music/Beastly_brawl_menu_screen_music.mp3");
  }
}, []);


  const renderConfigPage = () => {

    FlowRouter.go("/host/choose-mode");
  };

  const renderDuelLobby = () => {
    FlowRouter.go("/duel-create");
  }



  return (
    <BlankPage>
      <div className="flex lg:flex-row lg:h-1/2 sm:flex-col w-full">
        <div className="flex flex-row w-1/4 sm:h-1/4">
          <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
            <IconButton
              style="arrowleft"
              iconColour="black"
              buttonColour="red"
              size="medium"
              onClick={() => FlowRouter.go("/")}
            />
          </div>
        </div>
        <div className="flex flex-row lg:h-full lg:w-1/2 sm:h-3/4 lg:items-center sm:items-end justify-around">
          <LogoResizable className="lg:w-1/2 h-full"></LogoResizable>
        </div>
      </div>

        <div className="flex flex-col lg:space-y-[1rem] space-y-[3rem] items-center flex-grow justify-center ">
            <ButtonGeneric
            color="ronchi"
            size="large"
            mobileHidden="true"
            onClick={renderConfigPage}
            >
            <OutlineText size="large">HOST</OutlineText>
          </ButtonGeneric>

            <ButtonGeneric
            color="ronchi"
            size="large"
            onClick={renderDuelLobby}
            >
            <OutlineText size="large">DUEL</OutlineText>
          </ButtonGeneric>

          <ButtonGeneric
            color="ronchi"
            size="large"
            onClick={renderJoinLobby}
          >
            <OutlineText size="large">JOIN</OutlineText>
          </ButtonGeneric>
        </div>
    </BlankPage>
  );
};

const seasonalEventMap = new Map([[9, SeasonalEventIdentifier.SPOOK_GARDEN]]);
