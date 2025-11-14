import { useEffect } from "react";
import React, { useState } from "react";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import VALID_WIKI_PAGES from "../../types/WikiPageIdentifier";
import { OutlineText } from "../../components/texts/OutlineText";
import { BaseCard } from "../../components/cards/BaseCard";
import { wikitopage } from "../../types/WikiPageIdentifier";
import { WikiHeader } from "../../components/wiki/WikiHeader";

export const WikiIndex = () => {
  const getTitle = (name: string): string => {
    return wikitopage.find((p) => p.name === name)?.title || name;
  };

  return (
    <BlankPage>
      <div className="flex flex-col h-full w-full space-y-[1rem] overflow-y-scroll justify-start items-center m-[2rem]">
        <WikiHeader title="Rules"></WikiHeader>

        <div
          className={`flex flex-col xl:h-[80rem] md:h-[35rem] md:w-[50rem] xl:w-[90vw] bg-peach justify-start items-center whitespace-pre-line p-[1rem] space-y-[1rem] border-[0.4rem] border-blackCurrant rounded-xl`}
        >
          <div className="flex flex-col h-full w-full justify-start items-start p-[2rem] space-y-[2rem]">
            {VALID_WIKI_PAGES.map((page) => (
              <li key={page}>
                <a
                  className="font-jua text-blue-600 text-[2rem] underline"
                  href={`/wiki/${page}`}
                >
                  {getTitle(page)}
                </a>
              </li>
            ))}
          </div>
        </div>
      </div>
    </BlankPage>
  );
};
