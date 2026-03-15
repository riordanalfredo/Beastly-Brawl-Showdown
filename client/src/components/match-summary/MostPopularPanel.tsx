import React from "react";
import { MostChosenMonsterResult } from "/types/other/gameSessionData";
import "./styles.css";

interface MostPopularPanelProps {
  popularMonster: MostChosenMonsterResult;
}

const MostPopularPanel: React.FC<MostPopularPanelProps> = ({
  popularMonster,
}) => {
  const formattedName = popularMonster.monster!.id;
  const imageSrc =
    "https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    formattedName +
    ".png";
  //console.log("image src = ",imageSrc)

  return (
    <div
      style={{
        backgroundColor: "#FFE8B1",
        borderRadius: "1.5rem",
        border: "4px solid #403245",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        padding: "0.75rem 1.5rem",
        width: "260px",
        margin: "1rem auto",
      }}
    >
      {/* Most Popular Title */}
      <h3
        style={{
          fontSize: "1.5rem",
          fontFamily: "Jua, sans-serif",
          fontWeight: "100",
          color: "#FFFFFF",
          WebkitTextStroke: "1px black",
          textAlign: "center",
          margin: "0 0 0.75rem 0",
          textTransform: "uppercase",
          textDecoration: "underline",
          textUnderlineOffset: "6px",
          textDecorationThickness: "3px",
        }}
      >
        MOST POPULAR
      </h3>

      {/* Image and Monster Info Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Monster Image on Left */}
        <img
          src={imageSrc}
          alt={formattedName}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain",
            flexShrink: 0, // Prevent image from shrinking
          }}
        />

        {/* Monster Info on Right */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          {/* Monster Name */}
          <div
            style={{
              fontSize: "1.4rem",
              fontFamily: "Jua, sans-serif",
              fontWeight: "100",
              color: "#000000",
              marginBottom: "0.25rem",
              textTransform: "uppercase",
              lineHeight: "1.2",
            }}
          >
            {popularMonster.monster!.name}
          </div>

          {/* Pick Rate */}
          <div
            style={{
              fontSize: "1.2rem",
              fontFamily: "Jua, sans-serif",
              fontWeight: "100",
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            PICK {popularMonster.percentagePick}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPopularPanel;
