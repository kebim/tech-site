/**
 * Industrial Field Manual design reminder: Tech behaves as a disciplined toolbench—dark, tactile,
 * task-led, and compact. Color indicates purpose while every result keeps a practical use case visible.
 */
import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Search, SlidersHorizontal, Wrench } from "lucide-react";
import { Link } from "wouter";
import { techniques, toolCategories, tools, type Tool } from "@/data/content";
import { SiteShell } from "@/components/SiteShell";
import { ToolLab } from "@/components/ToolLab";
import { siteHref } from "@/lib/siteUrls";

export default function TechPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const matchingTools = useMemo(() => tools.filter((tool) => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    const terms = `${tool.name} ${tool.category} ${tool.forTrack} ${tool.description} ${tool.useCase}`.toLowerCase();
    return matchesCategory && terms.includes(query.toLowerCase());
  }), [activeCategory, query]);
  const toolsByCategory = useMemo(() => matchingTools.reduce<Record<string, Tool[]>>((groups, tool) => {
    groups[tool.category] = [...(groups[tool.category] ?? []), tool];
    return groups;
  }, {}), [matchingTools]);

  return (
    <SiteShell active="tech">
      <main className="tech-main">
        <section className="tech-hero page-hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="signal-dot" /> Tech / tools & techniques</p>
            <h1>Stop collecting.<br /><em>Start using</em><br />the right tool.</h1>
            <p className="hero-summary">A practical reference desk for the tools, methods, and habits that support your work in Linux, networking, cybersecurity, IT, web, and automation.</p>
            <div className="hero-actions">
              <a href="#toolbench" className="lime-button">Search the toolbench <ArrowRight size={18} /></a>
              <Link href="/news" className="text-link light-link">Read Tech News <ArrowRight size={16} /></Link>
              <a href={siteHref("learn")} className="text-link light-link">Return to roadmaps <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="hero-visual tech-visual">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663244424614/NkMeYznvZcoeUxvX.jpg" alt="Dark technical workbench with cables, notebook, and diagnostic tools" />
            <div className="visual-caption"><span>Toolbench</span><span>02 / act</span></div>
          </div>
        </section>

        <section id="toolbench" className="toolbench-section">
          <div className="toolbench-rail">
            <p className="eyebrow">01 / locate a tool</p>
            <h2>Find the thing that helps you do the next job.</h2>
            <p>Search by topic or filter by the kind of work in front of you. Each entry is a starting point, not a substitute for permission, documentation, or sound judgment.</p>
            <div className="tool-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools, tasks, tracks" aria-label="Search tools" /></div>
            <div className="tool-filters"><span><SlidersHorizontal size={14} /> Filter bench</span>{toolCategories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={category === activeCategory ? "tool-filter active" : "tool-filter"}>{category}</button>)}</div>
          </div>
          <div className="tool-results" aria-live="polite">
            <div className="results-label"><span>{matchingTools.length.toString().padStart(2, "0")} matches</span><span>Active: {activeCategory}</span></div>
            {matchingTools.length === 0 ? <div className="empty-tools"><Wrench size={28} /><p>No exact match yet. Try a broader word or switch your filter.</p></div> : <div className="tool-zones">{Object.entries(toolsByCategory).map(([category, categoryTools], zoneIndex) => <section className="tool-zone" key={category}><header><span>Zone {String(zoneIndex + 1).padStart(2, "0")}</span><b>{category}</b><i>{categoryTools.length} tools</i></header><div className="tool-card-grid">{categoryTools.map((tool, index) => <article className="tool-card" key={tool.name}><div className="tool-card-top"><span className="tool-index">{String(index + 1).padStart(2, "0")}</span><span className={`level-tag ${tool.level.toLowerCase().replaceAll(" ", "-")}`}>{tool.level}</span></div><h3>{tool.name}</h3><p>{tool.description}</p><div className="tool-case"><span>USE IT TO</span>{tool.useCase}</div><footer><span>{tool.category} · {tool.forTrack}</span><a href={tool.url} target="_blank" rel="noreferrer" aria-label={`Open ${tool.name}`}><ExternalLink size={17} /></a></footer></article>)}</div></section>)}</div>}
          </div>
        </section>

        <ToolLab />

        <section className="techniques-section">
          <div className="section-intro"><p className="eyebrow">03 / technique matters</p><h2>Good tools become more useful with good habits.</h2></div>
          <div className="technique-grid">
            {techniques.map((technique) => <article className="technique-card" key={technique.number}><span>{technique.number}</span><h3>{technique.title}</h3><p>{technique.text}</p></article>)}
          </div>
        </section>

        <section className="safety-note">
          <span className="safety-mark">!</span>
          <div><p className="eyebrow">Operating principle</p><h2>Practice responsibly.</h2><p>Use tools only in environments you own, in instructor-provided labs, or where you have explicit authorization. A good technical habit is knowing when to pause and check the rules.</p></div>
          <a href={siteHref("learn")} className="ink-button">Choose a guided track <ArrowRight size={17} /></a>
        </section>
      </main>
    </SiteShell>
  );
}
