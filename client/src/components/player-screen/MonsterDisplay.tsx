import React from "react";
import { MonsterIdentifier, MonsterState } from "/types/single/monsterState";
import "./MonsterDisplay.css";

interface MonsterDisplayProps {
  monster: MonsterState;
  className?: string;
  biomeString: string;
}

const MonsterDisplay: React.FC<MonsterDisplayProps> = ({
  monster,
  className,
  biomeString,
}) => {
  var imagePath =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    monster.id +
    ".png";

  //checks if monster is a slime - then uses biome specific variant
  if (monster.id == MonsterIdentifier.SLIME) {
    imagePath = `https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/SLIME_${biomeString}.png`;
  }
  return (
    <div className={`monster-display-container ${className ?? ""}`}>
      <div className="monster-image-wrapper">
        <img
          src={imagePath}
          alt={monster.name}
          className="monster-image"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default MonsterDisplay;
