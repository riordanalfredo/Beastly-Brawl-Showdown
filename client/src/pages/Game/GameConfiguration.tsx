import React, { useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import { GameModeIdentifier } from "../../../../types/single/gameMode";
import { IconButton } from "../../components/buttons/IconButton";
import { CardWithHeader } from "../../components/cards/CardWithHeader";
import GameModeSelector from "../../components/selectors/GameModeSelector";
import BackgroundThemeSelector from "../../components/selectors/BackgroundThemeSelector";
import { OutlineTextResizable } from "../../components/texts/ResizableOutlineText";
import { setSelectedBackgroundTheme } from "../../selectedBackgroundTheme";
import { motion, AnimatePresence } from "framer-motion";

export const GameConfiguration = () => {
  // Use selectedGameModeIndex to retrieve currently selected mode.
  const [selectedGameModeIndex, setSelectedGameModeIndex] = useState(0);

  // Use selectedBackgroundThemeIndex to retrieve currently background theme.
  const [selectedBackgroundThemeIndex, setSelectedBackgroundThemeIndex] =
    useState(0);

  // Use selectedSliderValue to retrieve the current value of a visible slider.
  const defaultSliderValue = 3;
  const [selectedSliderValue, setSelectedSliderValue] =
    useState(defaultSliderValue);

  // Called on 'Host Lobby' button press
  const createGame = (mode: GameModeIdentifier) => {
    const selectedBackgroundTheme =
      backgroundThemeOptions[selectedBackgroundThemeIndex].name;
    setSelectedBackgroundTheme(selectedBackgroundTheme);
    socket.emit("create-game", {
      mode,
      selectedBackgroundTheme,
      selectedSliderValue,
    });
    console.log("Game session created");
  };

  // Define the data for each game mode card.
  const gameModeCardData = [
    {
      title: "Battle Royale",
      description: "Fight until only one player remains standing!",
      mode: GameModeIdentifier.BATTLE_ROYALE,
    },
    {
      title: "Scored Tournament",
      description: "Earn more points than your opponents over multiple rounds!",
      mode: GameModeIdentifier.SCORING,
      sliderText: "Round Count",
      sliderMin: 1,
      sliderMax: 5,
    },
  ];

  // Define the name of each background theme.
  const backgroundThemeOptions = [
    {
      name: "Forest",
    },
    {
      name: "Basalt",
    },
    {
      name: "Arctic",
    },
    {
      name: "Marsh",
    },
    {
      name: "Desert",
    },
    {
      name: "Colosseum",
    },
    {
      name: "Endless",
    },
  ];

  // Received when Game Session is created. Takes user to 'Host Lobby' Page
  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });

  return (
    <div className="relative w-screen min-h-screen">
      {/* AnimatePresence handles background transitions */}
      <AnimatePresence>
        <motion.div
          key={selectedBackgroundThemeIndex} // Ensures re-render on level changes
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `url('https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/background/${backgroundThemeOptions[selectedBackgroundThemeIndex].name.toUpperCase()}.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-6 sm:px-8 sm:py-10 lg:px-16 lg:py-14">
        <div className="absolute top-4 left-4 z-50">
          <IconButton
            style="arrowleft"
            iconColour="black"
            buttonColour="red"
            size="medium"
            onClick={() => FlowRouter.go("/")}
          />
        </div>
        <CardWithHeader
          headerText="GAME SETTINGS"
          headerColor="ronchi"
          cardColor="opaqueWhite"
        >
          <div className="flex flex-col items-center justify-center w-3/4 h-3/4 lg:space-y-5 sm:space-y-30">
            <div className="flex flex-row items-center justify-center h-7/16">
              <GameModeSelector
                cardData={gameModeCardData}
                selectedIndex={selectedGameModeIndex}
                setSelectedIndex={setSelectedGameModeIndex}
                selectedSliderValue={selectedSliderValue}
                setSelectedSliderValue={setSelectedSliderValue}
              />
            </div>
            <div className="flex flex-row items-center justify-center h-1/16">
              <OutlineText size="medium">Background Theme</OutlineText>
            </div>
            <div className="flex flex-row items-center justify-center h-7/16">
              <BackgroundThemeSelector
                cardData={backgroundThemeOptions}
                selectedIndex={selectedBackgroundThemeIndex}
                setSelectedIndex={setSelectedBackgroundThemeIndex}
              />
            </div>
            <div className="flex flex-row items-center justify-center h-5/16">
              <ButtonGeneric
                color="ronchi"
                size="medium"
                onClick={() =>
                  createGame(gameModeCardData[selectedGameModeIndex].mode)
                }
              >
                <OutlineTextResizable size="medium">
                  CREATE GAME
                </OutlineTextResizable>
              </ButtonGeneric>
            </div>
          </div>
        </CardWithHeader>
      </div>
    </div>
  );
};
