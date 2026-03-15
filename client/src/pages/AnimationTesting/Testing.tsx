import { BlankPage } from "../../components/pagelayouts/BlankPage";
import React from "react";

export const Test = () => {
  return (
    <BlankPage>
      <p>Animation Testing Page</p>
      <div className="grid grid-cols-4 gap-2 overflow-auto">
        <div>
          <p>Damage Animation (Red Image)</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/ROCKY_RHINO_DAMAGE.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
          ></img>
        </div>
        <div>
          <p>Attack Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack transform -scale-x-100`}
          ></img>
        </div>
        <div>
          <p>Slime Boost Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/SLIME_FOREST.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-slime-support`}
          ></img>
        </div>
        <div>
          <p>Damage Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/POISON_POGO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
          ></img>
        </div>
        <div>
          <p>Attack Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/CHARMER_COBRA.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack-right`}
          ></img>
        </div>
        <div>
          <p>Fortress Stance Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/CHARMER_COBRA.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-fortress-stance`}
          ></img>
        </div>
        <div>
          <p>Shadow Leap</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/POUNCING_BANDIT.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-shadow-leap`}
          ></img>
        </div>
        <div>
          <p>Tip the Scales</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/CINDER_TAIL.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-scales-left`}
          ></img>
        </div>
      </div>
    </BlankPage>
  );
};
