import type { Metadata } from "next";
import "./globals.css";
import "./experience.css";
import "./landing.css";
import "./content-motion.css";
import "./typography.css";
import ExperienceShell from "@/components/ExperienceShell";

const siteUrl = new URL("https://portfolio-aayush-tiwari.vercel.app");
const previewImage = "https://portfolio-aayush-tiwari.vercel.app/stadium-night.png";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "EXTRA TIME | Aayush Tiwari",
  description:
    "A playable portfolio structured like a football match: Java, Spring Boot, AI tooling, music, systems, and one more attempt.",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "EXTRA TIME | Aayush Tiwari",
    description:
      "A playable interactive story about persistence, football, music, code, and building after the whistle.",
    url: "/",
    siteName: "EXTRA TIME",
    type: "website",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "EXTRA TIME, Aayush Tiwari's football stadium portfolio experience"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "EXTRA TIME | Aayush Tiwari",
    description:
      "A playable interactive portfolio about football, backend engineering, music, systems, and one more attempt.",
    images: [previewImage]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" href="/fonts/fraunces-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/anybody-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/commissioner-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
      </head>
      <body>
        <ExperienceShell>{children}</ExperienceShell>
      </body>
    </html>
  );
}
