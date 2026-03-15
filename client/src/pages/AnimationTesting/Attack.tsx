import { BlankPage } from "../../components/pagelayouts/BlankPage";
import React from "react";

export const AttackPage = () => {
  return (
    <BlankPage>
      <p>Animation Testing Page</p>
      <div className="grid grid-cols-4 gap-2">
        <div>
          <p>FLIPPED</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack-left transform -scale-x-100`}
          ></img>
        </div>
        <div>
          <p>FLIPPED</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/POUNCING_BANDIT.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack-left transform -scale-x-100`}
          ></img>
        </div>
        <div>
          <p>FLIPPED</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/SLIME.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack-left transform -scale-x-100`}
          ></img>
        </div>
        <div>
          <p>FLIPPED</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/FURIOUS_FLIPPER.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack-left transform -scale-x-100`}
          ></img>
        </div>
        <div>
          <p>RIGHT</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/CINDER_TAIL.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack-right`}
          ></img>
        </div>

        <div>
          <p>RIGHT</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/POISON_POGO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack-right`}
          ></img>
        </div>
        <div>
          <p></p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/CHARMER_COBRA.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack-right`}
          ></img>
        </div>
      </div>
    </BlankPage>
  );
};
