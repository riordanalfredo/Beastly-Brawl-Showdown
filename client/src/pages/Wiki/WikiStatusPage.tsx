import React, { useState } from "react";
import { WikiStatusCard } from "../../components/wiki/WikiStatusCard";
import { WikiHeader } from "../../components/wiki/WikiHeader";

export const WikiStatusPage = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-[1rem] overflow-y-scroll justify-start items-center m-[2rem]">
      <WikiHeader title="Statuses" />

      <WikiStatusCard
        name="Stun"
        body="Prevents the affected monster from taking any actions on their next turn."
      />

      <WikiStatusCard
        name="Poison"
        body="Deals 3 damage to the affected monster at the start of their turn for 3 turns."
      />
    </div>
  );
};
