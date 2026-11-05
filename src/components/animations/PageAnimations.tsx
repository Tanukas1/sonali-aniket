"use client";

import React, { useState, useEffect, useRef } from "react";

interface SparklePoint {
  id: number;
  x: number;
  y: number;
}

export default function PageAnimations() {
  const [sparkles, setSparkles] = useState<SparklePoint[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lastScrollTime = 0;
    let timer: number | undefined;

    const addSparkle = (x: number, y: number) => {
      const item = { id: nextId.current++, x, y };
      setSparkles((prev) => [...prev.slice(-5), item]);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setSparkles([]), 1500);
    };

    const handlePointerDown = (e: PointerEvent) => {
      addSparkle(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      if (Date.now() - lastScrollTime < 280) return;
      lastScrollTime = Date.now();
      addSparkle(
        window.innerWidth * (0.2 + Math.random() * 0.6),
        window.innerHeight * (0.4 + Math.random() * 0.45)
      );
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="invitation-effects" aria-hidden="true">
      <div className="falling-petals">
        {Array.from({ length: 12 }, (_, t) => (
          <img
            key={t}
            src="/images/decorative/rose-petal.png"
            alt=""
            width={816}
            height={816}
            loading="lazy"
            style={{ "--seed": t } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="falling-sparkles">
        {Array.from({ length: 28 }, (_, t) => (
          <i key={t} style={{ "--seed": t } as React.CSSProperties} />
        ))}
      </div>
      {sparkles.map((point) => (
        <div key={point.id} className="touch-sparkles" style={{ left: point.x, top: point.y }}>
          {Array.from({ length: 12 }, (_, t) => (
            <i key={t} style={{ "--piece": t } as React.CSSProperties} />
          ))}
        </div>
      ))}
    </div>
  );
}

