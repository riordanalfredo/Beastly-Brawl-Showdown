import { BlankPage } from "../../components/pagelayouts/BlankPage";
import React from "react";

export const DefendPage = () => {
  const shield =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/SHIELD.png";
  const defend =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/DEFEND.png";
  const rhino =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png";

  const pogo =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/POISON_POGO.png";

  const brokenShield =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/SHIELD_BROKEN.png";
  const crackedShield =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/SHIELD_CRACK.png";
  const expiredShield =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/SHIELD_EXPIRE.png";

  const characters = [
    {
      label: "Defend (Shield Creation)",
      character: rhino,
      animation: "animate-defend",
      image: defend,
    },
    {
      label: "Defend (Shield Creation)",
      character: pogo,
      animation: "animate-defend",
      image: defend,
    },
    {
      label: "Shield Active",
      character: rhino,
      animation: "animate-shield",
      image: shield,
    },
    {
      label: "Shield Block!",
      character: rhino,
      animation: "animate-shield-crack",
      image: crackedShield,
    },
    {
      label: "Shield Block!",
      character: pogo,
      animation: "animate-shield-crack",
      image: crackedShield,
    },
    {
      label: "Shield Break!!",
      character: rhino,
      image: brokenShield,
      animation: "animate-shield-broken",
    },
    {
      label: "Shield Break!!",
      character: pogo,
      image: brokenShield,
      animation: "animate-shield-broken",
    },
    {
      label: "Shield Fades",
      character: rhino,
      animation: "animate-shield-expire",
      image: expiredShield,
    },
  ];

  return (
    <BlankPage>
      <p className="mb-4 text-lg font-bold">Animation Testing Page</p>
      <div className="grid grid-cols-4 gap-4 overflow-auto">
        {characters.map(({ label, character, image, animation }, index) => (
          <div key={index}>
            <p className="mb-2">{label}</p>
            <div className="relative inline-block xl:w-[90%]">
              <div className="relative inset-0 flex items-center justify-center">
                <img
                  src={character}
                  className={`relative z-10 xl:w-[100%]`}
                  alt="character"
                />
                <img
                  src={image}
                  className={`
                    absolute inset-0 
                    pointer-events-none 
                    select-none 
                    z-20 xl:w-[100%]
                    ${animation}
                  `}
                  alt="shield overlay"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </BlankPage>
  );
};
