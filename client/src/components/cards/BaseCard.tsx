import React, { ReactNode } from "react";

interface BaseCardProps {
  color: string;
  children?: ReactNode;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void; 
}

export const BaseCard = ({
  color,
  children,
  width,
  height,
  className,
  onClick, 
}: BaseCardProps) => {
  return (
    <div
      onClick={onClick} 
      className={`bg-${color} flex items-center justify-around border-consistent border-blackCurrant w-min h-min rounded-xl ${className}`}
      style={{
        width: width ? `${width}rem` : undefined,
        height: height ? `${height}rem` : undefined,
      }}
    >
      {children}
    </div>
  );
};
