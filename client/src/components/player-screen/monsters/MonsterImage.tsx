import React from "react";

interface MonsterImageProps {
  name: string;
  className?: string;
}

export const MonsterImage = ({ name, className }: MonsterImageProps) => {
  return (
    <img
      src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/${name}.png`}
      alt={`${name} image`}
      className={className}
    />
  );
};
