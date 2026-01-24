import type { Metadata } from "next";
import { Roboto, Playfair_Display } from "next/font/google";
import "./globals.css";
import WhatsAppBubble from "./components/WhatsAppBubble";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-roboto'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: "Executive Strategic Leadership with AI | Freddway Coaching",
  description: "Program 2 Hari Intensif untuk Executive yang Ingin Menguasai AI Sebagai Alat Booster untuk Analisa Data, Problem Solving, Decision Making & Strategic Planning",
  keywords: "AI Leadership, Executive Training, Strategic Planning, Freddway Coaching, Business Consulting",
  authors: [{ name: "Freddway Coaching & Consulting" }],
  openGraph: {
    title: "Executive Strategic Leadership with AI",
    description: "Program 2 Hari Intensif untuk Executive - AI untuk Analisa Data, Problem Solving, Decision Making & Strategic Planning",
    type: "website",
  },
  icons: {
    icon: "/images/LOGO BUNDAR.PNG",
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${roboto.variable} ${playfair.variable}`}>
        {children}
        <WhatsAppBubble />
      </body>
    </html>
  );
}
