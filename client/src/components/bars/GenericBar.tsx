import React, { ReactNode } from "react";
import type {
  BarColour,
  BarCornerRadius,
  BarTextPosition,
  BarFillPercentage,
} from "../../types/BarTypes";

interface GenericBarProps {
  colour: BarColour;
  cornerRadius: BarCornerRadius;
  textPosition: BarTextPosition;
  fillPercentage: BarFillPercentage;
  children?: ReactNode;
}

const COLOR_MAP: Record<BarColour, string> = {
  green: "bg-conifer",
  yellow: "bg-schoolBusYellow",
  red: "bg-burntSienna",
  blue: "bg-pictonBlue",
  terracotta: "bg-terracotta",
};

const CORNER_RADIUS_MAP: Record<BarCornerRadius, string> = {
  light: "rounded-[0.5rem]",
  heavy: "rounded-[2rem]",
};

const TEXT_POSITION_MAP: Record<BarTextPosition, string> = {
  left: "justify-start items-center pl-[3%]",
  right: "justify-end items-center pr-[3%]",
  none: "",
};

const BASE_BACK_BAR_CLASSES = `
  absolute
  top-0
  left-0
  z-0
  w-full
  h-full
  sm:outline-[0.125rem] md:outline-[0.15rem] lg:outline-[0.2rem] xl:outline-[0.25rem] 2xl:outline-[0.3rem]
  outline-blackCurrant
  bg-alto
`;

const BASE_FRONT_BAR_CLASSES = `
  absolute
  top-0
  left-0
  z-2
  h-full
  sm:outline-[0.125rem] md:outline-[0.15rem] lg:outline-[0.2rem] xl:outline-[0.25rem] 2xl:outline-[0.3rem]
  flex
  items-center
  justify-center
  transition-[width]
  duration-300
  ease-in-out
`;

export const GenericBar = ({
  colour,
  cornerRadius,
  textPosition,
  fillPercentage,
  children,
}: GenericBarProps) => {
  const isBarEmpty = fillPercentage === 0;
  const widthClass = `w-[${fillPercentage}%]`;

  const frontBarClasses = `
    ${BASE_FRONT_BAR_CLASSES}
    ${CORNER_RADIUS_MAP[cornerRadius]}
    ${TEXT_POSITION_MAP[textPosition]}
    ${widthClass}
    ${isBarEmpty ? "outline-transparent" : `outline-blackCurrant ${COLOR_MAP[colour]}`}
  `;

  const backBarClasses = `
    ${BASE_BACK_BAR_CLASSES}
    ${CORNER_RADIUS_MAP[cornerRadius]}
  `;

  return (
    <div className="relative w-full h-12">
      <div className={backBarClasses} />
      <div className={frontBarClasses}>
        <div className="leading-none pt-[0.25rem]">{children}</div>
      </div>
    </div>
  );
};
