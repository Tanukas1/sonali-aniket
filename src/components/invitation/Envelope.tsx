"use client";

import React, { useRef, useState, useEffect } from "react";
import { Volume2Icon, VolumeXIcon } from "@/components/ui/Icons";

interface EnvelopeProps {
  stage: "cover" | "playing" | "invitation";
  setStage: (stage: "cover" | "playing" | "invitation") => void;
  isFading: boolean;
  setIsFading: (fading: boolean) => void;
}

export default function Envelope({
  stage,
  setStage,
  isFading,
  setIsFading,
}: EnvelopeProps) {
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stage !== "playing" || hasStartedPlaying) return;
    const timeout = window.setTimeout(() => setStage("invitation"), 3500);
    return () => window.clearTimeout(timeout);
  }, [stage, hasStartedPlaying, setStage]);

  const handleSealClick = async () => {
    const video = videoRef.current;
    if (!video || stage !== "cover") return;
    const isApple = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    video.muted = isApple;
    setIsMuted(isApple);
    const playPromise = video.play();
    setStage("playing");
    try {
      await playPromise;
    } catch {
      video.muted = true;
      setIsMuted(true);
      try {
        await video.play();
      } catch {
        setStage("invitation");
      }
    }
  };

  return (
    <>
      <section
        className={`opening-stage ${stage === "invitation" || (hasStartedPlaying && stage !== "cover") ? "opening-stage-hidden" : ""}`}
        aria-label="Open the wedding invitation"
      >
        <img
          className="cover-image"
          src="/images/envelope/seal-cover.webp"
          alt="Burgundy wedding envelope with a wax seal"
        />
        {stage === "cover" && (
          <>
            <button
              type="button"
              className="seal-hit rounded-full bg-transparent shadow-none focus-visible:ring-primary cursor-pointer"
              onClick={handleSealClick}
              aria-label="Tap on seal to open invitation"
              title="Open invitation"
            />
            <div className="cover-instruction" aria-hidden="true">
              <span>TAP ON SEAL</span>
              <span className="instruction-rule" /> <span>TO OPEN THE INVITATION</span>
            </div>
          </>
        )}
      </section>

      <video
        ref={videoRef}
        className={`opening-video ${hasStartedPlaying && stage === "playing" && !isFading ? "video-visible" : ""} ${isFading ? "video-fading" : ""}`}
        poster="/images/envelope/seal-cover.webp"
        playsInline
        preload="auto"
        onError={() => {
          if (stage === "playing") setStage("invitation");
        }}
        onPlaying={() => setHasStartedPlaying(true)}
        onTimeUpdate={(e) => {
          const t = e.currentTarget;
          if (t.duration && t.currentTime >= t.duration - 2 && !isFading) {
            setIsFading(true);
          }
        }}
        onEnded={() => setStage("invitation")}
        aria-hidden="true"
      >
        <source src="/images/envelope/opening-mobile.mp4" type="video/mp4" media="(max-width: 600px)" />
        <source src="/images/envelope/opening-mobile.mp4" type="video/webm" />
      </video>

      {stage === "playing" && (
        <button
          type="button"
          className="sound-toggle rounded-full border border-primary-foreground/50 bg-primary/40 text-primary-foreground hover:bg-primary/60 inline-flex items-center justify-center cursor-pointer transition-colors"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          onClick={() => {
            const v = videoRef.current;
            if (v) {
              v.muted = !v.muted;
              setIsMuted(v.muted);
            }
          }}
        >
          {isMuted ? <VolumeXIcon size={18} /> : <Volume2Icon size={18} />}
        </button>
      )}
    </>
  );
}

