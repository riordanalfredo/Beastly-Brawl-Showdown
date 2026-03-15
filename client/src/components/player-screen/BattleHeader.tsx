import React from "react";
import { BattleHealthBar } from "../bars/BattleHealthBar";
import { BattleState } from "../../../../types/composite/battleState";
import { OutlineTextBP } from "../texts/OutlineTextBP";
import { GameSessionStateMetaData } from "../../../../types/composite/gameSessionState";

interface BattleHeaderProps {
  battleState: BattleState;
  timer?: number;
  metadata?: GameSessionStateMetaData;
}

export const BattleHeader: React.FC<BattleHeaderProps> = ({
  battleState,
  timer,
  metadata,
}) => {
  const [hasTimer, setHasTimer] = React.useState<boolean>(false);

  const player1State = battleState.yourPlayer;
  const player1Id = player1State.id;

  const player2State = battleState.opponentPlayer;
  const player2Id = player2State.id;

  let p1Score;
  let p2Score;
  // if (metadata) {
  //   console.log("[METADATA]:", metadata.playerScore);
  //   if (metadata.playerScore) {
  //     p1Score = metadata.playerScore[player1Id].points;
  //     p2Score = metadata.playerScore[player2Id].points;
  //   }
  // }

  return (
    <div
      className="flex flex-row 
      outline-blackCurrant outline-[0.25rem] rounded-b-3xl md:rounded-b-4xl
      bg-peach justify-between
      sm:outline-[0.125rem] md:outline-[0.2rem] lg:outline-[0.2rem] xl:outline-[0.25rem] 2xl:outline-[0.3rem]
      sm:w-[35rem] md:w-[55rem] lg:w-[56rem] xl:w-[70rem] 2xl:w-[84rem] 
      sm:h-[5rem] md:h-[12rem] lg:h-[8rem] xl:h-[10rem] 2x:h-[12rem]"
    >
      <div
        className="flex flex-col h-full w-11/24 items-start text-left 
      sm:px-[1rem] md:px-[1.2rem] lg:px-[1.6rem] xl:px-[2rem] 2xl:px-[2.4rem] 
      sm:py-[0.5rem] md:py-[0.6rem] lg:py-[0.8rem] xl:py-[1rem] 2xl:py-[1.2rem]"
      >
        <BattleHealthBar
          currentHealth={battleState.yourPlayer.currentHealth}
          maxHealth={battleState.yourPlayerMonster.maxHealth}
        />
        <div className="flex flex-row ">
          <div className="size-[30px]" />
          {battleState.yourPlayer.statuses.map((status) => (
            <img
              className=" size-[30px] object-contain rounded-md block"
              src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/status/${status.name.toUpperCase().replace(/\s+/g, "_")}.png`}
              alt={`${status.name.toUpperCase()} image`}
            />
          ))}
        </div>
        <div className="flex flex-row w-full justify-between">
          <div
            className="flex flex-col h-1/2 
          sm:space-y-[0.125rem] md:space-y-[0.15rem] lg:space-y-[0.2rem] xl:space-y-[0.25rem] 2xl:space-y-[0.3rem] 
          sm:pb-[0.25rem] md:pb-[0.3rem] lg:pb-[0.4rem] xl:pb-[0.5rem] 2xl:pb-[0.6rem]"
          >
            <div className="leading-none">
              <OutlineTextBP size="small">
                {battleState.yourPlayerMonster.name.toUpperCase()}
              </OutlineTextBP>
            </div>

            <div className="leading-none">
              <OutlineTextBP size="medium">
                {battleState.yourPlayer.name.toUpperCase()}
              </OutlineTextBP>
            </div>
          </div>
          {p1Score == null ? (
            <div />
          ) : (
            <div
              className={`
              sm:w-[1rem] md:w-[5rem] lg:w-[2rem] xl:w-[2.5rem] 2xl:w-[3rem]
              sm:h-[1rem] md:h-[5rem] lg:h-[2rem] xl:h-[2.5rem] 2xl:h-[3rem]
              rounded-full
              bg-[#FFE07C]
              sm:outline-[0.125rem] md:outline-[0.15rem] lg:outline-[0.2rem] xl:outline-[0.25rem] 2xl:outline-[0.3rem]
              outline-blackCurrant
              text-white
              flex
              items-center
              justify-center
              overflow-hidden
            `}
            >
              <OutlineTextBP size="small">{p1Score}</OutlineTextBP>
            </div>
          )}
        </div>
      </div>

      {typeof timer === "number" && (
        <div
          className="flex flex-col w-1/12 h-full items-center justify-around font-[Jua]
      sm:p-[0.5rem] md:p-[0.6rem] lg:p-[0.8rem] xl:p-[1rem] 2xl:p-[1.2rem]"
        >
          <p>Time: </p>
          <OutlineTextBP size="extraLarge">{timer}</OutlineTextBP>
        </div>
      )}

      <div
        className="flex flex-col w-11/24 items-end text-right 
      sm:px-[1rem] md:px-[1.2rem] lg:px-[1.6rem] xl:px-[2rem] 2xl:px-[2.4rem] 
      sm:py-[0.5rem] md:py-[0.6rem] lg:py-[0.8rem] xl:py-[1rem] 2xl:py-[1.2rem]"
      >
        <BattleHealthBar
          currentHealth={battleState.opponentPlayer.currentHealth}
          maxHealth={battleState.opponentPlayerMonster.maxHealth}
        />
        <div className="flex flex-row">
          <div className="size-[30px]" />
          {battleState.opponentPlayer.statuses.map((status) => (
            <img
              className=" size-[30px] object-contain rounded-md block"
              src={`https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/status/${status.name.toUpperCase()}.png`}
              alt={`${status.name.toUpperCase()} image`}
            />
          ))}
        </div>
        <div className="flex flex-row w-full justify-between">
          {p2Score == null ? (
            <div />
          ) : (
            <div
              className={`
              sm:w-[1rem] md:w-[5rem] lg:w-[2rem] xl:w-[2.5rem] 2xl:w-[3rem]
              sm:h-[1rem] md:h-[5rem] lg:h-[2rem] xl:h-[2.5rem] 2xl:h-[3rem]
              rounded-full
              bg-[#FFE07C]
              sm:outline-[0.125rem] md:outline-[0.15rem] lg:outline-[0.2rem] xl:outline-[0.25rem] 2xl:outline-[0.3rem]
              outline-blackCurrant
              text-white
              flex
              items-center
              justify-center
              overflow-hidden
                `}
            >
              <OutlineTextBP size="small">{p2Score}</OutlineTextBP>
            </div>
          )}

          <div
            className="flex flex-col h-1/2 
          sm:space-y-[0.125rem] md:space-y-[0.15rem] lg:space-y-[0.2rem] xl:space-y-[0.25rem] 2xl:space-y-[0.3rem] 
          sm:pb-[0.25rem] md:pb-[0.3rem] lg:pb-[0.4rem] xl:pb-[0.5rem] 2xl:pb-[0.6rem]"
          >
            <div className="leading-none">
              <OutlineTextBP size="small">
                {battleState.opponentPlayerMonster.name.toUpperCase()}
              </OutlineTextBP>
            </div>

            <div className="leading-none">
              <OutlineTextBP size="medium">
                {battleState.opponentPlayer.name.toUpperCase()}
              </OutlineTextBP>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleHeader;
