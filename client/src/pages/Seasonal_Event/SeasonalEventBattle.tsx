import { MonsterIdentifier } from "../../../../types/single/monsterState";
import BattleMonsterPanel from "../../components/player-screen/BattleMonsterPanel";
import DiceRollModal from "../Game/DiceRollModal";
import { BattleFooter } from "../../components/cards/BattleFooter";
import { useEffect, useState } from "react";
import { BattleState } from "/types/composite/battleState";
import { ActionState, AttackState } from "/types/single/actionState";
import React from "react";
import socket from "../../socket";
import { DialogueBox } from "../../components/cards/DialogueBox";
import { option } from "../../../../types/composite/storyTypes";
import { DialogueChoiceButton } from "../../components/buttons/DialogueChoiceButton";
import { PopupClean } from "../../components/popups/PopupClean";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { ChoicePopup } from "../../components/popups/ChoicePopup";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { StatChangePopup } from "../../components/popups/statChangePopup";
import { MonsterState } from "../../../../types/single/monsterState";
import MonsterDisplay from "../../components/player-screen/MonsterDisplay";
import { LeavePopup } from "../../components/popups/AdventureLeavePopup";
import { IconButton } from "../../components/buttons/IconButton";
import { AdventureInfoPanel } from "../../components/player-screen/AdventureInfoPanel";
import { PlayerState } from "/types/single/playerState";
import { MonsterInfoPopup } from "../../components/popups/MonsterInfoPopup";
import { AdventureBagPopup } from "../../components/popups/AdventureBag";
import { EquipmentState, StoryItemState } from "/types/single/itemState";
import { EquipmentCard } from "../../components/cards/EquipmentCard";
import { AdventureBattleHeader } from "../../components/player-screen/AdventureBattleHeader";
import { ConsumablePopup } from "../../components/popups/ConsumablePopup";
import { ConsumablePickupPopup } from "../../components/popups/ConsumablePickupPopup";
import { ConsumableState } from "/types/single/itemState";
import { EquipmentPickupPopup } from "../../components/popups/EquipmentPickupPopup";
import { StoryItem } from "../../../../server/src/model/game/storyItem/storyItem";
import { StoryItemPickupPopup } from "../../components/popups/StoryItemPickupPopup";
import { EventLeavePopup } from "../../components/popups/SeasonalEventLeavePopup";

interface SeasonalEventBattleProps {
  //so i am adding this without actually knowing why just trust the process
  levelMonster: MonsterIdentifier;
}

const SeasonalEventBattle: React.FC<SeasonalEventBattleProps> = ({
  levelMonster,
}) => {
  const battleId = "SEASONALEVENT";
  var backgroundLocation = getBiomeString(levelMonster); //TODO: change this to be based off level/monster?
  var backgroundString =
    "url('https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/background/" +
    backgroundLocation +
    ".jpg')";

  //ADVENTURE PAGE:
  const [dialogue, setDialogue] = useState<string[] | null>([]);
  const [currentEnemy, setCurrentEnemy] = useState<MonsterState | null>(null);
  const [stage, setStage] = useState<number>(1);

  const [playerState, setPlayerState] = useState<PlayerState | null>(null);

  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);

  //POPUPS
  const [showLeave, setShowLeave] = useState(false);
  const [viewingInfo, setViewingInfo] = useState<Boolean>(false);
  const [viewingEnemyInfo, setViewingEnemyInfo] = useState<Boolean>(false);
  const [viewingInventory, setViewingInventory] = useState<Boolean>(false);
  const [receivingConsumable, setReceivingConsumable] =
    useState<ConsumableState | null>(null);
  const [consumableId, setConsumableId] = useState<string | null>(null);
  const [receivingStoryItem, setReceivingStoryItem] =
    useState<StoryItemState | null>(null);
  const [storyItemId, setStoryItemId] = useState<string | null>(null);
  const [receivingEquipment, setReceivingEquipment] =
    useState<EquipmentState | null>(null);
  const [equipmentId, setEquipmentId] = useState<string | null>(null);
  const [equipmentInventoryFull, setEquipmentInventoryFull] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState<EquipmentState[]>(
    [],
  );
  const [incomingEquipment, setIncomingEquipment] =
    useState<EquipmentState | null>(null);
  const [question, setQuestion] = useState<string[] | null>(null);
  const [choices, setChoices] = useState<option[] | null>(null);

  const [statChange, setStatChange] = useState<string[] | null>(null);
  const [statusResult, setStatusResult] = useState<string[] | null>(null);
  const [hasNewInventoryItem, setHasNewInventoryItem] = useState(false);

  //DICE
  const [showDiceModal, setShowDiceModal] = useState(false); // show dice modal | TODO: For future, use action animation ID instead of boolean to trigger animations
  const [diceValue, setDiceValue] = useState<number>(0); // result of dice

  const handleChoiceSelect = (
    choiceId: string,
    itemNames: string[] | null = null,
  ) => {
    socket.emit("adventure_choice", { stage, choiceId });
    setChoices(null);
    console.log("ITEM NAMES", itemNames);
    if (itemNames) {
      socket.emit("adventure_prereq_choice", { itemNames });
    }
  };

  socket.on("event_defeat", () => {
    FlowRouter.go("/seasonal-event/defeat");
  });

  useEffect(() => {
    const onAdventureWin = ({ monsterId }: { monsterId: string }) => {
      FlowRouter.go(`/adventure/win/${monsterId}`);
    };
    socket.on("adventure_win", onAdventureWin);
    return () => {
      socket.off("adventure_win", onAdventureWin);
    };
  }, [stage]);

  useEffect(() => {
    const onEventWin = ({ monsterId }: { monsterId: string }) => {
      FlowRouter.go(`/seasonal-event/win/${monsterId}`);
    };
    socket.on("event_win", onEventWin);
    return () => {
      socket.off("event_win", onEventWin);
    };
  }, [stage]);

  useEffect(() => {
    const onSeasonalEventDefeat = () => {
      FlowRouter.go("/seasonal-event/defeat");
    };
    socket.on("event_defeat", onSeasonalEventDefeat);
    return () => {
      socket.off("event_defeat", onSeasonalEventDefeat);
    };
  });

  useEffect(() => {
    console.log("---ADV: Player State Updated:", playerState);
  }, [playerState]);

  useEffect(() => {
    console.log("---ADV: Battle State Updated---");
    if (battleState !== null) {
      setPlayerState(battleState.yourPlayer);
    }
  }, [battleState]);

  useEffect(() => {
    console.log("---ADV: Adventure State Updated---");

    socket.emit("failed_connection", { stage });
  }, []);

  useEffect(() => {
    socket.on("event_state", (state) => {
      if (state.stage) {
        setStage(state.stage);
      } else {
        console.log("stage", stage);
        // setStage(1000);
      }
      console.log(state.stage);
      if (state.type === "battle") {
        setBattleState(state.battle);
        console.log("STARTING LOGS...", battleState?.yourPlayer.logs);
        setDialogue(null); // Clear dialogue
        setCurrentEnemy(null);
      } else if (state.type === "dialogue") {
        setDialogue(state.dialogue);
        setCurrentEnemy(state.enemy ?? null);
        setBattleState(null); // Clear battle
        setPlayerState(state.player);
      } else if (state.type === "choice") {
        // Handle choice state
        setChoices(state.choices);
        setQuestion(state.result);
        setBattleState(null); // Clear battle
        setPlayerState(state.player);
        setCurrentEnemy(null);
      } else if (state.type === "stat_change") {
        setStatChange(state.result);
        setBattleState(null); // Clear battle
        setPlayerState(state.player);
        setCurrentEnemy(null);
      } else if (state.type === "status") {
        console.log("test", state);
        setStatusResult(state.result);
        console.log("test", statusResult);
        setBattleState(null); // Clear battle
        setPlayerState(state.player);
        setCurrentEnemy(null);
      } else if (state.type === "update_player") {
        setPlayerState(state.player);
        setEquipmentInventoryFull(false);
        setIncomingEquipment(null);
        setCurrentEquipment([]);
      }
    });

    socket.on("possible_actions", (actions: ActionState[]) => {
      setPossibleActions(actions);
    });

    //insert socket for end of battle

    socket.on("roll_dice", (diceRoll: number) => {
      setDiceValue(diceRoll);
      console.log(`From socket in Battle: dps ${diceRoll}`);
      setShowDiceModal(true);
    });

    return () => {
      socket.off("possible_actions");
      socket.off("event_state");
      socket.off("roll_dice");
    };
  });

  return (
    <>
      <div
        className="inset-0 w-screen h-screen bg-cover bg-center overscroll-contain"
        style={{ backgroundImage: backgroundString }}
      >
        <EventLeavePopup open={showLeave} onClose={() => setShowLeave(false)} />

        {viewingInfo && (
          <MonsterInfoPopup
            playerState={playerState}
            attackState={playerState.attackState}
            onClose={() => setViewingInfo(false)}
          ></MonsterInfoPopup>
        )}
        {viewingEnemyInfo && (
          <MonsterInfoPopup
            playerState={battleState.opponentPlayer}
            attackState={battleState.opponentPlayer.attackState}
            onClose={() => setViewingEnemyInfo(false)}
          ></MonsterInfoPopup>
        )}
        {dialogue && (
          <>
            {currentEnemy && (
              <MonsterDisplay
                biomeString={getBiomeString(levelMonster)}
                monster={currentEnemy}
              />
            )}
            <DialogueBox
              monster={currentEnemy ?? undefined}
              lines={dialogue}
              onEnd={() => {
                setDialogue(null);
                setCurrentEnemy(null);
                socket.emit("event_next", { stage });
              }}
            />
          </>
        )}
        {choices && (
          <>
            <div>
              <ChoicePopup
                question={question![0]}
                choices={choices}
                onClick={handleChoiceSelect}
              ></ChoicePopup>
            </div>
          </>
        )}
        {/* ADVENTURE HEADER (DURING NON-BATTLE) */}
        {!battleState && playerState && (
          <>
            <div className="fixed top-0 left-0 w-full">
              <div className="flex items-center gap-4 px-[20px]">
                {/* Header */}
                <div className="flex-1">
                  <div className="panel">
                    <AdventureInfoPanel
                      playerState={playerState}
                      level={levelMonster}
                      stage={stage}
                    />
                  </div>
                </div>
              </div>
              {/* Exit/Info Buttons */}
              <div className="flex justify-between xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem]  pointer-events-auto">
                <div className="flex lg:gap-5 sm:gap-10">
                  <IconButton
                    style="arrowleft"
                    iconColour="black"
                    buttonColour="red"
                    size="small"
                    onClick={() => setShowLeave(true)}
                  />
                  <IconButton
                    style="info"
                    iconColour="black"
                    buttonColour="blue"
                    size="small"
                    onClick={() => setViewingInfo(true)}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* DURING BATTLE UI */}
        {battleState && (
          <div className="battle-state-parts item-center justify-center ">
            <AdventureBattleHeader battleState={battleState} />
            {/* Buttons */}
            <div className="xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem] pointer-events-auto z-10 w-full flex justify-between">
              {/* Left side buttons */}
              <div className="flex lg:gap-5 sm:gap-10">
                <IconButton
                  style="arrowleft"
                  iconColour="black"
                  buttonColour="red"
                  size="small"
                  onClick={() => setShowLeave(true)}
                />
                <IconButton
                  style="info"
                  iconColour="black"
                  buttonColour="blue"
                  size="small"
                  onClick={() => setViewingInfo(true)}
                />
                <EventLeavePopup
                  open={showLeave}
                  onClose={() => setShowLeave(false)}
                ></EventLeavePopup>
              </div>

              {/* Right side buttons */}
              <div className="flex lg:gap-5 sm:gap-10 pr-[2rem]">
                <IconButton
                  style="info"
                  iconColour="black"
                  buttonColour="redpink"
                  size="small"
                  onClick={() => setViewingEnemyInfo(true)}
                />
              </div>
            </div>

            <BattleMonsterPanel
              battleState={battleState}
              biome={backgroundLocation}
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
                <OutlineText key={index} size="medium-battle-text">
                  {log}
                </OutlineText>
              ))}
            </div>

            <div className="h-1/3 w-full">
              {
                <BattleFooter
                  possibleActions={possibleActions}
                  battleId={battleId}
                />
              }
            </div>

            <DiceRollModal
              show={showDiceModal}
              onClose={() => setShowDiceModal(false)}
              toRoll={diceValue}
              battleState={battleState}
            />
          </div>
        )}
      </div>
    </>
  );
};

const biomeMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => "FOREST"],
  [MonsterIdentifier.POUNCING_BANDIT, () => "FOREST"],
  [MonsterIdentifier.CINDER_TAIL, () => "BASALT"],
  [MonsterIdentifier.FURIOUS_FLIPPER, () => "ARCTIC"],
  [MonsterIdentifier.POISON_POGO, () => "MARSH"],
  [MonsterIdentifier.CHARMER_COBRA, () => "DESERT"],
  [MonsterIdentifier.JACKED_O_LANTERN, () => "MARSH"],
]);

export function getBiomeString(monsterID: MonsterIdentifier) {
  //default return is forest :)
  const biomeName = biomeMap.get(monsterID);
  return biomeName ? biomeName() : "FOREST";
}

export default SeasonalEventBattle;
