import React, { useState } from "react";
import { ActionIdentifier } from "../../../../types/single/actionState";
import { BlackText } from "../../components/texts/BlackText";
import { WikiArchetypeCard } from "../../components/wiki/WikiArchetypeCard";
import { WikiHeader } from "../../components/wiki/WikiHeader";

export const WikiArchetypesPage = () => {
  return (
    <div className="flex flex-col h-full w-full space-y-[1rem] overflow-y-scroll justify-around items-center m-[2rem]">
      <WikiHeader title="Archetypes" />

      <div className="md:w-[50rem] xl:w-[100rem]">
        <BlackText size="medium">
          {
            "Each monster falls under one of three classifications known as archetypes. \nA monster's archetype defines its playstyle as well as one of the moves it has access to."
          }
        </BlackText>
      </div>

      <div className="flex flex-col space-y-[2rem] justify-around items-center">
        <WikiArchetypeCard
          image={ActionIdentifier.FORTRESS_STANCE}
          name="Defender"
          body={
            "Defender monsters excel at outlasting their opponents in battle. They typically have higher AC and HP than other archetypes, and aim to whittle down their opponents with their superior durability."
          }
          action={"Fortress Stance"}
        />

        <WikiArchetypeCard
          image={ActionIdentifier.FERAL_STRIKE}
          name="Attacker"
          body={
            "Attacker monsters have formidible offences to take down their opponents quickly. They have the highest attack bonus of any archetype, and their moves specialise in dishing out damage in bursts."
          }
          action={"Feral Strike"}
        />

        <WikiArchetypeCard
          image={ActionIdentifier.TIP_THE_SCALES}
          name="Balanced"
          body={
            "Balanced monsters are generalists, sporting playstyles that mix attack and defence. They have no major weaknesses, and are capable of mitigating randomness with their moves."
          }
          action={"Tip the Scales"}
        />
      </div>
    </div>
  );
};
