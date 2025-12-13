import { OutlineText } from "../texts/OutlineText";
import React, { ReactNode, useEffect, useState } from "react";
import { MonsterState } from "/types/single/monsterState";
import { IconButton } from "../buttons/IconButton";
import { BlackText } from "../texts/BlackText";

// type for dialog
type ScriptProps = {
  monster?: MonsterState;
  lines: string[];
  onEnd: () => void; //call when last line is reached
  onAdvance?: (nextIndex: number) => void; //can be used to change image or add stuff every click
};

// type for buttons
type StaticProps = {
  monster?: MonsterState; //Might be useful in future
  children: ReactNode;
};

type DialogueBoxProps = ScriptProps | StaticProps;

export function DialogueBox(props: DialogueBoxProps) {
  const { monster } = props;

  const isScript = "lines" in props;

  //Check if input is script or button to show according name (monster name/your self)
  const titleText =
    monster && isScript
      ? (props as ScriptProps).monster?.name
      : monster
      ? "Your self"
      : "";

  const dialogueBox = `
        bg-peach
        w-[95%]
        xl:w-[60%]
        rounded-tl-[5rem]
        rounded-tr-[5rem]
        mx-auto
        border-blackCurrant
        border-b-0
        outline-solid
        bottom-0
        flex 
        place-items-center 
        justify-center
        pl-[3%]
        pr-[3%]
        xl:pt-[2%]
        pt-[4%]
        pb-10
        fixed
        xl:h-[35%]
        h-[30%]
        text-center
        `;

  const name = `
        bg-ronchi
        rounded-tl-[2rem]
        rounded-tr-[2rem]
        inline-flex
        border-blackCurrant
        border-b-0
        border-consistent
        bottom-0
        flex 
        xl:px-[1rem]
        px-[2rem]
        relative
        xl:h-[43%]
        h-[37%]
        outline-offset-0
        `;

  return (
    <div className="inset-x-0 flex justify-center fixed bottom-0 h-[36%] xl:h-[41%]">
      <div className="relative w-[95%] xl:w-[60%]">
        {/* Only render name bar if monster exists */}
        {monster && (
          <div className="pl-[5rem]">
            <div className={`${name}`}>
              <div className="top-0">
                <OutlineText size="large">{titleText}</OutlineText>
              </div>
            </div>
          </div>
        )}
        <div className={`${dialogueBox}`}>
          {isScript ? (
            <ScriptContent {...(props as ScriptProps)} />
          ) : (
            <StaticContent {...(props as StaticProps)} />
          )}
        </div>
      </div>
    </div>
  );
}

function ScriptContent({ lines, onEnd, onAdvance }: ScriptProps) {
  const [i, setI] = useState(0);
  const atEnd = lines.length === 0 || i >= lines.length - 1;

  useEffect(() => setI(0), [lines]);

  //   Check if end of the conversation list
  const nextOrEnd = () => {
    if (lines.length === 0) return onEnd();
    if (!atEnd) {
      const ni = i + 1;
      setI(ni);
      onAdvance?.(ni);
    } else {
      onEnd();
    }
  };

  return (
    <>
      {" "}
      <div className="flex-col item-center relative pt-[5%] xl:pt-[5%] w-full h-full">
        <div className="leading-tight">
          <BlackText size="choice-text">{lines[i] ?? ""}</BlackText>
        </div>

        <div className=" xl:pl-[95%] absolute pl-[90%] bottom-0">
          <IconButton
            buttonColour="blue"
            style="arrowright"
            iconColour="black"
            size="small"
            onClick={nextOrEnd}
          ></IconButton>
        </div>
      </div>
    </>
  );
}

function StaticContent({ children }: StaticProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-6 flex-wrap">
      {children}
    </div>
  );
}
