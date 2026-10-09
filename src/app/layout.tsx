import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/scroll";
import { PROFILE } from "@/lib/data";

const interTight = localFont({
  src: "../fonts/inter-tight-var.woff2",
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/instrument-serif-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/instrument-serif-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-var.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://manthena-lakshmiprasanna.dev"),
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: `${PROFILE.role} with 3 years of enterprise experience at HCL Technologies. Production-ready personal projects in Java, Spring Boot, Microservices, React.js, and MySQL.`,
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: `${PROFILE.role} with 3 years of enterprise experience at HCL Technologies. Production-ready personal projects in Java, Spring Boot, Microservices, React.js, and MySQL.`,
    url: "https://manthena-lakshmiprasanna.dev",
    siteName: `${PROFILE.name} Portfolio`,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} — ${PROFILE.role}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased min-h-screen bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--ink)] selection:text-[var(--paper)]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
