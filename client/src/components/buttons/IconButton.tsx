import React from "react";
import { ButtonGeneric } from "./ButtonGeneric";
import { GenericIcon } from "../icons/GenericIcon";

interface IconProps {
  style:
    | "arrowleft"
    | "arrowright"
    | "arrowup"
    | "arrowdown"
    | "triangleleft"
    | "triangleright"
    | "x"
    | "bars"
    | "info"
    | "profile"
    | "leaderboard"
    | "notes"
    | "cog"
    | "bin"
    | "copy"
    | "tick";
  buttonColour:
    | "ronchi"
    | "blue"
    | "red"
    | "alto"
    | "redpink"
    | "pink"
    | "gray";
  iconColour: "black" | "stroked";
  size: "small" | "medium" | "large";
  isDisabled?: boolean;
  onClick?: () => void;
}

export const IconButton = ({
  style,
  buttonColour,
  iconColour,
  size,
  isDisabled,
  onClick,
}: IconProps) => {
  const buttonSize = {
    small: "square",
    medium: "squaremedium",
  };

  const buttonIconSize = {
    small: "lg",
    medium: "xl",
  };

  return (
    <ButtonGeneric
      size={buttonSize[size]}
      color={buttonColour}
      isDisabled={isDisabled}
      onClick={onClick}
    >
      <GenericIcon
        size={buttonIconSize[size]}
        style={style}
        colour={iconColour}
      />
    </ButtonGeneric>
  );
};
