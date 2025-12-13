import React, { ReactNode } from "react";
import { OutlineText } from "../../components/texts/OutlineText";

interface CardWithHeaderProps {
  headerText: string;
  headerColor: "ronchi";
  cardColor: "opaqueWhite";
  children?: ReactNode;
}

export const CardWithHeader = ({ headerText, headerColor, cardColor, children }: CardWithHeaderProps) => {
  const colorToDisplay = {
    ronchi: "bg-ronchi",
    opaqueWhite: "bg-white/60",
  };

  return (
    <>
      <div className={`${colorToDisplay[headerColor]} border-consistent border-blackCurrant text-center rounded-t-2xl px-[2rem] shadow-md w-[90%] lg:w-[60%]`}>
        <OutlineText size="extraLarge">{headerText}</OutlineText>
      </div>
      <div className={`${colorToDisplay[cardColor]} border-consistent border-blackCurrant rounded-2xl shadow-lg px-[2rem] lg:px-[3rem] py-[2rem] w-[75%] lg:w-[75%] flex flex-col items-center justify-center -mt-[0.2rem]`}>
        {children}
      </div>
    </>
  );
};
