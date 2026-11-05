"use client";

import React, { useState, useEffect } from "react";
import Envelope from "@/components/invitation/Envelope";
import InvitationCard from "@/components/invitation/InvitationCard";
import ScratchDate from "@/components/invitation/ScratchDate";
import Countdown from "@/components/sections/Countdown";
import Venue from "@/components/sections/Venue";
import Footer from "@/components/layout/Footer";
import PageAnimations from "@/components/animations/PageAnimations";

export default function Home() {
  const [stage, setStage] = useState<"cover" | "playing" | "invitation">("cover");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!isFading && stage !== "invitation") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("page-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px -5% 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isFading, stage]);

  return (
    <main>
      {/* 1. Envelope Opening Stage */}
      <Envelope
        stage={stage}
        setStage={setStage}
        isFading={isFading}
        setIsFading={setIsFading}
      />

      {/* 2. Invitation Pages (Visible after envelope opening) */}
      <div className={`invitation-pages ${isFading || stage === "invitation" ? "pages-visible" : ""}`}>
        {/* Page 1: Couple names, Ganesh shloka, save the date, scratch hearts, countdown, itinerary */}
        <section
          className="invitation-art-page first-art-page"
          aria-label="Wedding invitation, save the date, countdown, and schedule"
        >
          <InvitationCard
            src="/images/invitation/invitation-one-hq.webp"
            alt="Wedding invitation for Ritesh and Reet; save the date and schedule of events for 8 and 9 December"
            boundaries={[0, 35, 49, 61, 79, 100]}
          />
          <ScratchDate />
          <Countdown />
        </section>

        {/* Page 2: Venue details, map link, wardrobe planner, and closing family note */}
        <section
          className="invitation-art-page second-art-page"
          aria-label="Venue, wardrobe planner, and closing message"
        >
          <InvitationCard
            src="/images/invitation/invitation-two-hq.webp"
            alt="Radisson Blu Hotel Jaipur, with wardrobe suggestions for Haldi, Sangeet, and Wedding"
            boundaries={[0, 26, 43, 62, 78, 100]}
          />
          <Venue />
          <Footer />
        </section>
      </div>

      {/* 3. Atmospheric Petals and Sparkles */}
      <PageAnimations />
    </main>
  );
}

