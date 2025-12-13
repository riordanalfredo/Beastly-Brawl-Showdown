import React, { ReactElement, ReactNode } from "react";
import { IconButton } from "../buttons/IconButton";
import { LeavePopup } from "../popups/AdventureLeavePopup";
import { useEffect, useState } from "react";

interface HeaderWithLeaveProps {
  children: ReactNode;
  color: "blue" | "purple" | "lightYellow" | "green" | "red" | "cream";
}

export const HeaderWithLeave = ({ children, color }: HeaderWithLeaveProps) => {
  const [showLeave, setShowLeave] = useState(false);

  const colorToDisplay = {
    blue: "bg-[#55A9ED]",
    purple: "bg-heliotrope",
    lightYellow: "bg-ronchi",
    green: "bg-conifer",
    red: "bg-burntSienna",
    cream: "bg-peach",
  };

  const layout = `
        w-[90%]
        
    `;

  const header = `
            ${colorToDisplay[color]}
            mx-auto
            text-large
            text-white
            font-[Jua]
            w-[80%]
            xl:w-[60%]
            h-normalPhoneHeight
            rounded-bl-xl
            rounded-br-xl
            border-consistent
            border-blackCurrant
            border-t-0
            text-center
            text-wrap
            pl-[1%]
            pr-[1%]
            inset-x-0
            fixed
            top-0
            left-[10rem]
            xl: left-[1rem]
            pt-[1rem]
            pb-[1rem]
            xl:pt-[0]
            xl:pb-[0]
            `;

  return (
    <div className="justify-center">
      <div className="xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem] pointer-events-auto">
        <IconButton
          style="arrowleft"
          iconColour="black"
          buttonColour="red"
          size="small"
          onClick={() => setShowLeave(true)}
        ></IconButton>
        <LeavePopup
          open={showLeave}
          onClose={() => setShowLeave(false)}
        ></LeavePopup>
      </div>
      <div className="pl-[20rem] xl:pl-[0rem]">
        <div className={`${header}`}>{children}</div>
      </div>
    </div>
  );
};
