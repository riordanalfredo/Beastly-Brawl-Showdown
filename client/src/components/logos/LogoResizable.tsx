import React from "react";

interface MonsterImageProps {
  className?: string;
}

const LogoResizable: React.FC<MonsterImageProps> = ({ className = "" }) => {
  const path =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/misc/LOGO.png";

  return <img src={path} className={`${className}`} />;
};

export default LogoResizable;
