import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compressor } from "@/components/compressor";
import { seoPages, siteUrl } from "@/lib/seo/content";

export function generateStaticParams() { return seoPages.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = seoPages.find((item) => item.slug === slug);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `${siteUrl}/${page.slug}` }, openGraph: { title: page.title, description: page.description, type: page.kind === "technical" ? "article" : "website" } };
}

export default async function SeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = seoPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <main>
    <nav className="nav-wrap"><Link className="brand" href="/">pdf<span>luv</span><b>.</b></Link><div className="nav-links"><Link href="/compress-pdf">Compress PDF</Link><Link href="/benchmarks">Benchmarks</Link></div><Link className="nav-quiet" href="/">Back home <span>↗</span></Link></nav>
    <section className="seo-hero"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.headline}<br /><em>{page.accent}</em></h1><p className="hero-lede">{page.description}</p></div>{page.kind === "tool" && <Compressor />}</section>
    <article className="seo-content">{page.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}
  <section><h2>Frequently asked questions</h2>{page.faqs.map((faq) => <div className="faq" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}</section>
  <section><h2>Related PDF tools and guides</h2><div className="related-links">{page.related.map((slug) => { const related = seoPages.find((item) => item.slug === slug); return related && <Link key={slug} href={`/${slug}`}>{related.title} <span>↗</span></Link>; })}</div></section>
    </article>
  </main>;
}
