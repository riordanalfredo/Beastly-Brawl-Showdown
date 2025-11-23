import React, { useState } from "react";
import { WikiMonsterCard } from "../../components/wiki/WikiMonsterCard";
import { MonsterIdentifier } from "../../../../types/single/monsterState";
import { ActionIdentifier } from "../../../../types/single/actionState";
import { WikiHeader } from "../../components/wiki/WikiHeader";

export const WikiMonstersPage = () => {
  return (
    <div className="flex flex-col h-full w-full space-y-[1rem] overflow-y-scroll justify-start items-center m-[2rem]">
      <WikiHeader title="Monsters" />

      <WikiMonsterCard
        image={MonsterIdentifier.ROCKY_RHINO}
        name={"Rocky Rhino"}
        description="A beast that lives to rumble and crush. With one mighty stomp, it shakes the ground, stunning foes before crushing them beneath its weight."
        ability1={"Ground Slam"}
        ability2={"Fortress Stance"}
        abilityimage1={ActionIdentifier.GROUND_SLAM}
        abilityimage2={ActionIdentifier.FORTRESS_STANCE}
        HP={"30"}
        attackBonus={"1"}
        AC={"12"}
        archetype="Defender"
      />

      <WikiMonsterCard
        image={MonsterIdentifier.POUNCING_BANDIT}
        name={"Pouncing Bandit"}
        description="A sneaky predator that strikes from the shadows. It can leap great distances to ambush its prey, and its swift strikes leave foes reeling."
        ability1={"Shadow Leap"}
        ability2={"Feral Strike"}
        abilityimage1={ActionIdentifier.SHADOW_LEAP}
        abilityimage2={ActionIdentifier.FERAL_STRIKE}
        HP={"20"}
        attackBonus={"4"}
        AC={"10"}
        archetype="Attacker"
      />

      <WikiMonsterCard
        image={MonsterIdentifier.CINDER_TAIL}
        name={"Cinder Tail"}
        description={
          "A fiery lizard that scorches everything in its path. Its flaming tail can lash out to burn foes, and it can consume enemies to heal its wounds."
        }
        ability1={"Flame Lash"}
        ability2={"Tip the Scales"}
        abilityimage1={ActionIdentifier.FLAME_LASH}
        abilityimage2={ActionIdentifier.TIP_THE_SCALES}
        HP={"25"}
        attackBonus={"3"}
        AC={"11"}
        archetype="Balanced"
      />

      <WikiMonsterCard
        image={MonsterIdentifier.CHARMER_COBRA}
        name={"Charmer Cobra"}
        description={
          "A hypnotic serpent that entrances its prey. Its alluring lullaby can confuse foes, making them attack each other instead."
        }
        ability1={"Alluring Lullaby"}
        ability2={"Fortress Stance"}
        abilityimage1={ActionIdentifier.ALLURING_LULLABY}
        abilityimage2={ActionIdentifier.FORTRESS_STANCE}
        HP={"30"}
        attackBonus={"2"}
        AC={"12"}
        archetype="Defender"
      />

      <WikiMonsterCard
        image={MonsterIdentifier.POISON_POGO}
        name={"Poison Pogo"}
        description={
          "An agile amphibian that bounces around the battlefield. Its toxin tongue can poison enemies, dealing damage over time."
        }
        ability1={"Toxin Tongue"}
        ability2={"Feral Strike"}
        abilityimage1={ActionIdentifier.TOXIN_TONGUE}
        abilityimage2={ActionIdentifier.FERAL_STRIKE}
        HP={"20"}
        attackBonus={"4"}
        AC={"10"}
        archetype="Attacker"
      />

      <WikiMonsterCard
        image={MonsterIdentifier.FURIOUS_FLIPPER}
        name={"Furious Flipper"}
        description={
          "Just a little penguin with a penchant for destruction. It unleashes its spiky pufferfish to jab and harrass, turning the tide in its favour."
        }
        ability1={"Puffer Blast"}
        ability2={"Tip the Scales"}
        abilityimage1={ActionIdentifier.PUFFER_BLAST}
        abilityimage2={ActionIdentifier.TIP_THE_SCALES}
        HP={"23"}
        attackBonus={"3"}
        AC={"11"}
        archetype="Balanced"
      />
    </div>
  );
};
