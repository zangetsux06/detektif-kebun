import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Detektif Kebun: Teka-Teki Flora Nusantara",
  description:
    "Sebuah petualangan botani interaktif bersama Eyang Rimba. Tebak teka-teki tanaman Nusantara dan temukan keajaiban flora Indonesia!",
  keywords: [
    "flora nusantara",
    "teka-teki botani",
    "tanaman indonesia",
    "game edukasi",
    "detektif kebun",
  ],
  authors: [{ name: "Tim Detektif Kebun" }],
  openGraph: {
    title: "Detektif Kebun: Teka-Teki Flora Nusantara",
    description:
      "Petualangan botani interaktif bersama Eyang Rimba — tebak tanaman Nusantara & saksikan sketsa botani tercipta!",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b2a1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
