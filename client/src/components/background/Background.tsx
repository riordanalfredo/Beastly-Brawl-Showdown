import React from "react";
import { getSelectedBackgroundTheme } from "../../selectedBackgroundTheme";

interface BackgroundProps {
  children?: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  var backgroundLocation = getSelectedBackgroundTheme().toUpperCase();
  var backgroundString =
    "url('https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/background/" +
    backgroundLocation +
    ".jpg')";

  return (
    <div
      style={{
        backgroundImage: backgroundString,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh", // Change from minHeight to height
        width: "100vw",
        position: "fixed", // Change from relative to fixed
        top: 0, // Add these
        left: 0, // Add these
        margin: 0, // Add these
        padding: 0, // Add these
      }}
    >
      {children}
    </div>
  );
};

export default Background;
