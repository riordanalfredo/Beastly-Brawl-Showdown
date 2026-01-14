import { QRCodeSVG } from "qrcode.react";
import { IconButton } from "../buttons/IconButton";
import { OutlineText } from "../texts/OutlineText";
import { PopupAdventure } from "./PopupAdventure";
import { BaseCard } from "../cards/BaseCard";
import { BlackText } from "../texts/BlackText";
import { Meteor } from "meteor/meteor";
import React from "react";
import { PopupFull } from "./PopUpFull";

interface DuelLobbyInfoPopupProps {
  setShowingInvitePanel: (arg0: Boolean) => void;
  gameSessionId: string;
}

export const DuelLobbyInfoPopup = ({
  setShowingInvitePanel,
  gameSessionId,
}: DuelLobbyInfoPopupProps) => {
  return (
    <PopupFull>
      <div className="relative top-2 left-2 h-min w-min">
        <IconButton
          size="small"
          style="x"
          buttonColour="red"
          iconColour="black"
          onClick={() => setShowingInvitePanel(false)}
        />
      </div>
      <div className="flex flex-col justify-evenly h-full items-center">
        <div className="flex-col">
          <OutlineText size="choice-text">{`Room Code:`}</OutlineText>
          <OutlineText size="choice-text">{`${gameSessionId}`}</OutlineText>
        </div>
        <div className="space-y-5">
          <QRCodeSVG
            value={`${Meteor.settings.public.SERVER_URLS[0]}/join/${gameSessionId}`}
            size={300}
            bgColor="#FFFFFF"
            marginSize={2}
          />
          <div className="flex flex-row space-x-2">
            <BaseCard color="alto">
              <BlackText size="tiny">
                <p className="truncate text-ellipsis w-64">
                  {`${Meteor.settings.public.SERVER_URLS[0]}/join/${gameSessionId}`}
                </p>
              </BlackText>
            </BaseCard>
            <IconButton
              style="copy"
              buttonColour="alto"
              iconColour="black"
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${Meteor.settings.public.SERVER_URLS[0]}/join/${gameSessionId}`
                );
              }}
            />
          </div>
        </div>
      </div>
    </PopupFull>
  );
};
