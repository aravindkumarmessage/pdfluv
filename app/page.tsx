import Link from "next/link";
import { Compressor } from "@/components/compressor";

const features = [
  ["01", "Reads the page", "Photos, scans, text and vectors each need a different touch."],
  ["02", "Chooses the route", "The engine tests the useful options, not just one blunt preset."],
  ["03", "Checks the result", "Every output is validated before it reaches your download folder."],
];

export default function Home() {
  return <main>
    <nav className="nav-wrap"><Link className="brand" href="/">PDFLUV<span>.COM</span></Link><div className="nav-links"><span className="top-trust">✓ No account required</span><Link href="/compression-technology">How it works</Link><Link href="/benchmarks">Benchmarks</Link></div><Link className="nav-quiet" href="/pricing">For teams <span>↗</span></Link></nav>
    <section className="hero section-grid"><div className="hero-copy"><p className="eyebrow"><span className="pulse" /> Smart PDF compression</p><h1>Make space.<br /><em>Keep the good stuff.</em></h1><p className="hero-lede">PDFluv looks inside your document, then finds the lightest path that still feels like the original.</p><div className="hero-note"><span>✦</span> Built for the details people notice</div></div><Compressor /></section>
    <section className="proof-strip"><p>Designed for real documents</p><span>Scans</span><span>Reports</span><span>Slides</span><span>Forms</span><span>Portfolios</span></section>
    <section className="explain section-grid"><div><p className="eyebrow">A little more considered</p><h2>Compression that<br /><em>knows the difference.</em></h2></div><div className="feature-list">{features.map(([number, title, text]) => <article key={number}><span className="feature-num">{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className="quiet-band"><div><p className="eyebrow">No black box promises</p><h2>See what changed,<br /><em>before you download.</em></h2></div><Link className="outline-button" href="/benchmarks">Explore the benchmarks <span>↗</span></Link></section>
    <footer><Link className="brand" href="/">pdf<span>luv</span><b>.</b></Link><p>Thoughtful tools for everyday files.</p><div><Link href="/privacy">Privacy</Link><Link href="/guides">Guides</Link><Link href="/contact">Contact</Link></div></footer>
  </main>;
}
