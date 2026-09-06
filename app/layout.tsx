import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: `${siteConfig.className} | Class Portfolio`,
    template: `%s | ${siteConfig.className}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.className} Class Portfolio`,
  keywords: ["XI TKJ 3", "profil kelas", "TKJ", "portfolio siswa", "Next.js"],
  openGraph: {
    title: `${siteConfig.className} Class Portfolio`,
    description: siteConfig.description,
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
