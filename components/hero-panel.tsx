"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

type HeroPanelProps = {
  children: ReactNode;
  className?: string;
};

export function HeroPanel({ children, className = "" }: HeroPanelProps) {
  const [style, setStyle] = useState<CSSProperties>({
    transform: "perspective(1400px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)",
  });

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;
    const glowX = `${x * 100}%`;
    const glowY = `${y * 100}%`;

    setStyle({
      transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -4px, 0)`,
      ["--spot-x" as string]: glowX,
      ["--spot-y" as string]: glowY,
    });
  }

  function handleLeave() {
    setStyle({
      transform: "perspective(1400px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)",
      ["--spot-x" as string]: "50%",
      ["--spot-y" as string]: "50%",
    });
  }

  return (
    <div
      className={`hero-panel interactive-panel ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
    >
      {children}
    </div>
  );
}
