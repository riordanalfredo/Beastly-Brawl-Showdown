import React from "react";

interface FooterProps {
  children: React.ReactNode;
}

export const GenericFooter = ({ children }: FooterProps) => {
  const footer = `
        bg-goldenRod
        mx-auto
        font-[Jua]
        w-[95%]
        xl:w-[60%]
        h-normalPhoneHeight
        rounded-tl-[5rem]
        rounded-tr-[5rem]
        border-consistent
        border-blackCurrant
        border-b-0
        flex 
        flex-col 
        items-center 
        justify-center
        text-wrap
        pl-[1%]
        pr-[1%]
        xl:pt-[2%]
        pt-[4%]
        pb-10
        inset-x-0
        fixed
        bottom-0
        `;

  return <div className={`${footer}`}>{children}</div>;
};
