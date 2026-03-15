import { BlankPage } from "../../components/pagelayouts/BlankPage";
import React from "react";

export const DamagePage = () => {
  return (
    <BlankPage>
      <p>Animation Testing Page</p>
      <div className="grid grid-cols-4 gap-2 overflow-auto">
        {/* <div>
          <p>Damage Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/ROCKY_RHINO_DAMAGE.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
          ></img>
        </div> */}
        <div>
          <p>Attack Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
          ></img>
        </div>
        <div>
          <p>Defend Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/CINDER_TAIL.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
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
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
          ></img>
        </div>
        <div>
          <p>Defend Action Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/POUNCING_BANDIT.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
          ></img>
        </div>
        <div>
          <p>Defend Break Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/FURIOUS_FLIPPER.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
          ></img>
        </div>
        {/* <div>
          <p>Defend Fade Animation</p>
          <img
            src={
              "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/animation/POUNCING_BANDIT_DAMAGE.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
          ></img>
        </div> */}
      </div>
    </BlankPage>
  );
};
