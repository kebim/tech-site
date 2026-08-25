/**
 * Industrial Field Manual design reminder: Tech News is an annotated newsroom, not a feed clone.
 * Entries make source, date, and learner relevance immediately visible.
 */
import { ArrowUpRight, CalendarDays, Newspaper, PencilLine } from "lucide-react";
import { Link } from "wouter";
import { SiteShell } from "@/components/SiteShell";
import { techNews } from "@/data/news";

export default function NewsPage() {
  return (
    <SiteShell active="tech">
      <main className="news-page">
        <section className="news-hero"><div><p className="eyebrow"><span className="signal-dot" /> Tech / dated field report</p><h1>What changed.<br /><em>Why it matters.</em></h1><p>A concise, source-linked record of developments in AI, security, cloud, networking, and practical technology. Newest entries belong at the top.</p></div><div className="news-hero-mark"><Newspaper size={38} /><span>Editorial desk</span><code>client/src/data/news.ts</code></div></section>
        <section className="news-stream"><div className="news-stream-rail"><p className="eyebrow">Live record</p><h2>Read the signal, not the noise.</h2><p>Each entry is written in original language, links to its primary source, and states a learning implication rather than repeating a press release.</p><Link href="/tech" className="light-link">Open the tools <ArrowUpRight size={16} /></Link></div><div className="news-list">{techNews.map((item, index) => <article className="news-card" key={item.id}><div className="news-card-meta"><span>{String(index + 1).padStart(2, "0")}</span><span className="news-category">{item.category}</span><time><CalendarDays size={14} /> {item.published}</time></div><h2>{item.title}</h2><p>{item.summary}</p><div className="why-matters"><span>Why it matters for learners</span><p>{item.whyItMatters}</p></div><a href={item.sourceUrl} target="_blank" rel="noreferrer" className="source-link">Read the primary source: {item.sourceName} <ArrowUpRight size={15} /></a></article>)}</div></section>
        <section className="news-maintain"><PencilLine size={23} /><div><p className="eyebrow">Editorial workflow</p><h2>Publish a date, a source, a summary, and a reason.</h2><p>Add the newest item to the top of <code>client/src/data/news.ts</code>. Keep summaries neutral, cite the primary announcement, and clearly distinguish reporting from your own analysis.</p></div></section>
      </main>
    </SiteShell>
  );
}
