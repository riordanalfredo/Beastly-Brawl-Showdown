import React, { useState } from "react";
import { ActionIdentifier } from "../../../../types/single/actionState";
import { WikiAbilityCard } from "../../components/wiki/WikiAbilityCard";
import { OutlineTextBP } from "../../components/texts/OutlineTextBP";
import { WikiHeader } from "../../components/wiki/WikiHeader";

export const WikiAbilitiesPage = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-[1rem] overflow-y-scroll justify-start items-center m-[2rem]">
      <WikiHeader title="Abilities" />

      <OutlineTextBP size="large">Common Abilities</OutlineTextBP>

      <WikiAbilityCard
        image={ActionIdentifier.ATTACK}
        name="Attack"
        body={
          "The basic form of offense that all monsters have access to. \nMakes an attack roll, dealing 5 damage on a successful hit."
        }
        uses="Unlimited"
      />
      <WikiAbilityCard
        image={ActionIdentifier.DEFEND}
        name="Defend"
        body={
          "Put up a shield that lasts a maximum of 3 turns. \nEnemies must break through it to deal damage."
        }
        uses="3"
      />

      <OutlineTextBP size="large">Regular Abilities</OutlineTextBP>

      <WikiAbilityCard
        image={ActionIdentifier.FORTRESS_STANCE}
        name="Fortress Stance"
        body={
          "The user toughens their body, anticipating an attack. \nIncreases AC by 20 this turn."
        }
        uses="1"
      />
      <WikiAbilityCard
        image={ActionIdentifier.TIP_THE_SCALES}
        name="Tip the Scales"
        body={
          "The user's natural luck manifests in an attack. \nMakes an attack roll that will never roll below a 10, dealing 5 damage on a successful hit."
        }
        uses="1"
      />
      <WikiAbilityCard
        image={ActionIdentifier.GROUND_SLAM}
        name="Ground Slam"
        body={
          "The user stomps the earth, disorientating the opponent. \nDeals 3 damage and stuns the enemy, preventing them from acting next turn."
        }
        uses="2"
      />
      <WikiAbilityCard
        image={ActionIdentifier.SHADOW_LEAP}
        name="Shadow Leap"
        body={
          "The user moves fast enough to become invisible, evading an attack. \nAny damage this turn is nullified."
        }
        uses="1"
      />
      <WikiAbilityCard
        image={ActionIdentifier.FLAME_LASH}
        name="Flame Lash"
        body={
          "The user whips a blazing tail that seeks the opponent. \nDeals 5 damage, also breaks the opponent's shield."
        }
        uses="1"
      />
      <WikiAbilityCard
        image={ActionIdentifier.ALLURING_LULLABY}
        name="Alluring Lullaby"
        body={
          "The user sings a strange tune that confuses the opponent. \nIf this monster would be hit by an attack this turn, the opponent takes the damage instead."
        }
        uses="1"
      />
      <WikiAbilityCard
        image={ActionIdentifier.TOXIN_TONGUE}
        name="Toxin Tongue"
        body={
          "The user whips their venomous tongue as a weapon. \nThe opponent becomes poisoned, taking 1 damage at the start of their next 5 turns."
        }
        uses="2"
      />
      <WikiAbilityCard
        image={ActionIdentifier.PUFFER_BLAST}
        name="Puffer Blast"
        body={
          "The user launches a burst of three pufferfish at the opponent. \nEach fish has a chance to hit for 2 damage and apply poison."
        }
        uses="1"
      />

      <OutlineTextBP size="large">Passive Abilities</OutlineTextBP>

      <WikiAbilityCard
        image={ActionIdentifier.FERAL_STRIKE}
        name="Feral Strike"
        body={
          "The user's savage nature causes it to deal crippling blows more easily. \nThis monster triggers a critical hit on a roll of 16-20."
        }
        uses="Unlimited"
      />
    </div>
  );
};
