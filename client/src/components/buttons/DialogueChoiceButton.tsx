import React, { ReactNode } from "react";

export interface DialogueChoiceButtonProp {
  onClick?: () => void | void;
  children?: ReactNode;
  isDisabled?: boolean; // Add this for consistency
}

export const DialogueChoiceButton = ({
  children,
  onClick,
  isDisabled = false,
}: DialogueChoiceButtonProp) => {
  // const baseButton = `
  //   bg-pictonBlue
  //   outline-blackCurrant
  //   inline-flex
  //   items-center
  //   justify-around
  //   text-merino
  //   outline-[0.3rem]
  //   outline-offset-0
  //   font-[Jua]
  //   rounded-[1rem]
  //   px-[1rem]
  //   py-[1rem]
  //   xl:py-[0.5rem]
  //   xl:px-[0.5rem]
  // `;

  const baseButton = `
    bg-pictonBlue
    outline-blackCurrant
    inline-flex
    items-center
    justify-around
    text-merino
    outline-offset-0
    font-[Jua]
    rounded-[1rem]
    px-[1rem]
    py-[1rem]
    xl:py-[0.5rem]
    xl:px-[0.5rem]
  `;

  const enabledButton = `
    hover:brightness-85
    active:outline-blackCurrant
    active:ring-[0.3125rem]
    active:ring-blackCurrant
    transition-all
    duration-150
    cursor-pointer
  `;

  const disabledButton = `
    grayscale
    cursor-not-allowed
    opacity-50
  `;

  return (
    <button
      disabled={isDisabled}
      className={`
        ${baseButton}
        ${isDisabled ? disabledButton : enabledButton}
        outline-consistent
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
