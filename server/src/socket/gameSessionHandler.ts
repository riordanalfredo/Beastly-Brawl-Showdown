import { Server, Socket } from "socket.io";
import { activeGameSessions, battles, players } from "../../main";
import { Player } from "../model/game/player";
import GameSession from "../model/host/gameSession";
import proceedBattleTurn from "./battle/startBattleHandler";
import { ScoringTournament } from "../model/host/gamemode/scoringTournament";
import { BattleRoyale } from "../model/host/gamemode/battleRoyale";
import { playerAccounts } from "../../main";
import { GameModeIdentifier } from "/types/single/gameMode";
import { join } from "path";

export const gameSessionHandler = (io: Server, socket: Socket) => {
  const joinGameHandler = ({ gameCode, name }: { gameCode: string; name: string}) => {
    try {
      console.log(
        `Join request for Code: ${gameCode}, User: ${name} - ${socket.id}`
      );
      const gameCodeN = Number(gameCode);

      const session = activeGameSessions.get(gameCodeN);


      if (!session) {
        // If session of given game code doesn't exist
        console.log(`Join request failed. Invalid Code`);
        socket.emit("join-reject", [
          "The code entered is invalid. Please verify and try again",
        ]);
        return;
      }

      // Retrieve playerAccount by socketID. PlayerAccount is binded to a Player via socketID
      // Ensure that playerAccount exists
      if (!playerAccounts.has(socket.id)) {
        console.log(`Player account not found for socket ID: ${socket.id}`);
        socket.emit("join-reject", [
          "Player account not found. Please register or login.",
        ]);
        return;
      }
      // Ensure that playerAccount is valid (socket maps correctly to PlayerAccount)
      const playerAccount = playerAccounts.get(socket.id);
      if (!playerAccount) {
        console.log(`Player account not found for socket ID: ${socket.id}`);
        socket.emit("join-reject", [
          "Player account not found. Please register or login.",
        ]);
        return;
      }

      // Assign guest name if name field is empty
      let finalName: string;
      if (name === "") {
        const currentPlayers = session.getPlayerStates();
        let guestNumber = 0;
        let numberTaken = true;

        while (numberTaken) {
          guestNumber++;
          numberTaken = currentPlayers.some(
            (p) => p.name === `Guest ${guestNumber}`
          );
        }

        finalName = `Guest ${guestNumber}`;
      } else {
        finalName = name;
      }

      const newPlayer = new Player(socket.id, finalName, playerAccount);
      const addResult = session.addPlayer(newPlayer);
      if (!addResult.success) {
        // Join request rejected
        console.log(`Player ${name} rejected from ${gameCode}`);
        socket.emit("join-reject", [addResult.reason || "Unable to join."]);
        return;
      }
      newPlayer.updateGameCode(gameCodeN);

      // Add player to players map
      players.set(socket.id, newPlayer);

      // Add player to Game Session socket
      socket.join(`game-${gameCodeN}`);

      // Update host information
      io.to(`game-${gameCode}`).emit("update-players", {
        message: `Player ${name} - PlayerEmail ${newPlayer.getPlayerAccountEmail()} - ${
          socket.id
        } added to current game session.`,
        players: session.getPlayerStates(),
      });

      // Player is accepted
      console.log(
        `Join request accepted. UserID: ${
          socket.id
        } | UserAcc email: ${newPlayer.getPlayerAccountEmail()} | UserAcc name: ${newPlayer.getPlayerAccountUsername()}.`
      );

      // Update player success message
      socket.emit("join-accept", {
        gameSessionId: gameCode,
        isDuel: session.getIsDuel().toString(),
      });
    } catch (err) {
      console.error("Unexpected join error:", err);
      socket.emit("join-reject", [
        "An unexpected error occurred. Please try again.",
      ]);
    }
  }

  // Create game session
  socket.on("create-game", (data) => {
    console.log("Attempting game session creation...");

    console.log("[MODE SELECTION]: ", data);
    let session: GameSession;
    //TODO: move this to a separate function if we have more multiplayer modes.
    if (data.mode === GameModeIdentifier.SCORING) {
      session = new GameSession(socket.id, {
        mode: new ScoringTournament({ rounds: data.selectedSliderValue }),
      });
    } else {
      session = new GameSession(socket.id, { mode: new BattleRoyale() });
    }
    session.setSelectedBackgroundTheme(data.selectedBackgroundTheme);

    // Check if game code already exists, if so, generate a new one
    while (activeGameSessions.has(session.getGameCode())) {
      console.log("Game session already exists. Generating new code...");
      session.generateGameCode();
    }
    activeGameSessions.set(session.getGameCode(), session);

    console.log(
      `Game session created: ${session.getGameCode()} | hostId: ${socket.id}`
    );
    socket.join(`game-${session.getGameCode()}`);

    socket.emit("new-game", {
      // UPDATE: change who this emits to because potentially two ppl clicking host at same time would call this
      code: session.getGameCode(),
    });

    if (data.isDuel === "true"){
      session.setIsDuel(true);
      session.setMaxPlayers(2);
      joinGameHandler({gameCode: session.getGameCode().toString(), name: data.name, isDuel: true});
    }
  });

  // Join request
  socket.on("join-game", joinGameHandler);

  // Join as host
  socket.on("host-game", ({ gameCode }) => {
    // Concept is this is called when the host's id is changed so that they're
    // added to the room without being added to player list like join-room does
    console.log(`Join request for Code: ${gameCode}, Host: ${socket.id}`);
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesn't exist
      console.log(`Join request failed. Invalid Code ${gameCode}`);
      socket.emit("join-reject", {
        message: "Invalid game code. Unable to join as host.",
        code: gameCode,
      });
      return;
    }
    const oldHost = session.getHost();

    // UPDATE: Check current host of Game Session is still active
    session.updateHost(socket.id);
    console.log(
      `Old Host ${oldHost} has been replaced with ${socket.id} for game: ${gameCode}`
    );

    socket.join(`game-${gameCodeN}`);
  });

  socket.on("spectate-game", ({ userID = socket.id }) => {
    //debugging
    if (!players.get(userID)) {
      console.log(`Player not in map.`);
    }

    const player = players.get(userID);

    player?.setIsSpectating(true);
  });

  // Leave request
  socket.on("leave-game", ({ userID = socket.id }) => {
    const player = players.get(userID);
    const gameCode = player?.getGameCode();

    //debugging
    if (!player) {
      console.log(`Player not in map.`);
    }

    console.log(`Leave request for Code: ${gameCode}, User ID: ${userID}`);
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesnt exist
      console.log(`Leave request failed. Invalid Code`);
      return;
    }

    const socketToKick = io.sockets.sockets.get(userID);

    if (!socketToKick) {
      console.log(`Leave request failed. Invalid User ID`);
      return;
    }

    socketToKick.emit("kick-warning", {
      message: "You are being removed from the game session.",
    });

    if (
      player != null &&
      (player?.isSpectating() ||
        player?.isInSpectatingRoom() ||
        player?.getCurrentlySpectating() !== null)
    ) {
      player.setIsSpectating(false);
      player.setCurrentlySpectating(null);
      player.setInSpectatingRoom(false);

      for (const battle of session.getBattles().getItems()) {
        if (battle.getSpectators().includes(player)) {
          battle.removeSpectator(player);
          socketToKick.leave(battle.getId());
          socketToKick.leave(`${battle.getId()}-spectators`);
        }
      }
    }

    // Timeout to allow message to send before kick
    setTimeout(() => {
      socketToKick.leave(`game-${gameCodeN}`);
      session.removePlayer(userID);
      player?.updateGameCode(0);

      console.log(`Removed player ${userID} from game session ${gameCode}`);

      // Update host information
      io.to(`game-${gameCode}`).emit("update-players", {
        message: `Player ${socket.id} removed from current game session.`,
        players: session.getPlayerStates(),
      });
    }, 100);
  });

  // Request to send player back to the waiting room
  socket.on("return-to-waiting-room", ({ userID = socket.id }) => {
    const gameCode = players.get(userID)?.getGameCode();
    //debugging
    if (!players.get(userID)) {
      console.log(`Player not in map.`);
    }
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesnt exist
      console.log(`Return request failed. Invalid Code`);
      return;
    }
  });

  // Emits current player list on request
  socket.on("get-players", ({ gameCode }) => {
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesn't exist
      console.log(`Get Request Failed. Invalid Code ${gameCode}`);
      return;
    }
    io.to(`game-${gameCode}`).emit("update-players", {
      message: `Players Array Fetched`,
      players: session.getPlayerStates(),
    });
  });

  // List all active Game Session codes
  socket.on("game-list", () => {
    activeGameSessions.forEach((_session, gameCode) => {
      console.log("Game code:", gameCode);
    });
  });

  // Start game
  socket.on("start-game", ({ gameCode }) => {
    console.log(`Start request for Code: ${gameCode}`);
    const gameCodeN = Number(gameCode);

    const session = activeGameSessions.get(gameCodeN);
    if (!session) {
      // If session of given game code doesnt exist
      console.log(`Request failed. Invalid Code ${gameCode}`);
      return;
    }

    //Initialise game (based on game mode)
    // session.initGame(io, socket)

    if (!session.canStartGame()) {
      var errors = session.calculateErrors();
      // UPDATE: Need to change how this is returned
      io.to(`game-${gameCode}`).emit("start-failed", errors);
      console.log(`Request failed.`);
      return;
    }

    io.to(`game-${gameCode}`).emit("start-success", {});

    session.calculateMostChosenMonster();

    session.createMatches();
    session.initGame(io, socket);

    for (const battle of session.getBattles().getItems()) {
      for (const player of battle.getPlayers()) {
        io.sockets.sockets.get(player.getId())?.join(battle.getId());
        io.sockets.sockets
          .get(player.getId())
          ?.join(`${battle.getId()}-players`);
        //Get all players to join a common game session socket room
        io.sockets.sockets.get(player.getId())?.join(`game-${gameCodeN}`);
      }
      io.to(battle.getId()).emit("battle-started", battle.getId());
      proceedBattleTurn(io, socket, session, battle);
    }
  });

  // Starting a recently added battle
  socket.on("initiator-new-battle", ({ gameCode }) => {
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);
    const battle = session?.getBattles().getFrontItem();
    console.log("[INITIATOR: starting new battle...");

    if (!session) {
      // If session of given game code doesnt exist
      console.log(`Request failed. Invalid Code`);
      return;
    }
    if (!battle) {
      console.log(`Request failed. Invalid Battle`);
      return;
    }

    for (const player of battle.getPlayers()) {
      player.prepareForNextBattle();
    }
    socket.emit("battle-started", battle.getId());
    session.onBattleStarted(session, battle, io, socket);
    proceedBattleTurn(io, socket, session, battle);
  });

  socket.on("opponent-new-battle", ({ gameCode }) => {
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);
    const battle = session?.getBattles().getFrontItem();

    if (!session) {
      // If session of given game code doesnt exist
      console.log(`Request failed. Invalid Code`);
      return;
    }
    if (!battle) {
      console.log(`Request failed. Invalid Battle`);
      return;
    }

    for (const player of battle.getPlayers()) {
      player.prepareForNextBattle();
    }
    socket.emit("battle-started", battle.getId());
  });

  // Close game session
  socket.on("cancel-game", ({ gameCode }) => {
    console.log("Session cancelling...");
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);

    session.closeAllBattles(); //close all the ongoing battles in the current game session (host)

    //Notify all players that the host is closed
    //      socketToKick.leave(`game-${gameCodeN}`);

    if (!session) {
      // If session of given game code doesn't exist
      console.log(`Cancel Request failed. Invalid Code`);
      return;
    }
    session.closeAllBattles(); //close all the ongoing battles in the current game session (host)

    io.to(`game-${gameCodeN}`).emit("host-closed");

    // Timeout to allow the message to send before closure
    setTimeout(() => {
      activeGameSessions.delete(gameCodeN);
      // Removes all clients -> should auto delete room
      io.to(`game-${gameCodeN}`).emit("kick-warning", {
        message: "Game Session has been closed.",
      });

      setTimeout(() => {
        io.in(`game-${gameCodeN}`).socketsLeave(`game-${gameCodeN}`);
      }, 100); // wait 100ms

      console.log(`Game ${gameCodeN} is cancelled.`);
    }, 100);
  });

  // Get final results
  socket.on("request-final-results", ({ gameCode }) => {
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);
    const finalResults = session?.getFinalResults();

    if (finalResults) {
      console.log(
        `Successfully retrieved final results for game code ${gameCode}`
      );
      socket.emit("final-results", { finalResults });
    } else {
      console.log(`Failed to retrieve final results for game code ${gameCode}`);
      socket.emit("final-results", { finalResults: null });
    }
  });

  // Get selected background theme
  socket.on("request-selected-background-theme", ({ gameCode }) => {
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);
    const selectedBackgroundTheme = session?.getSelectedBackgroundTheme();

    if (selectedBackgroundTheme) {
      console.log(
        `Successfully retrieved selected background theme (${selectedBackgroundTheme}) for game code ${gameCode}`
      );
      socket.emit("selected-background-theme", { selectedBackgroundTheme });
    } else {
      console.log(
        `Failed to retrieve selected background theme for game code ${gameCode}`
      );
      socket.emit("selected-background-theme", {
        selectedBackgroundTheme: null,
      });
    }
  });

  // Get final winner
  socket.on("get-final-winner", ({ gameCode }) => {
    const gameCodeN = Number(gameCode);
    const session = activeGameSessions.get(gameCodeN);
    const finalWinner = session?.getFinalWinner();

    if (finalWinner) {
      console.log(
        `Successfully retrieved final winner for game code ${gameCode}`
      );
      socket.emit("final-winner-response", { finalWinner });
    } else {
      console.log(`Failed to retrieve final winner for game code ${gameCode}`);
      socket.emit("final-winner-response", { finalWinner: null });
    }
  });
};
