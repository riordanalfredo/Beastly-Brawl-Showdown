import React from "react";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import VALID_WIKI_PAGES from "../../types/WikiPageIdentifier";
import { wikitopage } from "../../types/WikiPageIdentifier";
import { WikiHeader } from "../../components/wiki/WikiHeader";

export const WikiIndex = () => {
  const getTitle = (name: string): string => {
    return wikitopage.find((p) => p.name === name)?.title || name;
  };

  return (
    <BlankPage>
      <div className="flex flex-col h-full w-full overflow-y-auto justify-start items-center px-4 py-6 sm:p-8">
        <div className="relative w-full max-w-[90vw] md:max-w-[50rem] xl:max-w-[90rem]">
          <WikiHeader title="Rules" />
        </div>

        <div className="flex flex-col w-full max-w-[90vw] md:max-w-[50rem] xl:max-w-[90rem] bg-peach justify-start items-center whitespace-pre-line p-4 sm:p-8 space-y-4 border-[0.3rem] sm:border-[0.4rem] border-blackCurrant rounded-xl shadow-lg">
          <ul className="flex flex-col w-full justify-start items-stretch space-y-3 sm:space-y-4 list-none">
            {VALID_WIKI_PAGES.map((page) => (
              <li key={page} className="w-full">
                <a
                  className="flex items-center gap-3 sm:gap-4 w-full font-jua text-blackCurrant hover:text-pictonBlue text-lg sm:text-2xl md:text-3xl transition-all duration-200 p-3 sm:p-4 bg-merino hover:bg-quillGray rounded-lg border-2 border-blackCurrant  shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                  href={`/wiki/${page}`}
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">
                    📖
                  </span>
                  <span className="flex-1">{getTitle(page)}</span>
                  <span className="text-sm sm:text-lg md:text-xl text-blackCurrant opacity-50">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-4 bg-ronchi bg-opacity-20 rounded-lg border-2 border-ronchi w-full">
            <p className="font-jua text-blackCurrant text-center text-sm sm:text-base md:text-lg">
              📚 Click any topic above to learn more about Beastly Brawl!
            </p>
          </div>
        </div>
      </div>
    </BlankPage>
  );
};
