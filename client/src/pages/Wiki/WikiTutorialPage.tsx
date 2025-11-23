import React, { useState } from "react";
import { WikiHeader } from "../../components/wiki/WikiHeader";
import { BlackText } from "../../components/texts/BlackText";

export const WikiTutorialPage = () => {
  const annotations =
    "1.) Health Bars: Shows each monster's current and maximum HP.\n2.) Player Display: Shows each player’s name and the monster they’re using.\n3.) Timer: Shows how much time is left for each player to select a move. If time runs out, your turn will be skipped.\n4.) Ability Buttons: Shows each ability that you are able to use. Unavailable moves will be greyed out.\n5.) Ability Charges: Shows how many times you can use this ability this game. Not all abilities will have limited uses!";

  const abilities =
    "• The goal of the game is to defeat your opponent by reducing their health points (HP) to zero. You can do this by using your monster's set of abilities to hurt your opponent and protect yourself.\n• Using an attack on an enemy will make a dice roll. If the roll plus your Attack Bonus is equal to or higher than the enemy's Armor Class (AC), the attack will hit and deal 5 points of damage. If the roll is lower than the enemy's AC, the attack will miss and deal no damage.\n• Alternatively, you can use a defend to increase your AC by 5 for a turn, making it harder for your opponent to hit you.\n• In addition to attack and defend, each monster has 2 unique abilities with more advanced effects. Check the monster's ability descriptions for more information.";

  const annotatedImage =
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/misc/TUTORIAL.png";
  return (
    <div className="flex flex-col w-full h-full space-y-[1rem] overflow-y-scroll justify-start items-center m-[2rem]">
      <WikiHeader title="How to Play"></WikiHeader>

      <div className="flex flex-col md:w-[50rem] xl:w-[100rem] space-y-[1rem] whitespace-pre-line">
        <BlackText size="medium">
          • Welcome to Beastly Brawl Showdown! This guide will walk you through
          the basics of how to play the game.
        </BlackText>

        <BlackText size="medium">
          • Each turn, you will select one ability for your monster to use. Both
          players will select their abilities simultaneously, and then the turn
          will resolve based on the abilities that were selected.
        </BlackText>

        <BlackText size="medium">{abilities}</BlackText>

        <img src={annotatedImage} />

        <BlackText size="medium">{annotations}</BlackText>
      </div>
    </div>
  );
};
