import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://riteshreet.lovable.app"),
  title: "Ritesh & Reet | Wedding Invitation",
  description: "Join Ritesh and Reet for their wedding celebration in Jaipur on 9 December 2026.",
  openGraph: {
    title: "Ritesh & Reet | Wedding Invitation",
    description: "A celebration of love in Jaipur, 8–9 December 2026.",
    type: "website",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritesh & Reet | Wedding Invitation",
    description: "A celebration of love in Jaipur, 8–9 December 2026.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&family=Great+Vibes&family=Lora:wght@500;600&display=swap"
        />
        <link rel="preload" as="image" href="/images/envelope/seal-cover.jpeg" />
        <link rel="preload" as="image" href="/images/invitation/invitation-one-hq.webp" />
        <link rel="preload" as="image" href="/images/invitation/invitation-two-hq.webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}

