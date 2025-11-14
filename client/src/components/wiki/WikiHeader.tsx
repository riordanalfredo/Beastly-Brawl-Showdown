import React from "react";
import { OutlineTextBP } from "../texts/OutlineTextBP";
import { BaseCard } from "../cards/BaseCard";
import { IconButton } from "../buttons/IconButton";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

interface WikiHeaderProps {
  title: string;
}

export const WikiHeader = ({ title }: WikiHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 pt-2">
      {/* Back Button - Positioned absolutely on larger screens, top on mobile */}
      <div className="sm:absolute sm:left-0 flex items-center justify-center">
        <IconButton
          style="arrowleft"
          iconColour="black"
          buttonColour="red"
          size="medium"
          onClick={() => FlowRouter.go(title === "Rules" ? "/" : "/wiki")}
        />
      </div>

      {/* Title Card - Centered and responsive */}
      <div className="flex items-center justify-center w-full sm:w-auto">
        <BaseCard color="peach" className="px-8 py-3 sm:px-12 sm:py-4 whitespace-nowrap">
          <OutlineTextBP size="extraLarge">{title}</OutlineTextBP>
        </BaseCard>
      </div>
    </div>
  );
};
