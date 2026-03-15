import React, { ReactNode } from "react";
import { getSelectedBackgroundTheme } from "../../selectedBackgroundTheme";

interface PageProps {
  children?: ReactNode;
}

export const BackgroundThemePage = ({ children }: PageProps) => {
  var backgroundLocation = getSelectedBackgroundTheme().toUpperCase();
  var backgroundString =
    "url('https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/background/" +
    backgroundLocation +
    ".jpg')";

  return (
    <div
      className="lg:p-[1.25rem] sm:p-[3rem] h-screen w-min-screen overflow-hidden flex flex-col justify-around"
      style={{
        backgroundImage: backgroundString,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white/60 h-full outline-blackCurrant lg:outline-[0.25rem] sm:outline-[0.75rem] rounded-2xl flex flex-col justify-around items-center">
        {children}
      </div>
    </div>
  );
};
