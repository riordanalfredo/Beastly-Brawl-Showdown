import React, { ReactElement, ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  color: "blue" | "purple" | "lightYellow" | "green" | "red" | "cream";
}

export const GenericHeader = ({ children, color }: HeaderProps) => {
  const colorToDisplay = {
    blue: "bg-[#55A9ED]",
    purple: "bg-heliotrope",
    lightYellow: "bg-ronchi",
    green: "bg-conifer",
    red: "bg-burntSienna",
    cream: "bg-peach",
  };

  const header = `
        ${colorToDisplay[color]}
        mx-auto
        text-large
        text-white
        font-[Jua]
        min-w-[95%]
        xl:min-w-[60%]
        max-w-[95dvw]
        h-normalPhoneHeight
        rounded-bl-xl
        rounded-br-xl
        border-consistent
        border-blackCurrant
        w-fit
        border-t-0
        text-center
        text-wrap
        pl-[1%]
        pr-[1%]
        inset-x-0
        fixed
        top-0
        z-20`;

  return <div className={`${header}`}>{children}</div>;
};
