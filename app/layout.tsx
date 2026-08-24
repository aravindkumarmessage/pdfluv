import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pdfluv.vercel.app"),
  title: { default: "Compress PDF Online | PDFluv", template: "%s | PDFluv" },
  description: "Reduce PDF size online with smart, content-aware compression that protects the details that matter.",
  applicationName: "PDFluv",
  openGraph: { type: "website", siteName: "PDFluv", title: "Compress PDF Online | PDFluv", description: "A calmer, smarter way to make PDFs lighter." },
  twitter: { card: "summary_large_image", title: "Compress PDF Online | PDFluv", description: "A calmer, smarter way to make PDFs lighter." },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
