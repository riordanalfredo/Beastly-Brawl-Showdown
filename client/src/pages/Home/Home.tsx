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


export const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [adventurePopup, setAdventurePopup] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [seasonalEventPopup, setSeasonalEventPopup] = useState(false);

  useEffect(() => {
    socket.emit("check-login");

    const handleLoginStatus = ({ loggedIn }: { loggedIn: boolean }) => {
      setLoggedInUser(loggedIn);
    };
    socket.on("login-status", handleLoginStatus);

    return () => {
      socket.off("login-status", handleLoginStatus);
    };
  }, []);

  const createGame = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };

  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });
useEffect(() => {
  initBGM();

  // Only auto-play once when user interacts (first visit)
  if (isBGMEnabled()) {
    playBGM("/music/Beastly_brawl_menu_screen_music.mp3");
  }
}, []);

  const handleToggleMusic = () => {
    const enabled = toggleBGM();
    setMusicOn(enabled);
  };

  const renderConfigPage = () => {

    FlowRouter.go("/host/choose-mode");
  };

  const renderJoinLobby = () => {

    FlowRouter.go("/join");
  };



  const handleLoginSuccess = () => {
    setShowLogin(false);
    setLoggedInUser(true);
  };

  const handleExitLogin = () => {
    setShowLogin(false);
    console.log("Exit login");
  };


  const handleAdventure = () => {
    if (loggedInUser) {
      renderAdventure();
    } else {
      setAdventurePopup(true);
    }
  };

  const renderAdventure = () => {
    FlowRouter.go("/adventure/mode-select");
  };

  const renderOnline = () => {
    FlowRouter.go("/online");
  }

  // Called on 'Event' button press
  const handleSeasonalEvent = () => {
    if (loggedInUser) {
      renderSeasonalEvent();
    } else {
      setSeasonalEventPopup(true);
    }
  };

  const renderSeasonalEvent = () => {
    const currentMonth = new Date().getMonth();
    const currentEvent = seasonalEventMap.get(currentMonth)?.toString();
    FlowRouter.go(`/seasonal-event/home/${currentEvent!.toLowerCase()}`);
  };

  return (
    <BlankPage>
      <div className="flex flex-col h-screen lg:p-[1rem] p-[2rem] overflow-auto">
        <div className="flex flex-row w-full sm:items-end lg:items-center justify-around">
          <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full" />
        </div>
        <div className="absolute top-[3rem] left-[3rem]">

        <ButtonGeneric
          onClick={handleToggleMusic}
          color="ronchi"
          size="square"
        >
          {isBGMEnabled() == true ? "🔊"  : "🔇"}
        </ButtonGeneric>
      </div>

      <div className="absolute lg:top-[3rem] lg:right-[3rem] top-[5rem] right-[5rem]">
          {adventurePopup && (
            <PopupClean>
              <div className="flex flex-col justify-around">
                <OutlineText size="extraLarge">Play Adventure?</OutlineText>
                <BlackText size="large">
                  YOU ARE NOT LOGGED IN. YOU CAN PLAY ADVENTURE, BUT NO PROGRESS
                  WILL BE SAVED.
                </BlackText>
                <div className="flex flex-row justify-center gap-[2rem] pt-[2rem] items-center">
                  <ButtonGeneric
                    size="medium"
                    color="red"
                    onClick={() => setAdventurePopup(false)}
                  >
                    <OutlineText size="choice-text"> BACK </OutlineText>
                  </ButtonGeneric>
                  <ButtonGeneric
                    size="medium"
                    color="blue"
                    onClick={renderAdventure}
                  >
                    <OutlineText size="choice-text"> CONTINUE </OutlineText>
                  </ButtonGeneric>
                </div>
              </div>
            </PopupClean>
          )}
          {seasonalEventPopup && (
            <PopupClean>
              <div className="flex flex-col justify-around">
                <OutlineText size="extraLarge">
                  Play Seasonal Event?
                </OutlineText>
                <BlackText size="large">
                  YOU ARE NOT LOGGED IN. YOU CAN PLAY THE SEASONAL EVENT, BUT
                  YOUR SCORE WON'T BE RECORDED ON THE LEADERBOARD.
                </BlackText>
                <div className="flex flex-row justify-center gap-[2rem] pt-[2rem] items-center">
                  <ButtonGeneric
                    size="medium"
                    color="red"
                    onClick={() => setSeasonalEventPopup(false)}
                  >
                    <OutlineText size="choice-text"> BACK </OutlineText>
                  </ButtonGeneric>
                  <ButtonGeneric
                    size="medium"
                    color="blue"
                    onClick={renderSeasonalEvent}
                  >
                    <OutlineText size="choice-text"> CONTINUE </OutlineText>
                  </ButtonGeneric>
                </div>
              </div>
            </PopupClean>
          )}
          {!loggedInUser ? (
            <ButtonGeneric
              color={"ronchi"}
              size={"squaremedium"}
              onClick={() => FlowRouter.go("/login")}
            >
              <div className="flex flex-col text-center">
                <OutlineText size="tiny">LOG</OutlineText>
                <OutlineText size="tiny">IN</OutlineText>
              </div>
            </ButtonGeneric>
          ) : (
            <IconButton
              style="profile"
              iconColour="black"
              buttonColour="ronchi"
              size="medium"
              onClick={() => FlowRouter.go("/account")}
            />
          )}
        </div>

      {/* Logo */}
        {/* <div className="flex flex-col items-center justify-center w-1/2 h-1/2 lg:space-y-5 sm:space-y-30"> */}
  
      {/* Buttons */}
      <div className="flex flex-col lg:space-y-[1rem] space-y-[3rem] items-center flex-grow justify-center ">
          <ButtonGeneric
            color="ronchi"
            size="large"
            onClick={renderOnline}
          >
            <OutlineText size="large">ONLINE</OutlineText>
          </ButtonGeneric>
  
        <ButtonGeneric color="ronchi" size="large" onClick={handleAdventure}>
            <OutlineText size="large">ADVENTURE</OutlineText>
          </ButtonGeneric>
          <ButtonGeneric
            color="ronchi"
            size="large"
            onClick={handleSeasonalEvent}
          >
            <OutlineText size="large">EVENTS</OutlineText>
          </ButtonGeneric>

          <div className="flex-row flex space-x-[3rem] lg:space-x-[1rem]">
            <IconButton
              style="info"
              iconColour="black"
              buttonColour="blue"
              size="medium"
              onClick={() => FlowRouter.go("/wiki")}
            />
            <IconButton
              style="leaderboard"
              iconColour="black"
              buttonColour="redpink"
              size="medium"
              onClick={() => FlowRouter.go("/leaderboard")}
            />
            <IconButton
              style="notes"
              iconColour="black"
              buttonColour="pink"
              size="medium"
              onClick={() => FlowRouter.go("/dev-notes")}
            />
          </div>
        </div>
      </div>
    </BlankPage>
  );
};

const seasonalEventMap = new Map([[9, SeasonalEventIdentifier.SPOOK_GARDEN]]);
