"use client";

import React, { useState, useEffect, useRef } from "react";

interface ScratchHeartProps {
  value: string;
  index: number;
}

export function ScratchHeart({ value, index }: ScratchHeartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const scratchCount = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerReveal = () => {
    if (!revealed) {
      setRevealed(true);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setShowConfetti(true);
        window.setTimeout(() => setShowConfetti(false), 2400);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    const path = new Path2D();
    path.moveTo(w / 2, h * 0.9);
    path.bezierCurveTo(w * 0.35, h * 0.76, w * 0.04, h * 0.53, w * 0.06, h * 0.28);
    path.bezierCurveTo(w * 0.08, h * 0.02, w * 0.36, h * 0.01, w / 2, h * 0.22);
    path.bezierCurveTo(w * 0.64, h * 0.01, w * 0.92, h * 0.02, w * 0.94, h * 0.28);
    path.bezierCurveTo(w * 0.96, h * 0.53, w * 0.65, h * 0.76, w / 2, h * 0.9);
    path.closePath();
    ctx.clip(path);

    const style = getComputedStyle(document.documentElement);
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, style.getPropertyValue("--scratch-gold-start").trim() || "#d4af37");
    grad.addColorStop(0.5, style.getPropertyValue("--scratch-gold-middle").trim() || "#f3e5ab");
    grad.addColorStop(1, style.getPropertyValue("--scratch-gold-end").trim() || "#aa771c");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = style.getPropertyValue("--wine").trim() || "#581825";
    ctx.font = `italic ${Math.max(13, w * 0.18)}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.fillText("scratch", w / 2, h * 0.53);
  }, [revealed]);

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc((e.clientX - rect.left) * scale, (e.clientY - rect.top) * scale, 12 * scale, 0, Math.PI * 2);
    ctx.fill();
    scratchCount.current += 1;
  };

  const labels = ["Day", "Month", "Year"];
  const lowerLabels = ["day", "month", "year"];

  return (
    <div
      className="scratch-heart"
      aria-label={`${labels[index]}: ${revealed ? value : "scratch to reveal"}`}
    >
      <svg viewBox="0 0 100 100" className="heart-outline" aria-hidden="true">
        <path d="M50 90 C35 76 4 53 6 28 C8 2 36 1 50 22 C64 1 92 2 94 28 C96 53 65 76 50 90Z" />
      </svg>
      <span className="heart-value">{value}</span>
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="heart-canvas"
          onPointerDown={(e) => {
            isDrawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={() => {
            isDrawing.current = false;
            if (scratchCount.current >= 3) {
              triggerReveal();
            }
          }}
          onPointerCancel={() => {
            isDrawing.current = false;
          }}
        />
      )}
      {showConfetti && (
        <div className="heart-confetti" aria-hidden="true">
          {Array.from({ length: 54 }, (_, i) => (
            <i key={i} style={{ "--piece": i } as React.CSSProperties} />
          ))}
        </div>
      )}
      <button
        type="button"
        className="heart-reveal text-primary underline-offset-4 hover:underline"
        onClick={triggerReveal}
        aria-label={`Reveal ${lowerLabels[index]}`}
        title={`Reveal ${lowerLabels[index]}`}
      />
    </div>
  );
}

export default function ScratchDate() {
  const scratchDates = ["09", "DEC", "2026"];

  return (
    <div
      className="art-scratch reveal-on-scroll"
      aria-label="Scratch the three hearts to reveal the wedding date"
    >
      {scratchDates.map((val, idx) => (
        <ScratchHeart key={val} value={val} index={idx} />
      ))}
    </div>
  );
}

