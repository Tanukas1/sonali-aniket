import React from "react";

interface InvitationCardProps {
  src: string;
  alt: string;
  boundaries: number[];
}

export default function InvitationCard({ src, alt, boundaries }: InvitationCardProps) {
  return (
    <>
      {boundaries.slice(0, -1).map((r, i) => {
        const a = boundaries[i + 1];
        if (a === undefined) return null;
        return (
          <div
            key={r}
            className="art-slice reveal-on-scroll"
            style={{ top: `${r}%`, height: `${a - r}%` }}
          >
            <img
              className="page-art"
              src={src}
              alt={i === 0 ? alt : ""}
              width={1860}
              height={8454}
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                top: `${(-r / (a - r)) * 100}%`,
                height: `${(100 / (a - r)) * 100}%`,
              }}
            />
          </div>
        );
      })}
    </>
  );
}

