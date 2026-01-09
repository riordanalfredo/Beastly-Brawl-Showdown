import React, { useEffect, useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { MonsterImageResizable } from "../../components/player-screen/monsters/MonsterImageResizable";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import { Screens } from "../../screens";
import { PopupClean } from "../../components/popups/PopupClean";
import { BlackText } from "../../components/texts/BlackText";
import { getSelectedBackgroundTheme } from "../../selectedBackgroundTheme";
import { PlayerState } from "/types/single/playerState";
import WinnerScreen from "./WinnerScreen";

interface WaitingScreenProps {
  setScreen: (screen: Screens) => void;
  isDuel?: boolean;
}

const WaitingScreen: React.FC<WaitingScreenProps> = ({ setScreen, isDuel }) => {
  // Sample battle stats data - TODO: Replace this with real player's data
  const [battleStats, setBattleStats] = useState({
    battleWon: 0,
    mostDamageDealt: 0,
    abilitiesUsed: 0,
    criticalHitsDealt: 0,
    successfulBlocks: 0,
  });
  const [playerMonster, setPlayerMonster] = useState<string>("");
  const [exit, setExit] = useState<Boolean>(false);
  const [exitPopup, setExitPopup] = useState<Boolean>(false);
  const [isBattleFound, setIsBattleFound] = useState<Boolean>(false); //indiate whether a new battle has been found
  const [isBattleRoyaleStarted, setIsBattleRoyaleStarted] =
    useState<Boolean>(false); //indiate whether the session has started
  const [timer, setTimer] = useState<number>(10);
  const [time, setTime] = useState<number>(5);
  const [gameCode, setGameCode] = useState<string>(); // game code for directing player back to game session
  const [hasWon, setHasWon] = useState<Boolean>(false);
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [role, setRole] = useState<string>("");

  var backgroundLocation = getSelectedBackgroundTheme().toUpperCase();
  var backgroundString =
    "url('https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/background/" +
    backgroundLocation +
    ".jpg')";

  // Listen for battle start event + send req to server for player's detail
  useEffect(() => {
    socket.removeAllListeners("battle-started");
    socket.removeAllListeners("battle-found");
    socket.removeAllListeners("battle-royale-started");
    socket.removeAllListeners("kick-warning");
    socket.removeAllListeners("final-winner-response");

    // Define handlers first
    const battleStartedHandler = (battleId: string) => {
      FlowRouter.go(`/battle/${battleId}`);
    };

    const battleFoundHandler = (data: any) => {
      setIsBattleFound(true);
      setRole(data.role);
      setGameCode(data.gameCode);
    };

    const battleRoyaleStartedHandler = (data: any) => {
      setIsBattleRoyaleStarted(true);
      setGameCode(data.gameCode);
    };

    const kickWarningHandler = ({ message }: { message: string }) => {
      console.log(message);
      setExitPopup(true);
    };

    const finalWinnerHandler = (finalWinner: PlayerState) => {
      console.log("[WINNER]: ", finalWinner);
      if (finalWinner.finalWinner?.id == socket?.id) {
        console.log("[TOPLAYER]: YOU HAVE WON THE GAME!");
        setHasWon(true);
      }
    };
    // Remove existing listeners with specific handlers
    socket.off("battle-started", battleStartedHandler);
    socket.off("battle-found", battleFoundHandler);
    socket.off("battle-royale-started", battleRoyaleStartedHandler);
    socket.off("kick-warning", kickWarningHandler);
    socket.off("final-winner-response", finalWinnerHandler);

    // Add listeners
    socket.on("battle-started", battleStartedHandler);
    socket.on("battle-found", battleFoundHandler);
    socket.on("battle-royale-started", battleRoyaleStartedHandler);
    socket.on("kick-warning", kickWarningHandler);
    socket.on("final-winner-response", finalWinnerHandler);

    socket.emit("request_waiting_screen_data");

    // Cleanup function
    return () => {
      socket.off("battle-started", battleStartedHandler);
      socket.off("battle-found", battleFoundHandler);
      socket.off("battle-royale-started", battleRoyaleStartedHandler);
      socket.off("kick-warning", kickWarningHandler);
      socket.off("final-winner-response", finalWinnerHandler);
    };
  }, []);

  // Separate useEffect for battle found countdown
  useEffect(() => {
    if (!isBattleFound) {
      return;
    }

    const countdown = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      if (role === "initiator") {
        socket.emit("initiator-new-battle", { gameCode });
      } else if (role === "opponent") {
        socket.emit("opponent-new-battle", { gameCode });
      }
      setTime(-1);
    }, 5000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, [isBattleFound, gameCode]);

  // Separate useEffect for battle royale countdown
  useEffect(() => {
    if (!isBattleRoyaleStarted) {
      return;
    }

    const countdown = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      socket.emit("start-battle-royale", { gameCode });
      setTime(-1);
    }, 5000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, [isBattleRoyaleStarted, gameCode]);

  useEffect(() => {
    console.log("Active socket listeners:", {
      "battle-started": socket.listeners("battle-started").length,
      "battle-found": socket.listeners("battle-found").length,
      "battle-royale-started": socket.listeners("battle-royale-started").length,
    });
  }, []);

  // socket.on("battle-found", (data) => {
  //   setIsBattleFound(true);
  //   setGameCode(data.gameCode);
  // });

  // socket.on("battle-royale-started", (data) => {
  //   setIsBattleRoyaleStarted(true);
  //   setGameCode(data.gameCode);
  // });

  // socket.on("kick-warning", ({ message }) => {
  //   console.log(message);
  //   // UPDATE: add pop up when kicked
  //   setExitPopup(true);
  // });

  const leave = () => {
    socket.emit("leave-game", { userID: socket.id });
    FlowRouter.go("/");
  };

  const sendHome = () => {
    FlowRouter.go("/");
  };

  // Listen to server to wait for a response with the player's monster name
  // We can use this to pass in more of the player's information for the lobby stats page later...
  useEffect(() => {
    socket.removeAllListeners("waiting_screen_data");
    const waitingScreenDataHandler = (data: {
      monsterName: string;
      playerState: PlayerState;
    }) => {
      const monsterName = data.monsterName.toUpperCase();
      setPlayer(data.playerState);
      console.log(`Received waiting screen data: ${monsterName}`);
      setPlayerMonster(monsterName);

      socket.emit("ready_next_battle", monsterName);
    };

    console.log(
      "[SOCKET] Before .on(): ",
      socket.listeners("waiting_screen_data").length
    );
    socket.off("waiting_screen_data", waitingScreenDataHandler);
    socket.on("waiting_screen_data", waitingScreenDataHandler);

    console.log(
      "[SOCKET] After .on(): ",
      socket.listeners("waiting_screen_data").length
    );
    return () => {
      console.log("[SOCKET] Cleanup called");
      socket.off("waiting_screen_data", waitingScreenDataHandler);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: backgroundString,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {isBattleFound && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">BATTLE FOUND</OutlineText>
            <BlackText size="large">A NEW OPPONENT HAS ARRIVED</BlackText>
            <BlackText size="large">
              BATTLE WILL START IN {time} SECONDS
            </BlackText>
          </div>
        </PopupClean>
      )}

      {isBattleRoyaleStarted && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">BATTLE ROYALE STARTED</OutlineText>
            <BlackText size="large">YOUR FIRST OPPONENT HAS ARRIVED</BlackText>
            <BlackText size="large">
              BATTLE WILL START IN {time} SECONDS
            </BlackText>
          </div>
        </PopupClean>
      )}

      <div className="bg-white/60 lg:p-[1.25rem] sm:p-[3rem] h-screen w-min-screen overflow-hidden flex flex-col justify-around">
        {/* Title - Using OutlineText styling as text sizing needs to be modified */}
        <div className="bg-pictonBlue outline-blackCurrant lg:outline-[0.25rem] sm:outline-[0.75rem] rounded-2xl flex flex-col items-center justify-center p-4 mt-[-3rem]">
          <p className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-[Jua] text-outline text-center">
            WAITING FOR HOST TO START GAME
          </p>
        </div>

        {/* Popup */}
        {exitPopup && (
          <PopupClean>
            <div className="flex flex-col justify-around">
              <OutlineText size="extraLarge">
                YOU HAVE BEEN REMOVED FROM THE GAME SESSION.
              </OutlineText>
              <div className="mt-10 flex flex-col items-center">
                <ButtonGeneric
                  size="large"
                  color="red"
                  onClick={() => sendHome()}
                >
                  EXIT
                </ButtonGeneric>
              </div>
            </div>
          </PopupClean>
        )}

        {/* Body switches between WinnerScreen and Lobby */}
        {hasWon ? (
          <WinnerScreen playerMonster={player.monster} />
        ) : (
          <>
            {/* Monster image */}
            <div className="flex justify-center">
              <MonsterImageResizable
                name={playerMonster}
                width={13}
                height={13}
              />
            </div>

            {/* Lobby stats (Using <BlankPage> styling but resized)*/}
            <div className="bg-goldenRod outline-blackCurrant lg:outline-[0.25rem] sm:outline-[0.75rem] rounded-2xl flex flex-col justify-around items-center p-4">
              <h2 className="text-[3rem] xl:text-medium font-[Jua] text-outline">
                Lobby Stats
              </h2>
              <div className="flex flex-col items-center w-full max-w-md space-y-2">
                <div className="grid grid-cols-1 gap-y-2 max-w-md w-full text-center">
                  <p className="text-[3rem] xl:text-medium font-[Jua] text-outline">
                    Battle Won: {player?.battleWon ?? 0}
                  </p>
                  <p className="text-[3rem] xl:text-medium font-[Jua] text-outline">
                    Abilities Used: {player?.abilitiesUsed ?? 0}
                  </p>
                  <p className="text-[3rem] xl:text-medium font-[Jua] text-outline">
                    Most Damage Dealt: {player?.mostDamageDealt ?? 0}
                  </p>
                  <p className="text-[3rem] xl:text-medium font-[Jua] text-outline">
                    Successful Blocks: {player?.successfulBlocks ?? 0}
                  </p>
                  <p className="text-[3rem] xl:text-medium font-[Jua] text-outline">
                    Critical Hits Dealt: {player?.criticalHitsDealt ?? 0}
                  </p>
                </div>
              </div>

              {exit && (
                <PopupClean>
                  <div className="flex flex-col justify-around">
                    <OutlineText size="extraLarge">
                      Are you sure you want to leave the lobby?
                    </OutlineText>
                    <div className="flex flex-row justify-between items-center">
                      <ButtonGeneric
                        size="large"
                        color="red"
                        onClick={() => setExit(false)}
                      >
                        BACK
                      </ButtonGeneric>
                      <ButtonGeneric
                        size="large"
                        color="blue"
                        onClick={() => leave()}
                      >
                        CONFIRM
                      </ButtonGeneric>
                    </div>
                  </div>
                </PopupClean>
              )}

              {/* Exit button */}
              <ButtonGeneric
                color="red"
                size="medium"
                onClick={() => setExit(true)}
              >
                <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
                  <div>
                    <OutlineText size="medium">EXIT LOBBY</OutlineText>
                  </div>
                </div>
              </ButtonGeneric>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WaitingScreen;
