import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { IconButton } from "../../components/buttons/IconButton";
import socket from "../../socket";
import { MonsterIdentifier } from "/types/single/monsterState";
import { getBiomeString } from "./AdventureBattle";
import { monsterMeta } from "../../data/monsterMeta";
import { BlackText } from "../../components/texts/BlackText";
import { motion, AnimatePresence } from "framer-motion";
import { BaseCard } from "../../components/cards/BaseCard";
import { PlayerState } from "../../../../types/single/playerState";
import { BattleMonsterImage } from "../../components/player-screen/monsters/BattleMonsterImage";
import { MonsterImage } from "../../components/player-screen/monsters/MonsterImage";
import { MonsterImageResizable } from "../../components/player-screen/monsters/MonsterImageResizable";
import { ArchetypeIdentifier } from "../../../../types/single/monsterState";

interface DuelLobbyProps {}

const DuelLobby: React.FC<DuelLobbyProps> = () => {
  const fakePlayer: PlayerState = {
    id: "player-1",
    name: "Test Player",

    currentHealth: 100,
    currentAttackStat: 15,
    currentArmourClassStat: 12,

    successBlock: 0,
    successHit: 0,

    statuses: [],

    monster: {
      id: MonsterIdentifier.ROCKY_RHINO,
      archetypeId: ArchetypeIdentifier.DEFENDER,
      name: "Rocky Rhino",
      description: "A rhino",

      maxHealth: 10,
      attackBonus: 10,
      armourClass: 10,

      startingHP: 10,
      startingATK: 10,
      startingAC: 10,

      possibleActions: [],
    },

    logs: [],
    battleLogs: [],

    equipment: [],
    consumables: [],
    storyItems: [],

    attackState: {
      attackDamage: 1,
      critRate: 1,
      diceRange: 1,
    },

    battleWon: 0,
    abilitiesUsed: 0,
    mostDamageDealt: 0,
    successfulBlocks: 0,
    criticalHitsDealt: 0,

    animations: [],
  };
  const fakePlayer2: PlayerState = {
    id: "player-2",
    name: "Test Player 2",

    currentHealth: 100,
    currentAttackStat: 15,
    currentArmourClassStat: 12,

    successBlock: 0,
    successHit: 0,

    statuses: [],

    monster: null,

    logs: [],
    battleLogs: [],

    equipment: [],
    consumables: [],
    storyItems: [],

    attackState: {
      attackDamage: 1,
      critRate: 1,
      diceRange: 1,
    },

    battleWon: 0,
    abilitiesUsed: 0,
    mostDamageDealt: 0,
    successfulBlocks: 0,
    criticalHitsDealt: 0,

    animations: [],
  };
  const [playerState, setPlayerState] = useState<PlayerState | null>(
    fakePlayer
  );
  const [opponentState, setOpponentState] = useState<PlayerState | null>(null);

  useEffect(() => {}, []);

  // Monster image (coloured or silhouette if locked)

  // Background image
  const backgroundString = `url('https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/background/FOREST.jpg')`;

  return (
    <div className="relative flex flex-col items-center justify-center h-[100dvh] w-full px-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: backgroundString,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {/* Back arrow button */}
        <div className="fixed top-0 left-0 z-50 lg:ml-5 lg:mt-5 sm:ml-6 sm:mt-6">
          <IconButton
            style="arrowleft"
            iconColour="black"
            buttonColour="red"
            size="medium"
            onClick={() => FlowRouter.go("/adventure/mode-select")}
          />
        </div>

        {/* "CLASSIC" header */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-3">
          <BaseCard color="schoolBusYellow" width={40} height={8}>
            <OutlineText size="extraLarge">
              WAITING FOR OPPONENT....
            </OutlineText>
          </BaseCard>
        </div>
      </div>
      <div className="lg:flex h-screen w-screen lg:h-[90%] lg:w-[80%] fixed">
        <div className="flex items-end justify-center max-lg:absolute max-lg:inset-0 lg:flex-1 bg-defender/70 max-lg:h-full max-lg:[clip-path:polygon(0_100%,100%_100%,0_0)] lg:border-blackcurrant lg:border-[4px] lg:rounded-l-xl">
          <div className="flex flex-col items-center">
            <OutlineText size="choice-text">
              {!playerState?.monster
                ? playerState?.name
                : playerState?.name + `'s`}
            </OutlineText>
            <OutlineText size="choice-text">
              {playerState?.monster ? `${playerState?.monster.name}` : ``}
            </OutlineText>
            <MonsterImageResizable
              name={playerState?.monster ? playerState?.monster?.id : "NONE"}
              width={20}
              height={20}
            ></MonsterImageResizable>
          </div>
        </div>
        <svg
          className="lg:invisible absolute inset-0 z-15 pointer-events-none w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke="#1f1b2e" // blackCurrant
            strokeWidth="1"
          />
        </svg>
        <div className="max-lg:absolute max-lg:inset-0 lg:flex-1 bg-attacker/70 max-lg:h-full max-lg:[clip-path:polygon(0_0,100%_100%,100%_0)] lg:border-blackcurrant lg:border-[4px] lg:rounded-r-xl"></div>
      </div>
    </div>
  );
};

export default DuelLobby;
