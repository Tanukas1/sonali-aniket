"use client";

import React, { useState, useEffect } from "react";

function getRemainingTime(): [number, number, number, number] {
  const diff = Math.max(0, new Date("2026-12-09T16:00:00+05:30").getTime() - Date.now());
  return [
    Math.floor(diff / (1000 * 60 * 60 * 24)),
    Math.floor((diff / (1000 * 60 * 60)) % 24),
    Math.floor((diff / (1000 * 60)) % 60),
    Math.floor((diff / 1000) % 60),
  ];
}

export default function Countdown() {
  const [time, setTime] = useState<[number, number, number, number]>([0, 0, 0, 0]);

  useEffect(() => {
    setTime(getRemainingTime());
    const interval = window.setInterval(() => setTime(getRemainingTime()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const labels = ["DAYS", "HOURS", "MINUTES", "SECONDS"];

  return (
    <div className="art-countdown reveal-on-scroll" aria-label="Countdown to the wedding">
      <h2>The wedding begins in</h2>
      <div className="countdown-grid">
        {time.map((unit, idx) => (
          <div key={idx} className="countdown-unit">
            <span className="countdown-number">{String(unit).padStart(2, "0")}</span>
            <span className="countdown-label">{labels[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

