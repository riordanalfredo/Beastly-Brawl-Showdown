import React from "react";
import HealthBar from "./HealthBar";
import { PlayerState } from "/types/single/playerState";
import { OutlineText } from "../texts/OutlineText";

interface PlayerPanelProps {
  playerState: PlayerState;
  playerIndex: number;
  isLeftPlayer?: boolean; // Add this to control layout direction
  winner: boolean;
  playerScore: number;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({
  playerState,
  playerIndex,
  isLeftPlayer = true,
  winner,
  playerScore,
}) => {
  // Extract current and max health values
  const currentHealth = playerState.currentHealth;
  const maxHealth = playerState.monster?.maxHealth;

  const getScorePosition = () => {
    if (isLeftPlayer) {
      return "left-2";
    }
    return "right-18";
  };

  // Format the name of the monster from the form 'Monster Name' to 'MONSTER_NAME'.
  const formattedName = playerState.monster?.id;
  const imageSrc =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    formattedName +
    ".png";

  return (
    <div
      key={playerIndex}
      style={{
        borderRadius: "0.5rem",
        padding: "0.75rem 0.5rem",
        textAlign: "center",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "50%",
      }}
    >
      {/* Player Name with Crown */}
      <div
        style={{
          fontSize: "1rem",
          fontFamily: "Jua, sans-serif",
          fontWeight: "bold",
          color: "#403245",
          marginBottom: "0.5rem",
          // border: '2px solid',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          position: "relative",
          height: "50px", // Fixed height instead of minHeight
          padding: "0.5rem",
        }}
      >
        {/* Crown image - only show if winner */}
        {winner && (
          <img
            src="https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/matchsummary/CROWN.png"
            alt="Winner Crown"
            style={{
              width: "35px", // Increased from 20px to 35px
              height: "35px", // Increased from 20px to 35px
              objectFit: "contain",
            }}
          />
        )}

        {/* Player Name */}
        <span>{playerState.name}</span>

        {/* Crown on the other side for balance */}
        {winner && (
          <img
            src="https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/matchsummary/CROWN.png"
            alt="Winner Crown"
            style={{
              width: "35px", // Increased from 20px to 35px
              height: "35px", // Increased from 20px to 35px
              objectFit: "contain",
            }}
          />
        )}
      </div>

      {/* Health Bar and Monster Image Container */}
      <div
        className="Healtbar-monsterimage-container"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: isLeftPlayer ? "row" : "row-reverse",
          position: "relative", // Enable positioning for overlap
        }}
      >
        {/* Health Bar */}
        <div
          style={{
            width: "80%",
            zIndex: 1, // Keep health bar below monster image
          }}
        >
          <HealthBar
            current={currentHealth}
            max={maxHealth} // Health bar won't show before player selects a monster
            isLeftPlayer={isLeftPlayer}
          />
        </div>

        {/* Monster Image */}
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "absolute",
            zIndex: 2,
            right: isLeftPlayer ? "10px" : "auto",
            left: isLeftPlayer ? "auto" : "10px",
            top: "50%",
            transform: `translateY(-50%) ${isLeftPlayer ? "scaleX(-1)" : "scaleX(1)"}`,
          }}
        >
          <img
            src={imageSrc}
            alt={`${playerState.name}'s monster`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      {playerScore == null ? (
        <div />
      ) : (
        <div>
          {/* P1 score */}
          <div
            className={`
                absolute
                top-5
                ${getScorePosition()}
                w-10
                h-10
                rounded-full
                bg-[#FFE07C]
                border-3
                border-[#403245]
                text-white
                flex
                items-center
                justify-center
                text-sm
                font-jua
                overflow-hidden
            `}
          >
            <OutlineText size="small">{playerScore}</OutlineText>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerPanel;
