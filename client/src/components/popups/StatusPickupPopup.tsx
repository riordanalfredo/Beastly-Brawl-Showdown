import React, { useEffect, useState } from "react";
import { Status } from "/server/src/model/game/status/status";
import { PopupClean } from "./PopupClean";
import { OutlineText } from "../texts/OutlineText";
import { ButtonGeneric } from "../buttons/ButtonGeneric";

export interface StatusPickupPopupProps {
  messages: string[];
  status: Status;
  onComplete: () => void; // Called when everything is done
}

export const StatusPickupPopup = ({
  messages,
  status,
  onComplete,
}: StatusPickupPopupProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showingStatus, setShowingStatus] = useState(false);

  useEffect(() => {
    setMessageIndex(0);
    setShowingStatus(false);
  }, [messages, status]);

  const isAtLastMessage = messageIndex >= messages.length - 1;
  const hasMessages = messages.length > 0;

  const handleNext = () => {
    if (!hasMessages) {
      // No messages, go straight to status
      setShowingStatus(true);
    } else if (!isAtLastMessage) {
      // More messages to show
      setMessageIndex(messageIndex + 1);
    } else {
      // Done with messages, show status
      setShowingStatus(true);
    }
  };

  const handleStatusComplete = () => {
    onComplete();
  };

  const path = `https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/status/${status.name
    .replace(/\s+/g, "_")
    .toUpperCase()}.png`;

  if (showingStatus) {
    // Show status popup
    return (
      <PopupClean>
        <div className="items-center flex-col inline-block inline-flex outline-offset-0 relative gap-y-[1rem] xl:gap-y-[0.5rem]">
          <OutlineText size="large">{status.name.toUpperCase()}</OutlineText>

          <div className="bg-pictonBlue px-[3rem] py-[3rem] flex xl:px-[1rem] xl:py-[1rem] mt-4 xl:mt-[0.5rem] w-[30rem] xl:w-[10rem] h-[30rem] xl:h-[10rem] items-center outline-blackCurrant rounded-[3rem] outline-[0.3rem]">
            <img src={path} alt={status.name} />
          </div>

          <OutlineText size="choice-text">{status.description}</OutlineText>

          <div className="bg-[#D9D9D9] mb-4 outline-blackCurrant rounded-[3rem] outline-[0.3rem] items-center justify-around px-[4rem] py-[0.7rem] xl:py-[0.2rem] xl:px-[3rem]">
            <OutlineText size="medium">
              Last {status.countDown} turn(s)
            </OutlineText>
          </div>

          <ButtonGeneric
            color="blue"
            size="adventure"
            onClick={handleStatusComplete}
          >
            <OutlineText size="choice-text">NEXT</OutlineText>
          </ButtonGeneric>
        </div>
      </PopupClean>
    );
  }

  // Show messages popup
  return (
    <PopupClean>
      <div className="items-center flex-col inline-block inline-flex outline-offset-0 relative gap-y-6">
        <OutlineText size="choice-text">
          {hasMessages ? messages[messageIndex] : ""}
        </OutlineText>

        <div className="flex mt-4">
          <ButtonGeneric color="blue" size="adventure" onClick={handleNext}>
            <OutlineText size="choice-text">NEXT</OutlineText>
          </ButtonGeneric>
        </div>
      </div>
    </PopupClean>
  );
};
