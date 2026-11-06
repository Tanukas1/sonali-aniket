import React from "react";
import { MapPinIcon, ArrowUpRightIcon } from "@/components/ui/Icons";

export default function Venue() {
  return (
    <div className="art-map reveal-on-scroll">
      <span className="map-ornament" aria-hidden="true">
        ✦ &nbsp; ✦ &nbsp; ✦
      </span>
      <a
        href="https://www.google.com/maps/search/?api=1&query=Hotel+G+R+International+Nagmatiya+Gaya"
        target="_blank"
        rel="noopener noreferrer"
        className="venue-map-link inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border border-primary bg-primary text-primary-foreground tracking-widest hover:bg-primary/90 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <MapPinIcon size={17} /> FIND YOUR WAY <ArrowUpRightIcon size={16} />
      </a>
      <span className="map-caption">HOTEL G R INTERNATIONAL · GAYA</span>
    </div>
  );
}

