import type { Metadata } from "next";
import Link from "next/link";
import { Compressor } from "@/components/compressor";

export const metadata: Metadata = { title: "Compress PDF Online", description: "Reduce PDF file size with smart, content-aware compression while preserving the details that matter.", alternates: { canonical: "/compress-pdf" }, openGraph: { title: "Compress PDF Online", description: "Reduce PDF file size with smart, content-aware compression." } };

export default function CompressPdfPage() {
  return <main><nav className="nav-wrap"><Link className="brand" href="/">pdf<span>luv</span><b>.</b></Link><Link className="nav-quiet" href="/">Back home <span>↗</span></Link></nav><section className="hero section-grid"><div className="hero-copy"><p className="eyebrow">Compress PDF online</p><h1>Less file.<br /><em>Same document.</em></h1><p className="hero-lede">Upload a PDF and choose how aggressively to optimize it. PDFluv is designed to preserve native text and vectors wherever possible.</p></div><Compressor /></section></main>;
}
