import React from "react";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import VALID_WIKI_PAGES from "../../types/WikiPageIdentifier";
import { wikitopage } from "../../types/WikiPageIdentifier";
import { WikiHeader } from "../../components/wiki/WikiHeader";

export const WikiIndex = () => {
  const getTitle = (name: string): string => {
    return wikitopage.find((p) => p.name === name)?.title || name;
  };

  const getIcon = (name: string): string => {
    return wikitopage.find((p) => p.name === name)?.icon || "📖";
  };

  return (
    <BlankPage>
      <div className="flex flex-col h-full w-full overflow-y-auto justify-start items-center px-4 py-6 sm:p-8">
        <div className="bg-ronchi p-1 sm:p-2 border-t-[0.3rem] border-l-[0.3rem] border-r-[0.3rem] sm:border-t-[0.4rem] sm:border-l-[0.4rem] sm:border-r-[0.4rem] border-blackCurrant rounded-t-3xl min-w-[40vw]">
          <h2 className="font-jua text-outline text-center text-2xl sm:text-2xl md:text-3xl">
            RULES
          </h2>
        </div>
        <div className="flex flex-col w-full max-w-[90vw] md:max-w-[50rem] xl:max-w-[90rem] border-[0.3rem] sm:border-[0.4rem] border-blackCurrant rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col bg-peach justify-start items-center whitespace-pre-line p-4 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
            <p className="font-jua text-[#6b5b95] text-center text-base sm:text-lg md:text-xl mb-2">
              Click any topics below to learn about Beastly Brawl!
            </p>

            <ul className="flex flex-col w-full justify-start items-stretch space-y-3 sm:space-y-4 list-none">
              {VALID_WIKI_PAGES.map((page) => (
                <li key={page} className="w-full flex justify-center">
                  <a
                    className="flex items-center gap-3 sm:gap-4 w-full font-jua text-outline text-2xl sm:text-2xl md:text-3xl transition-all duration-200 py-3 px-2 sm:py-4 sm:px-3 md:py-5 md:px-4 bg-pictonBlue hover:bg-[#6bb5f0] rounded-xl border-[3px] border-blackCurrant shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                    style={{ maxWidth: "60vw" }}
                    href={`/wiki/${page}`}
                  >
                    <span className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">
                      {getIcon(page)}
                    </span>
                    <span className="flex-1">{getTitle(page)}</span>
                    <span className="text-xl sm:text-2xl md:text-3xl text-merino opacity-80">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BlankPage>
  );
};
