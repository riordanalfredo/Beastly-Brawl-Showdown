import React from "react";
import { MonsterIdentifier } from "/types/single/monsterState";

//Calculate the level of each layer
const overlayOrder: string[] = [
  //UNDERLAY
  "lake curse",
  "swamps calm",
  "swamps whisper",
  //MONSTER IMAGE
  "monster",
  //OVERLAY
  "infinity ability",
  "poison",
  "burn",
  "stun",
  "slime boost",
  "damage heal",
  "regeneration",
  "lake blessing",
  "strong",
  "weak",
  //
  "shield",
  "crit",
  "miss",
] as const; //order for each status from lowest layer to highest.
const prio = new Map(overlayOrder.map((s, i) => [s, i]));

function getZLevel(status: string, z: number): number {
  const p = prio.get(status);
  const priority = p !== undefined ? p : overlayOrder.length + 999;
  return z * 1000 + priority;
}

//get monster image
function getMonsterImage(
  monster: MonsterIdentifier,
  animation: string,
  biome?: string,
): string {
  let monsterName = monster;
  if (monster === MonsterIdentifier.SLIME && biome) {
    monsterName = `SLIME_${biome}`;
  }

  if (animation === "default") {
    return (
      "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/" +
      monsterName +
      ".png"
    );
  }

  if (animation === "ability") {
    return (
      "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
      monsterName +
      "_" +
      animation.toUpperCase() +
      ".gif"
    );
  }

  const image =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
    monsterName +
    "_" +
    animation.toUpperCase() +
    ".png";
  return image;
}

function getOverlay(overlay: string): string {
  return (
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
    overlay.toUpperCase().replace(/\s+/g, "_") +
    ".png"
  );
}

//change gif size to fit monster image
const ABILITY_TUNING: Partial<
  Record<MonsterIdentifier, { scale: number; x: number; y: number }>
> = {
  //increase y to push down, increase x to move left
  [MonsterIdentifier.CHARMER_COBRA]: { scale: 1.2, x: 0, y: 0 },
  [MonsterIdentifier.FURIOUS_FLIPPER]: { scale: 1.65, x: -60, y: 60 },
  [MonsterIdentifier.POISON_POGO]: { scale: 1.05, x: 0, y: 0 },
  [MonsterIdentifier.ROCKY_RHINO]: { scale: 1.5, x: 0, y: 60 },
  [MonsterIdentifier.CINDER_TAIL]: { scale: 1.3, x: 0, y: 30 },
};

const DEFAULT_TUNING = { scale: 1, x: 0, y: 0 };

const shieldAnimations = [
  "shield-broken",
  "shield-crack",
  "defend",
  "shield-expire",
  "shield",
];
const animationOptions = [
  "scales",
  "attack",
  "damage",
  "shadow-leap",
  "slime-support",
  "fortress-stance",
];
const underlayOptions = ["lake curse", "swamps calm", "swamps whisper"];

function splitAnimations(
  animations: string[],
  side: string,
): [string, string[], string[]] {
  animations = animations.filter((a) => a != "ability"); //exclude ability

  //ANIMATIONS
  const aImage = animations.filter((a) => animationOptions.includes(a));
  let animationImage: string;

  if (aImage.length === 1) {
    animationImage = "animate-" + aImage[0];
  } else if (aImage.length > 1) {
    console.error(
      `ANIMATION ERROR: expected only one monster animation: ${aImage}`,
    );
    animationImage = "animate-" + aImage[0];
  } else {
    animationImage = "";
  }

  const flippedAnimations = ["animate-attack", "animate-scales"];
  if (flippedAnimations.includes(animationImage)) {
    animationImage = animationImage + "-" + side;
  }

  //UNDERLAYS
  const underlayImage: string[] = animations.filter((a) =>
    underlayOptions.includes(a),
  );

  //OVERLAYS
  const overlayImage: string[] = animations.filter(
    (a) =>
      !underlayOptions.includes(a) &&
      !animationOptions.includes(a) &&
      !shieldAnimations.includes(a),
  );
  return [animationImage, overlayImage, underlayImage];
}

function getShieldAnimation(animations: string[]): [string, string] {
  let animation = "invisible";
  let image = "";

  for (const a of shieldAnimations) {
    if (animations.includes(a)) {
      animation = "animate-" + a;
      image =
        "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
        a.toUpperCase().replace("-", "_") +
        ".png";
      return [animation, image];
    }
  }
  return [animation, image];
}

interface BattleMonsterImageProps {
  monster: MonsterIdentifier;
  side: "left" | "right";
  animations: string[];
  biome: string;
}

export const BattleMonsterImage: React.FC<BattleMonsterImageProps> = ({
  monster,
  side,
  animations,
  biome,
}) => {
  const [animationImage, overlayImage, underlayImage] = splitAnimations(
    animations,
    side,
  );
  const monsterSrc = getMonsterImage(monster, "default", biome);
  const hasAbility = animations.includes("ability");
  const abilitySrc = hasAbility
    ? getMonsterImage(monster, "ability", biome)
    : "";
  const tune = ABILITY_TUNING[monster] ?? DEFAULT_TUNING;

  const [shieldAnimation, shieldImage] = getShieldAnimation(animations);
  const flip = side === "left" ? "transform -scale-x-100" : "";
  const shieldFlip = side === "right" ? "transform -scale-x-100" : "";

  return (
    <div className={`justify-self-center w-full flex justify-center`}>
      <div className="relative mx-auto w-full xl:w-1/2 max-w-[28rem] aspect-square overflow-visible isolate">
        {/* Status/Underlay Images */}
        {underlayImage.map((item, i) => {
          const overlay = getOverlay(item);
          return (
            <img
              src={overlay}
              // style={{ zIndex: getZLevel(item, 20) }}
              style={{ zIndex: getZLevel(item, 0) }}
              className={`
                    absolute inset-0 
                    pointer-events-none 
                    select-none 
                    ${flip}
                    
                    `}
            />
          );
        })}
        {/* Main Monster Image */}
        <img
          src={monsterSrc}
          alt={monster}
          style={{ transform: `scale(1)`, zIndex: getZLevel("monster", 2) }}
          className={`absolute inset-0 w-full h-full object-contain object-bottom ${animationImage} ${flip}  ${
            hasAbility ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Ability gif overlay*/}
        {hasAbility && (
          <img
            src={abilitySrc}
            alt=""
            aria-hidden="true"
            style={{
              zIndex: 2000,
              transform: `${side === "left" ? "scaleX(-1) " : ""} scale(${
                tune.scale
              }) translateY(${tune.y}px) translateX(${tune.x}px)`,
              transformOrigin: "center bottom",
            }}
            className={`absolute ${animationImage}  inset-0 bottom-0 h-full w-auto object-contain pointer-events-none select-none`}
          />
        )}
        {/* Status/Overlay Animations */}
        {overlayImage.map((item, i) => {
          const overlay = getOverlay(item);
          const z = getZLevel(item, 3);
          return (
            <img
              src={overlay}
              style={{ zIndex: z }}
              className={`
                    absolute inset-0 
                    pointer-events-none 
                    select-none 
                    `}
            />
          );
        })}
        {/* Shield Animations */}
        <img
          src={shieldImage}
          style={{ zIndex: getZLevel("shield", 4) }}
          className={`absolute inset-0 pointer-events-none select-none ${shieldFlip} ${shieldAnimation}`}
        ></img>
      </div>
    </div>
  );
};
