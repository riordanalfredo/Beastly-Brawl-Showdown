import React, { useState, useEffect } from "react";
import socket from "../../socket";
import { ActionState } from "/types/single/actionState";
import { BattleState } from "/types/composite/battleState";
import BattleHeader from "../../components/player-screen/BattleHeader";
import BattleMonsterPanel from "../../components/player-screen/BattleMonsterPanel";
import DiceRollModal from "./DiceRollModal";
import WinnerScreen from "./WinnerScreen";
import LoserScreen from "./LoserScreen";
import DrawScreen from "./DrawScreen";
import { BattleFooter } from "../../components/cards/BattleFooter";
import { FadingBattleText } from "../../components/texts/FadingBattleText";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { PopupClean } from "../../components/popups/PopupClean";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlackText } from "../../components/texts/BlackText";
import { GameSessionStateMetaData } from "/types/composite/gameSessionState";
import { IconButton } from "../../components/buttons/IconButton";
import { LeavePopup } from "../../components/popups/AdventureLeavePopup";
import { MonsterInfoPopup } from "../../components/popups/MonsterInfoPopup";
import { GameModeIdentifier } from "../../../../types/single/gameMode";
import { getSelectedBackgroundTheme } from "../../selectedBackgroundTheme";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";

interface BattleProps {
  battleId: string | null; // Add battleId as a prop
}

const leave = () => {
  socket.emit("leave-game", { userID: socket.id });
  FlowRouter.go("/");
};

const Battle: React.FC<BattleProps> = ({ battleId }) => {
  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);
  const [timer, setTimer] = useState<number>(10);
  const [winner, setWinner] = useState<string | null>(null);
  const [showDiceModal, setShowDiceModal] = useState(false); // show dice modal | TODO: For future, use action animation ID instead of boolean to trigger animations
  const [diceValue, setDiceValue] = useState<number>(0); // result of dice
  const [isSessionCancelled, setIsSessionCancelled] = useState<Boolean>(false); // indicate whether the host is still live
  const [isBattleClosed, setIsBattleClosed] = useState<Boolean>(false); //indiate whether the battle is still live
  const [gameCode, setGameCode] = useState<string>(); // game code for directing player back to game session
  const [time, setTime] = useState<number>(5);
  const [metadata, setMetadata] = useState<GameSessionStateMetaData | null>();
  const [waitForConclusion, setWaitForConclusion] = useState<boolean>(false);
  const [viewingInfo, setViewingInfo] = useState<Boolean>(false);
  const [viewingEnemyInfo, setViewingEnemyInfo] = useState<Boolean>(false);
  const [isSpectating, setIsSpectating] = useState<boolean>(false);
  const [finalScreen, setFinalScreen] = useState<boolean>(true);
  const [gameMode, setGameMode] = useState<GameModeIdentifier>(
    GameModeIdentifier.SCORING,
  );

  var backgroundLocation = getSelectedBackgroundTheme().toUpperCase();
  var backgroundString =
    "url('https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/background/" +
    backgroundLocation +
    ".jpg')";

  useEffect(() => {
    socket.removeAllListeners("host-closed");
    socket.on("battle_state", (data) => {
      console.log("[BATTLESTATE]: ", data.battle);
      console.log("[METADATA]: ", data.metadata);
      console.log("[ISSPECTATING]: ", data.isSpectating);
      setBattleState(data.battle);
      setMetadata(data.metadata);
      setIsSpectating(data.isSpectating);
    });

    socket.on("possible_actions", (actions: ActionState[]) => {
      setPossibleActions(actions);
    });

    socket.on("timer", (time: number) => {
      console.log(`Timer: ${time}`);
      setTimer(time);
    });

    socket.on("spectator_battle_end", ({ gameCode, mode, finalScreen }) => {
      if (!finalScreen) {
        FlowRouter.go(`/session/${gameCode}`, {}, { fromBattle: "true" });
      } else {
        setGameMode(mode);
        setFinalScreen(finalScreen);
        setWinner("SPECTATOR_LOSS");
      }
    });

    socket.on(
      "battle_end",
      ({ result, winners, mode, gameCode, finalScreen }) => {
        setWaitForConclusion(false);
        setGameMode(mode);
        setGameCode(gameCode);
        setFinalScreen(finalScreen);
        console.log(result, winners, mode);
        if (result === "draw") {
          setWinner("Draw");
        } else if (result === "concluded") {
          setWinner(winners[0]);
        }
        console.log("Winner: ", winner);
        if (battleState?.yourPlayer.name === winner) {
          socket.emit("updateAchievement", "Can't stop winning");
          socket.emit("updateWin");
        } else {
          socket.emit("updateLoss");
        }
      },
    );

    // TODO: For future, this should handle socket message 'handle_animation' and pass in an animation identifier
    // to handle all types of animations triggered by actions
    socket.on("roll_dice", (diceRoll: number) => {
      setDiceValue(diceRoll);
      console.log(`From socket in Battle: dps ${diceRoll}`);
      setShowDiceModal(true);
    });

    //Socket to handle the case where the host cancel the game sesion
    socket.on("host-closed", () => {
      setIsSessionCancelled(true);
    });

    socket.on("battle-closed", (data) => {
      setIsBattleClosed(true);
      setGameCode(data.gameCode);
      socket.removeAllListeners("client-wait-conclusion");
    });

    socket.on("client-wait-conclusion", () => {
      setWaitForConclusion(true);
    });

    return () => {
      socket.off("possible_actions");
      socket.off("timer");
      socket.off("turn_over");
    };
  }, []);

  useEffect(() => {
    if (!isSessionCancelled) {
      return;
    }

    //Countdown before player get redirected
    const countdown = setInterval(() => {
      setTime((prev) => Math.max(prev - 1, 0));
    }, 1000); //1 second per interval

    //Redirect after countdown is finished
    const timeout = setTimeout(() => {
      FlowRouter.go("/");
    }, 5000); // 5 seconds before user get directed to home page

    return () => {
      clearInterval(countdown); // interval cleanup
      clearTimeout(timeout); //timeout cleanup
    };
  }, [isSessionCancelled]);

  useEffect(() => {
    if (!isBattleClosed) {
      return;
    }

    //Countdown before player get redirected
    const countdown = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000); //1 second per interval

    //Redirect after countdown is finished
    const timeout = setTimeout(() => {
      FlowRouter.go(`/session/${gameCode}`, {}, { fromBattle: "true" });
      setTime(-1);
    }, 5000); // 5 seconds before user get directed to home page

    return () => {
      clearInterval(countdown); // interval cleanup
      clearTimeout(timeout); //timeout cleanup
    };
  }, [isBattleClosed]);

  socket.on("new-connect", () => {
    FlowRouter.go("/");
  });

  return (
    <>
      {waitForConclusion && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">LAST ROUND COMPLETED</OutlineText>
            <BlackText size="large">
              YOU HAVE FINISHED YOUR LAST BATTLE!
            </BlackText>
            <BlackText size="large">
              WAITING FOR OTHER PLAYERS TO FINISH THEIR BATTLES...
            </BlackText>
          </div>
        </PopupClean>
      )}

      {isSessionCancelled && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">CANCELLED SESSION</OutlineText>
            <BlackText size="large">
              YOUR GAME SESSION HAS BEEN CANCELLED
            </BlackText>
            <BlackText size="large">
              YOU WILL BE DIRECTED BACK TO THE HOME PAGE IN {time} SECONDS
            </BlackText>
          </div>
        </PopupClean>
      )}

      {isBattleClosed && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">BATTLE CLOSED</OutlineText>
            <BlackText size="large">BATTLE HAS ENDED</BlackText>
            <BlackText size="large">
              YOU WILL BE DIRECTED BACK TO THE WAITING ROOM IN {time} SECONDS
            </BlackText>
          </div>
        </PopupClean>
      )}

      <div
        className="inset-0 w-screen h-screen bg-cover bg-center overscroll-contain"
        style={{ backgroundImage: backgroundString }}
      >
        {isSpectating && !winner && (
          <div className="xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] sm:pt-[16rem] fixed pl-[3rem] pointer-events-auto z-10 w-full flex justify-between">
            <div className="flex lg:gap-5 sm:gap-10">
              <IconButton
                style="arrowleft"
                iconColour="black"
                buttonColour="red"
                size="small"
                onClick={() => leave()}
              />
            </div>
          </div>
        )}
        {viewingInfo && (
          <MonsterInfoPopup
            playerState={battleState.yourPlayer}
            attackState={battleState.yourPlayer.attackState}
            onClose={() => setViewingInfo(false)}
            biome={backgroundLocation}
          ></MonsterInfoPopup>
        )}
        {viewingEnemyInfo && (
          <MonsterInfoPopup
            playerState={battleState.opponentPlayer}
            attackState={battleState.opponentPlayer.attackState}
            onClose={() => setViewingEnemyInfo(false)}
            biome={backgroundLocation}
          ></MonsterInfoPopup>
        )}
        {/* Winner display if battle is over */}
        {/*winner === "Draw" ? (
          <DrawScreen />
        ) : */}
        {winner ? (
          winner === "Draw" ? (
            <DrawScreen
              mode={gameMode}
              gameCode={gameCode}
              finalScreen={finalScreen}
            />
          ) : battleState?.yourPlayer.name === winner ? (
            <WinnerScreen playerMonster={battleState?.yourPlayer.monster} />
          ) : (
            <LoserScreen
              mode={gameMode}
              gameCode={gameCode}
              finalScreen={finalScreen}
            />
          )
        ) : (
          <>
            {battleState && (
              <div className="flex flex-col h-full w-full items-start space-y-10 ">
                <div className="flex flex-row h-1/4 w-full items-start justify-center">
                  <BattleHeader
                    battleState={battleState}
                    timer={timer}
                    metadata={metadata}
                  />
                </div>
                {/* Buttons */}
                {/* TODO: test button placement */}
                {/* <div className="flex w-full justify-between px-8">
                  <div className="flex lg:gap-5 sm:gap-10">
                    <IconButton
                      style="info"
                      iconColour="black"
                      buttonColour="blue"
                      size="small"
                      onClick={() => setViewingInfo(true)}
                    />
                  </div>

                  <div className="flex lg:gap-5 sm:gap-10 pr-[2rem]">
                    <IconButton
                      style="info"
                      iconColour="black"
                      buttonColour="redpink"
                      size="small"
                      onClick={() => setViewingEnemyInfo(true)}
                    />
                  </div>
                </div> */}

                <div className="flex flex-col h-3/4 w-full items-center justify-around">
                  <BattleMonsterPanel
                    battleState={battleState}
                    slimeString="FOREST"
                  />

                  <div
                    className=" h-screen flex flex-col items-center justify-center content-center mt-[60%] xl:mt-[15%]"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "120px",
                    }}
                  >
                    {battleState.yourPlayer.logs.map((log, index) => (
                      <FadingBattleText
                        key={index}
                        size="medium-battle-text"
                        style={{ top: `${index * 32}px` }}
                      >
                        {log}
                      </FadingBattleText>
                    ))}
                  </div>

                  <DiceRollModal
                    show={showDiceModal}
                    onClose={() => setShowDiceModal(false)}
                    toRoll={diceValue}
                    battleState={battleState}
                  />
                </div>
              </div>
            )}

            <div>
              {timer > 0 && (
                <BattleFooter
                  possibleActions={possibleActions}
                  battleId={battleId}
                  isSpectating={isSpectating}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Battle;
