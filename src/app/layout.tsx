import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KonlyZx Downloads - Centro de Descargas Oficial",
  description: "Descarga recursos exclusivos, packs de edición, presets y contenido creado por KonlyZx. Centro oficial de descargas para suscriptores del canal de YouTube.",
  keywords: "KonlyZx, gaming, edición, YouTube, descargas, recursos, packs, presets",
  authors: [{ name: "KonlyZx" }],
  creator: "KonlyZx",
  openGraph: {
    title: "KonlyZx Downloads",
    description: "Centro oficial de descargas para suscriptores de KonlyZx",
    url: "https://konlyzx-downloads.vercel.app",
    siteName: "KonlyZx Downloads",
    type: "website",
  },
  twitter: {
    title: "KonlyZx Downloads",
    description: "Centro oficial de descargas para suscriptores de KonlyZx",
    creator: "@konlyzx",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body className={`${rajdhani.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
