import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import React from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./src/pages/Home/Home";
import { LoginPage } from "./src/pages/Home/LoginPage";
import HostLobby from "./src/pages/Lobby/HostLobby";
import JoinLobby from "./src/pages/Lobby/JoinLobby";
import PathNotFound from "./src/pages/Home/PathNotFound";
import { GameConfiguration } from "./src/pages/Game/GameConfiguration";
import Battle from "./src/pages/Game/Battle";
import { Game } from "./src/pages/Lobby/Game";
import Rules from "./src/pages/Game/Rules";
import MatchSummary from "./src/pages/Host View/MatchSummary";
import AdventureLevelSelect from "./src/pages/Adventure/AdventureLevelSelect";
import AdventureBattle from "./src/pages/Adventure/AdventureBattle";
import AdventureDefeated from "./src/pages/Adventure/Defeated";
import AdventureWin from "./src/pages/Adventure/AdventureWin";
import { MonsterIdentifier } from "../types/single/monsterState";
import { Account } from "./src/pages/Home/Account";
import AdventureMonsterSelect from "./src/pages/Adventure/AdventureMonsterSelect";
import { BlankPage } from "./src/components/pagelayouts/BlankPage";
import { Achievements } from "./src/pages/Home/Achievements";
import { GlobalLeaderboard } from "./src/pages/GlobalLeaderboard";
import { FinalResultsScoringTournament } from "./src/pages/Lobby/FinalResultsScoringTournament";
import { FinalResultsBattleRoyale } from "./src/pages/Lobby/FinalResultsBattleRoyale";
import { Test } from "./src/pages/AnimationTesting/Testing";
import { AdventureSelectMode } from "./src/pages/Adventure/AdventureSelectMode";
import { AttackPage } from "./src/pages/AnimationTesting/Attack";
import { DamagePage } from "./src/pages/AnimationTesting/Damage";
import { DefendPage } from "./src/pages/AnimationTesting/Defend";
import { WikiPage } from "./src/pages/Wiki/WikiPage";
import { WikiIndex } from "./src/pages/Wiki/WikiIndex";
import SeasonalEventHome from "./src/pages/Seasonal_Event/SeasonalEventHome";
import SeasonalEventMonsterSelect from "./src/pages/Seasonal_Event/SeasonalEventMonsterSelect";
import SeasonalEventBattle from "./src/pages/Seasonal_Event/SeasonalEventBattle";
import SeasonalEventWin from "./src/pages/Seasonal_Event/SeasonalEventWin";
import SeasonalEventDefeated from "./src/pages/Seasonal_Event/SeasonalEventDefeated";
import DuelLobby from "./src/pages/Lobby/DuelLobby";

function mount(Component: React.FC) {
  const container = document.getElementById("react-target");
  if (container) {
    createRoot(container).render(<Component />);
  }
}

// FlowRouter.route("/test", {
//   name: "Test",
//   action() {
//     document.title = "Animation Testing";
//     mount(Test);
//   },
// });

// FlowRouter.route("/attack", {
//   name: "Test",
//   action() {
//     document.title = "Animation Testing";
//     mount(AttackPage);
//   },
// });

// FlowRouter.route("/damage", {
//   name: "Test",
//   action() {
//     document.title = "Animation Testing";
//     mount(DamagePage);
//   },
// });

// FlowRouter.route("/defend", {
//   name: "Test",
//   action() {
//     document.title = "Animation Testing";
//     mount(DefendPage);
//   },
// });

FlowRouter.route("/", {
  name: "Home",
  action() {
    document.title = "Beastly Brawl Showdown";
    mount(Home);
  },
});

FlowRouter.route("/wiki", {
  name: "WikiIndex",
  action() {
    mount(WikiIndex);
  },
});

FlowRouter.route("/wiki/:slug", {
  name: "WikiPage",
  action(params: any) {
    mount(() => <WikiPage pageName={params.slug as WikiPageIdentifier} />);
  },
});

FlowRouter.route("/host", {
  name: "HostLobby",
  action() {
    document.title = "Hosting... | Beastly Brawl Showdown";
    mount(HostLobby);
  },
});

FlowRouter.route("/login", {
  name: "LoginPage",
  action() {
    mount(LoginPage);
  },
});

FlowRouter.route("/achievements", {
  name: "Achievements",
  action() {
    mount(Achievements);
  },
});

FlowRouter.route("/host/choose-mode", {
  name: "GameConfiguration",
  action() {
    document.title = "Hosting... | Beastly Brawl Showdown";
    mount(GameConfiguration);
  },
});

FlowRouter.route("/host/:code?", {
  name: "HostLobby",
  action(params) {
    document.title = "Host Lobby | Beastly Brawl Showdown";
    mount(() => <HostLobby gameCode={params.code} />);
  },
});

FlowRouter.route("/join", {
  name: "JoinLobby",
  action() {
    document.title = "Join | Beastly Brawl Showdown";
    mount(JoinLobby);
  },
});

FlowRouter.route("/join/:code?", {
  name: "JoinLobby",
  action(params) {
    document.title = "Join | Beastly Brawl Showdown";
    mount(() => <JoinLobby gameCode={params.code} />);
  },
});

FlowRouter.route("/account", {
  name: "Account",
  action() {
    document.title = "My Account | Beastly Brawl Showdown";
    mount(() => <Account />);
  },
});

FlowRouter.route("/leaderboard", {
  name: "Leaderboard",
  action() {
    document.title = "Leaderboard | Beastly Brawl Showdown";
    mount(() => <GlobalLeaderboard />);
  },
});

FlowRouter.route("/dev-notes", {
  name: "Dev Notes",
  action() {
    document.title = "Dev Notes | Beastly Brawl Showdown";
    mount(() => <BlankPage />);
  },
});

FlowRouter.route("/battle/:battleId?", {
  name: "Battle",
  action(params) {
    document.title = "Battle | Beastly Brawl Showdown";
    mount(() => <Battle battleId={params.battleId} />);
  },
});

FlowRouter.route("/session/:sessionId?", {
  name: "Session",
  action(params) {
    mount(() => <Game gameSessionId={params.sessionId} />);
  },
});

FlowRouter.route("/battles/:code?", {
  name: "MatchSummary",
  action(params) {
    document.title = "Host Battles | Beastly Brawl Showdown";
    mount(() => <MatchSummary gameCode={params.code} />);
  },
});

FlowRouter.route("/final-results-battle-royale/:code?", {
  name: "FinalResultsBattleRoyale",
  action(params) {
    document.title = "Final Results | Beastly Brawl Showdown";
    mount(() => <FinalResultsBattleRoyale gameCode={params.code} />);
  },
});

FlowRouter.route("/final-results-scoring-tournament/:code?", {
  name: "FinalResultsScoringTournament",
  action(params) {
    document.title = "Final Results | Beastly Brawl Showdown";
    mount(() => <FinalResultsScoringTournament gameCode={params.code} />);
  },
});

FlowRouter.route("/seasonal-event/home/:eventId?", {
  name: "SeasonalEventHome",
  action(params) {
    document.title = "Home - Seasonal Event | Beastly Brawl Showdown";
    mount(() => <SeasonalEventHome eventId={params.eventId} />);
  },
});

FlowRouter.route("/seasonal-event/:eventId?/monster-select", {
  name: "SeasonalEventMonsterSelect",
  action(params) {
    document.title = "Monster Select - Seasonal Event | Beastly Brawl Showdown";
    mount(() => <SeasonalEventMonsterSelect eventMonster={params.eventId} />);
  },
});

FlowRouter.route("/adventure/mode-select", {
  name: "ModeSelect",
  action() {
    document.title = "Mode Select - Adventure Mode | Beastly Brawl Showdown";
    mount(AdventureSelectMode);
  },
});

FlowRouter.route("/adventure/level-select", {
  name: "LevelSelect",
  action() {
    document.title = "Level Select - Adventure Mode | Beastly Brawl Showdown";
    mount(AdventureLevelSelect);
  },
});

FlowRouter.route("/adventure/monster-select", {
  name: "MonsterSelect",
  action() {
    document.title = "Monster Select - Adventure Mode | Beastly Brawl Showdown";
    mount(AdventureMonsterSelect);
  },
});

//hard coded list of current levels
const adventureLevelMonsters = [
  MonsterIdentifier.ENDLESS,
  MonsterIdentifier.POUNCING_BANDIT,
  MonsterIdentifier.CINDER_TAIL,
  MonsterIdentifier.FURIOUS_FLIPPER,
  MonsterIdentifier.CHARMER_COBRA,
  MonsterIdentifier.POISON_POGO,
  MonsterIdentifier.JACKED_O_LANTERN,
];

//create flow router for each level
adventureLevelMonsters.forEach((monster) => {
  FlowRouter.route(`/adventure/adventure-${monster}`, {
    name: "AdventureBattle",
    action() {
      document.title = "Adventure Mode | Beastly Brawl Showdown";
      mount(() => <AdventureBattle levelMonster={monster} />);
    },
  });
});

// Do the same as above for Events
adventureLevelMonsters.forEach((monster) => {
  FlowRouter.route(`/seasonal-event/boss-${monster}`, {
    name: "SeasonalEventBattle",
    action() {
      document.title = "Event - Seasonal Event | Beastly Brawl Showdown";
      mount(() => <SeasonalEventBattle levelMonster={monster} />);
    },
  });
});

FlowRouter.route("/adventure/win/:monsterId", {
  name: "adventure.win",
  action() {
    document.title = "Victory! - Adventure Mode | Beastly Brawl Showdown";
    mount(AdventureWin);
  },
});

FlowRouter.route("/seasonal-event/win/:monsterId", {
  name: "seasonal-event.win",
  action() {
    document.title = "Victory! - Seasonal Event | Beastly Brawl Showdown";
    mount(SeasonalEventWin);
  },
});

FlowRouter.route("/adventure/defeat", {
  name: "AdventureDefeat",
  action() {
    document.title = "Defeat! - Adventure Mode | Beastly Brawl Showdown";
    mount(AdventureDefeated);
  },
});

FlowRouter.route("/seasonal-event/defeat", {
  name: "AdventureDefeat",
  action() {
    document.title = "Defeat! - Adventure Mode | Beastly Brawl Showdown";
    mount(SeasonalEventDefeated);
  },
});

FlowRouter.route("/rules", {
  name: "Rules",
  action() {
    document.title = "Rules | Beastly Brawl Showdown";
    mount(Rules);
  },
});

FlowRouter.route("/test-triangles", {
  name: "Triangles",
  action() {
    mount(DuelLobby);
  },
});

FlowRouter.route("/*", {
  name: "NotFound",
  action() {
    mount(PathNotFound);
  },
});
