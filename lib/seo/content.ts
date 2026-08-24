export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  kind: "tool" | "guide" | "technical";
};

export const seoPages: SeoPage[] = [
  { slug: "compress-pdf", title: "Compress PDF Online", description: "Reduce PDF file size with smart, content-aware compression.", kind: "tool" },
  { slug: "reduce-pdf-size", title: "Reduce PDF Size", description: "Make PDFs smaller while preserving readable text and important visual detail.", kind: "tool" },
  { slug: "compress-pdf-without-losing-quality", title: "Compress PDF Without Losing Quality", description: "Learn how PDFluv balances file size, visual quality and document fidelity.", kind: "tool" },
  { slug: "compress-scanned-pdf", title: "Compress Scanned PDF", description: "Reduce scanned PDF size with document-aware image optimization.", kind: "tool" },
  { slug: "compression-technology", title: "PDF Compression Technology", description: "Understand the analysis and quality checks behind PDFluv compression.", kind: "technical" },
  { slug: "how-to-reduce-pdf-size", title: "How to Reduce PDF Size", description: "A practical guide to reducing PDF size without breaking the document.", kind: "guide" },
  { slug: "benchmarks", title: "PDF Compression Benchmarks", description: "Transparent, reproducible PDF compression measurements.", kind: "technical" },
];

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
