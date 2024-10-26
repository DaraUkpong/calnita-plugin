import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/context/Provider";
import { BrandProvider } from "@/context/PartnerDataProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const mulish = localFont({
  src: "./fonts/mulish.ttf",
  variable: "--font-mulish",
  weight: "200 900",
});

export const metadata: Metadata = {
  title: "Calnita AI",
  description: "Calnita AI, your virtual beauty assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mulish.variable} antialiased`}
      >
        <Provider>
          <BrandProvider>
           {children}
          </BrandProvider>
         
          </Provider>
      </body>
    </html>
  );
}
