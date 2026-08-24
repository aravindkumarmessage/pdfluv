import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://pdfluv.vercel.app"),
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
      className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
