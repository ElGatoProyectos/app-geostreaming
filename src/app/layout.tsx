import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: [ "200", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://app-geostreaming.vercel.app/"),
  title: {
    default: "Geostreaming",
    template: "%s - Geostreaming",
  },
  description:
    "¡Descubre GeoStreaming! Accede a tus plataformas de streaming favoritas (Netflix, Spotify, Amazon Prime, YouTube y más) a precios increíbles. Además, si quieres ser distribuidor, te ofrecemos tarifas aún más bajas. ¡Haz clic y disfruta del entretenimiento sin límites!",
  keywords: [
    "steaming",
    "plataformas",
    "precios bajos",
    "netflix",
    "canva premium",
    "amazon prime video",
    "amazon prime",
    "sopotify",
    "star plus",
    "geostreaming",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  authors: [
    { name: "Geostreaming" },
    { name: "Geostreaming", url: "https://app-geostreaming.vercel.app/" },
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  twitter: {
    card: "summary_large_image",
    title: "Geostreaming",
    description:
      "¡Descubre GeoStreaming! Accede a tus plataformas de streaming favoritas (Netflix, Spotify, Amazon Prime, YouTube y más) a precios increíbles. Además, si quieres ser distribuidor, te ofrecemos tarifas aún más bajas. ¡Haz clic y disfruta del entretenimiento sin límites!",
    images: "/opengraph-image.png",
  },

  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://app-geostreaming.vercel.app/",
    siteName: "Geostreaming",
    title: "Geostreaming",
    description:
      "¡Descubre GeoStreaming! Accede a tus plataformas de streaming favoritas (Netflix, Spotify, Amazon Prime, YouTube y más) a precios increíbles. Además, si quieres ser distribuidor, te ofrecemos tarifas aún más bajas. ¡Haz clic y disfruta del entretenimiento sin límites!",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Geostreaming ",
      },
      {
        url:'/logo-256x256.png',
        width:256,
        height: 256,
        alt: 'Logo Geostreaming',
      },
    ],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" >
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
