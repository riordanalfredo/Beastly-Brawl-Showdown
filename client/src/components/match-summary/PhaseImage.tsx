import React from "react";
import { BattlePhase } from "/types/composite/battleState";

interface PhaseImageProps {
  currentPhase: BattlePhase | null;
  isOver: boolean;
  player1Win: boolean;
  player2Win: boolean;
  width?: string;
  height?: string;
  top?: string;
}

const PhaseImage: React.FC<PhaseImageProps> = ({
  currentPhase,
  isOver,
  player1Win,
  player2Win,
  width = "35%",
  height = "35%",
  top = "70%",
}) => {
  // You can customize the image source based on the current phase and winner status
  const getImageSrc = () => {
    // Check for winner first
    if (player1Win || player2Win) {
      return "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/matchsummary/TRIANGLE.png";
    }

    // This conditional will be true if both players eliminate each other at the same time
    if (isOver) {
      return "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/matchsummary/CROSS.png";
    }

    // Otherwise use phase-based images
    switch (currentPhase) {
      case "CHOOSE_ACTION":
        return "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/matchsummary/SWORDS.png";
      case "EXECUTE_ACTION":
        return "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/matchsummary/SMOKE.png";
      default:
        return "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/matchsummary/SWORDS.png"; // Default image
    }
  };

  // Determine if image should be flipped
  const shouldFlipImage = player1Win;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: top,
        transform: "translate(-50%, -50%)",
        zIndex: 10, // Higher than PlayerPanel elements
        width: width,
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={getImageSrc()}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
          transform: shouldFlipImage ? "scaleX(-1)" : "scaleX(1)", // Flip horizontally if player1 wins
        }}
      />
    </div>
  );
};

export default PhaseImage;
