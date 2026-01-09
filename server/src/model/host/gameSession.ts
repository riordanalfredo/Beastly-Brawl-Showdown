import { Player } from "../game/player";
import Queue from "../../utils/queue";
import { Battle } from "../game/battle";
import { battles } from "../../../main";
import {
  GameSessionState,
  GameSessionStateMetaData,
  GameSessionFinalResults,
} from "/types/composite/gameSessionState";
import { Monster } from "../game/monster/monster";
import { GameSessionData } from "/types/other/gameSessionData";
import { BattlePhase } from "../../../../types/composite/battleState";
import { PlayerState } from "/types/single/playerState";
import { MonsterIdentifier } from "/types/single/monsterState";
import { RockyRhino } from "../game/monster/rockyRhino";
import { PouncingBandit } from "../game/monster/pouncingBandit";
import { CinderTail } from "../game/monster/cinderTail";
import crypto from "crypto";
import { IGameMode } from "./gamemode/gameMode";
import { Server, Socket } from "socket.io";
import { ActionResult } from "/types/single/actionState";
import { BotPlayer } from "../game/botPlayer";
import { GameModeIdentifier } from "/types/single/gameMode";

export default class GameSession {
  private hostUID: string;
  private players: Queue<Player>;
  private waitQueue: Queue<Player>;
  private battles: Queue<Battle>;
  private gameCode: number;
  private round: number = 1; // Round number
  private player_max: number = 16; // Max 16 players
  private battle_max: number = 8; // Max 8 battles
  private currentPhase: BattlePhase = BattlePhase.CHOOSE_ACTION;
  // private monsters: Array<String>;
  private mode: IGameMode;
  private monsters: Array<String>;
  private botInLobby: boolean = false; // whether has been added to this session or not
  private finalResults: GameSessionFinalResults;
  private selectedBackgroundTheme: string = "";
  private finalWinner: PlayerState | null = null;

  // Initialise sample data
  private gameSessionData: GameSessionData = {
    mostChosenMonster: { monster: null, percentagePick: "0" },
  };

  constructor(
    hostID: string,
    addition: { mode: IGameMode; presetGameCode?: number }
  ) {
    this.hostUID = hostID;
    // POST-MVP: increase max players and battles
    this.players = new Queue<Player>(this.player_max);
    this.waitQueue = new Queue<Player>(4);
    this.battles = new Queue<Battle>(this.battle_max);
    // this.monsters = ["RockyRhino","PouncingBandit","CinderTail"];
    this.mode = addition.mode;

    if (addition.presetGameCode !== undefined) {
      // Use preset game code if provided
      this.gameCode = addition.presetGameCode;
    } else {
      // Generate a new game code
      this.gameCode = this.generateGameCode();
    }
    this.mode = addition.mode;
  }

  // Generate game code
  public generateGameCode(): number {
    const generateSixDigitCode = (): number =>
      Math.floor(100000 + Math.random() * 900000);
    this.gameCode = generateSixDigitCode();

    return this.gameCode;
  }

  //Eliminate all the players presented in each battle
  public closeAllBattles(): void {
    this.battles.getItems().forEach((curBattle) => {
      curBattle.eliminateAllPlayers();
    });
  }

  public getBotInLobby(): boolean {
    return this.botInLobby;
  }

  public setBotInLobby(hasBot: boolean): void {
    this.botInLobby = hasBot;
  }

  //Get the actual number of players (bot is excluded)
  public getEffectivePlayer(): number {
    if (this.botInLobby) {
      return this.players.getItems().length - 1;
    }
    return this.players.getItems().length;
  }

  // Getters and setters
  public getHost(): string {
    return this.hostUID;
  }

  public setCurrentPhase(phase: BattlePhase): void {
    this.currentPhase = phase;
  }

  public getCurrentPhase(): BattlePhase {
    return this.currentPhase;
  }

  public getGameCode() {
    return this.gameCode;
  }

  public getBattles() {
    return this.battles;
  }

  public updateHost(hostID: string) {
    this.hostUID = hostID;
  }

  public getPlayers() {
    return this.players;
  }
  public getMonsters() {
    return this.monsters;
  }

  public clearBattles() {
    this.battles = new Queue<Battle>(this.battle_max);
  }

  public getRound(): number {
    return this.round;
  }

  public setRound(newRound: number): void {
    this.round = newRound;
  }

  public getWaitQueue() {
    return this.waitQueue;
  }

  public setMaxPlayers(max:number): void {
    this.player_max = max;
  }


  // Add player to Game Session queue
  public addPlayer(player: Player): { success: boolean; reason?: string } {
    if (!this.canSocketJoin(player.getId())) {
      return { success: false, reason: "Player already in game session" };
    }
    if (!this.isPlayerNameFree(player.getName())) {
      return { success: false, reason: "Player name is already taken" };
    }
    if (this.players.size() >= this.player_max) {
      return { success: false, reason: "Game is full" };
    }
    this.players.enqueue(player);
    return { success: true };
  }

  // Function takes a player object as an argument, and then the queue is run through by serving each item until it has looped through
  // the entire queue. If a served item is not the same as the player given in the argument, then it is pushed back into the queue, but
  // if it is the same, then it is not pushed back into the queue
  public removePlayer(removingPlayerID: String) {
    // Loop to check through each item in the queue
    const playersSize = this.players.size();
    for (let i = 0; i < playersSize; i++) {
      const playerIndexed = this.players.dequeue(); // Serves the current player at the front
      if (
        playerIndexed != undefined &&
        playerIndexed.getId() != removingPlayerID
      ) {
        this.players.enqueue(playerIndexed); // If the player is not the argument one, then put them back in the queue
      }
    }
  }

  getPlayerWaiting(seaarchingPlayerID: String): Player | null {
    // Loop to check through each item in the queue
    for (let i = 0; i < this.waitQueue.size(); i++) {
      const playerIndexed = this.waitQueue.dequeue(); // Serves the current player at the front
      if (playerIndexed != undefined) {
        this.waitQueue.enqueue(playerIndexed);
        if (playerIndexed.getId() == seaarchingPlayerID) {
          return playerIndexed;
        }
      }
    }
    return null;
  }

  // Check if all requirements are met before starting game
  public canStartGame(): boolean {
    if (this.players.size() < 2) {
      return false;
    }
    // check every player has picked a monster
    for (const p of this.players.getItems()) {
      if (p.getMonster() === null) {
        return false;
      }
    }
    return true;
  }

  public calculateErrors(): string[] {
    var errors: string[] = [];

    if (this.players.size() < 2) {
      errors.push("Not enough players to start the game.");
    }

    for (const p of this.players.getItems()) {
      if (p.getMonster() === null) {
        errors.push(`${p.getName()} has not picked a monster.`);
      }
    }

    return errors;
  }

  // Check if Socket is already in Game Session
  public canSocketJoin(socketId: string): boolean {
    for (const p of this.players.getItems()) {
      if (p.getId() === socketId) {
        return false;
      }
    }
    return true;
  }

  // Check name is not taken
  public isPlayerNameFree(name: string): boolean {
    for (const p of this.players.getItems()) {
      if (p.getName().toLocaleLowerCase() === name.toLocaleLowerCase()) {
        // Name is already taken
        return false;
      }
    }
    return true;
  }

  public createMatches() {
    const playersSize = this.players.size();
    // Prepare the battles with the players in them
    const cyclesCount = Math.floor(playersSize / 2);

    // Randomising the players into a temporary player queue
    const tempPlayerQueue = new Queue<Player>(playersSize);

    let previousPosition = 1;

    for (let i = 0; i < playersSize; i++) {
      const playerIndexed = this.players.dequeue();

      const currentPosition = Math.random();

      if (playerIndexed != undefined && previousPosition < currentPosition) {
        tempPlayerQueue.enqueuefront(playerIndexed);
        previousPosition = currentPosition;
      } else if (playerIndexed != undefined) {
        tempPlayerQueue.enqueue(playerIndexed);
        previousPosition = currentPosition;
      }
    }

    for (let i = 0; i < cyclesCount; i++) {
      // Get the two people that will be battling in the current match by taking them from the queue that randomised their order
      const player1Indexed = tempPlayerQueue.dequeue();
      const player2Indexed = tempPlayerQueue.dequeue();

      // Create a battle and add it to the queue of battles
      if (player1Indexed != undefined && player2Indexed != undefined) {
        let battleId = crypto.randomUUID();

        const battle = new Battle(
          battleId,
          player1Indexed,
          player2Indexed,
          this.hostUID
        );

        battles.set(battleId, battle);

        this.battles.enqueue(battle);

        this.players.enqueue(player1Indexed);
        this.players.enqueue(player2Indexed);
      }

      previousPosition = 1;
    }

    // Taking into account the case where there's an odd number of players. The odd one out automatically wins and is added back to the queue, as they cannot be put into a battle
    if (tempPlayerQueue.size() != 0) {
      const autoWinPlayer = tempPlayerQueue.dequeue();
      if (autoWinPlayer != undefined) {
        this.oddOneOutWinner(autoWinPlayer);
        this.players.enqueue(autoWinPlayer);
      }
    }

    return this.battles;
  }

  public oddOneOutWinner(oddPlayer: Player): Player {
    let battleId = crypto.randomUUID();

    const botPlayer = new BotPlayer();
    botPlayer.setRandomMonster();

    this.players.enqueue(botPlayer);

    const battle = new Battle(battleId, oddPlayer, botPlayer, this.hostUID);

    battles.set(battleId, battle);
    this.battles.enqueue(battle);

    this.botInLobby = true;
    return oddPlayer;
  }
  public calculateMostChosenMonster() {
    // Map from monster name to { monster: Monster, count: number }
    const monsterCount: Record<string, { monster: Monster; count: number }> =
      {};

    //UPDATE: calling error that monster is possibly null.
    this.getPlayers()
      .getItems()
      .forEach((player) => {
        const monster = player.getMonster();
        const monsterId = monster.getId();

        if (monsterCount[monsterId]) {
          monsterCount[monsterId].count++;
        } else {
          monsterCount[monsterId] = { monster, count: 1 };
        }
      });

    let mostPicked: Monster | null = null;
    let maxCount = 0;

    for (const { monster, count } of Object.values(monsterCount)) {
      if (count > maxCount) {
        mostPicked = monster;
        maxCount = count;
      }
    }

    if (mostPicked) {
      this.gameSessionData.mostChosenMonster = {
        monster: mostPicked.getMonsterState(),
        percentagePick:
          this.getPlayers().getItems().length > 0
            ? Math.round(
                (maxCount / this.getPlayers().getItems().length) * 100
              ).toString()
            : "0",
      };
    }
  }

  public areBattlesConcluded(): boolean {
    return this.battles.getItems().every((battle) => battle.isBattleOver());
  }

  public getGameSessionState(): GameSessionState {
    const allBattles = [];
    let remainingPlayers = 0;
    // let totalPlayers = this.battles.size() * 2;
    let totalPlayers = this.players.size();

    for (const battle of this.battles.getItems()) {
      var firstPlayer = battle.getPlayers()[0];
      allBattles.push(battle.getBattleState(firstPlayer.getId()));
      // if (battle.isBattleOver()) {
      //   remainingPlayers += 1;
      // } else {
      //   remainingPlayers += 2;
      // }
    }

    for (const player of this.getPlayers().getItems()) {
      if (player.getHealth() > 0) {
        remainingPlayers += 1;
      }
    }

    console.log("[CURRENT MODE]: ", this.mode.name);
    let metadata = this.mode.getMetadata();

    return {
      id: this.gameCode.toString(),
      round: this.round,
      mode: this.mode.name,
      battleStates: allBattles,
      gameSessionData: this.gameSessionData,
      currentPhase: this.currentPhase,
      totalPlayers: totalPlayers,
      remainingPlayers: remainingPlayers,
      waitingPlayers: this.getPlayersNotInBattle(),
      metadata: this.getMetadata(),
      isGameModeFinished: this.isGameModeFinished(),
    };
  }

  public getPlayerStates(): PlayerState[] {
    const playerStates: PlayerState[] = [];
    for (const player of this.players.getItems()) {
      playerStates.push(player.getPlayerState());
    }
    return playerStates;
  }

  public initGame(io: Server, socket: Socket): void {
    return this.mode.init(this, io, socket);
  }

  public onActionExecuted(
    player1: Player,
    player1Result: ActionResult,
    player2: Player,
    player2Result: ActionResult
  ): void {
    return this.mode.onActionExecuted(
      this,
      player1,
      player1Result,
      player2,
      player2Result
    );
  }

  public onBattleEnded(
    winner: Player | null,
    battle: Battle,
    io: Server,
    socket: Socket
  ): void {
    return this.mode.onBattleEnded(this, battle, winner, io, socket);
  }

  public onBattlesEnded(io: Server, socket: Socket): void {
    return this.mode.onBattlesEnded(this, io, socket);
  }

  public onBattleStarted(
    session: GameSession,
    battle: Battle,
    io: Server,
    socket: Socket
  ): void {
    return this.mode.onBattleStarted(session, battle, io, socket);
  }

  public onTurnStarted(
    session: GameSession,
    battle: Battle,
    io: Server,
    socket: Socket
  ): void {
    return this.mode.onTurnStarted(session, battle, io, socket);
  }

  public isSessionConcluded(): boolean {
    return this.mode.isSessionConcluded(this);
  }
  public getPlayersNotInBattle(): Player[] {
    const allPlayers = this.players.getItems(); // All players in the session
    const playersInBattles = new Set<string>();

    // Gather IDs of all players currently in battles
    for (const battle of this.battles.getItems()) {
      for (const player of battle.getPlayers()) {
        playersInBattles.add(player.getId());
      }
    }

    // Filter players not in the playersInBattles set
    const playersNotInBattle = allPlayers.filter(
      (player) => !playersInBattles.has(player.getId())
    );

    return playersNotInBattle;
  }

  public setFinalWinner(finalWinner: PlayerState | null): void {
    this.finalWinner = finalWinner;
  }

  public getFinalWinner(): PlayerState | null {
    return this.finalWinner;
  }

  public setFinalResults(finalResults: GameSessionFinalResults): void {
    this.finalResults = finalResults;
  }

  public getFinalResults(): GameSessionFinalResults {
    return this.finalResults;
  }

  public getMode(): GameModeIdentifier {
    return this.mode.name;
  }

  public getMetadata(): GameSessionStateMetaData {
    return this.mode.getMetadata();
  }

  public isGameModeFinished(): boolean {
    return this.mode.isGameModeFinished();
  }

  public setSelectedBackgroundTheme(selectedBackgroundTheme: string): void {
    this.selectedBackgroundTheme = selectedBackgroundTheme;
  }

  public getSelectedBackgroundTheme(): string {
    return this.selectedBackgroundTheme;
  }
}
