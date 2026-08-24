/**
 * Industrial Field Manual design reminder: Learn is an asymmetric study desk with clear sequence,
 * strong stage rails, warm reading surfaces, and signal-lime markers for the next useful action.
 */
import { useMemo, useState } from "react";
import { ArrowRight, Atom, Binary, Blocks, BookOpenText, Check, ChevronRight, Cloud, Compass, Database, ExternalLink, Network, ShieldCheck, Terminal, Waypoints } from "lucide-react";
import { Link } from "wouter";
import { roadmapFilters, roadmaps, studyChecklist } from "@/data/content";
import { SiteShell } from "@/components/SiteShell";
import { siteHref } from "@/lib/siteUrls";

const iconMap = [Compass, Terminal, Network, ShieldCheck, BookOpenText, Waypoints, Binary, Cloud, Atom, Database, Blocks];

function matchRoadmap(id: string, filter: string) {
  const lookup: Record<string, string[]> = {
    IT: ["it-foundations"], Linux: ["linux"], Networking: ["networking"], Cybersecurity: ["cybersecurity"], Web: ["web"], Automation: ["automation"], Logic: ["digital-logic"], Cloud: ["cloud"], Quantum: ["quantum"], Data: ["data"], Systems: ["systems"],
  };
  return filter === "All" || lookup[filter]?.includes(id);
}

export default function LearnPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [checked, setChecked] = useState<number[]>([]);
  const visibleRoadmaps = useMemo(() => roadmaps.filter((roadmap) => matchRoadmap(roadmap.id, activeFilter)), [activeFilter]);

  function toggleChecklist(index: number) {
    setChecked((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  }

  return (
    <SiteShell active="learn">
      <main>
        <section className="learn-hero page-hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="signal-dot" /> Learn / roadmaps for real practice</p>
            <h1>Choose a track.<br /><em>Build the fundamentals.</em><br />Ship proof of work.</h1>
            <p className="hero-summary">Structured learning paths for IT, Linux, networking, cybersecurity, web development, and automation—designed around useful practice, not endless tabs.</p>
            <div className="hero-actions">
              <a href="#roadmaps" className="ink-button">Find your route <ArrowRight size={18} /></a>
              <a href={siteHref("tech")} className="text-link">Browse the toolbench <ChevronRight size={18} /></a>
            </div>
          </div>
          <div className="hero-visual learn-visual">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663244424614/lFoDKvQYNoaSzJrc.jpg" alt="Technical worktable with notebook, network cable, and learning tools" />
            <div className="visual-caption"><span>Field desk</span><span>01 / orient</span></div>
          </div>
        </section>

        <section className="track-strip" aria-label="Learning areas">
          {roadmapFilters.slice(1).map((filter, index) => {
            const Icon = iconMap[index];
            return <button key={filter} className={activeFilter === filter ? "track-pill selected" : "track-pill"} onClick={() => { setActiveFilter(filter); document.getElementById("roadmaps")?.scrollIntoView({ behavior: "smooth" }); }}><Icon size={16} /> {filter}</button>;
          })}
        </section>

        <section id="roadmaps" className="content-section roadmap-section">
          <div className="section-intro sticky-intro">
            <p className="eyebrow">01 / choose a route</p>
            <div className="route-glyph intro-route" aria-hidden="true"><span /><i /><b /></div>
            <h2>Roadmaps with a reason for every step.</h2>
            <p>Choose the area that matches your goal. Each route moves from concepts to applied practice and ends with evidence you can keep.</p>
            <div className="filter-bar" aria-label="Filter learning roadmaps">
              {roadmapFilters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={filter === activeFilter ? "filter-button active" : "filter-button"}>{filter}</button>)}
            </div>
          </div>
          <div className="roadmap-list">
            <div className="route-status" aria-hidden="true"><span>Field route</span><i /></div>
            {visibleRoadmaps.map((roadmap, roadmapIndex) => (
              <article className={`roadmap-card ${roadmap.color}`} key={roadmap.id}>
                <div className="roadmap-card-heading">
                  <span className="route-number">0{roadmapIndex + 1}</span>
                  <div>
                    <p className="eyebrow">{roadmap.eyebrow}</p>
                    <h3>{roadmap.title}</h3>
                  </div>
                  <div className="roadmap-meta"><span>{roadmap.duration}</span><span>{roadmap.level}</span></div>
                </div>
                <p className="roadmap-description">{roadmap.description}</p>
                <div className="focus-tags">{roadmap.focus.map((focus) => <span key={focus}>{focus}</span>)}</div>
                <div className="stage-rail">
                  {roadmap.stages.map((stage, stageIndex) => (
                    <div className="stage" key={stage.title}>
                      <span className="stage-marker">{stageIndex + 1}</span>
                      <div className="stage-content">
                        <h4>{stage.title}</h4>
                        <p>{stage.outcome}</p>
                        <a href={stage.resource} target="_blank" rel="noreferrer">Open {stage.resourceLabel} <ExternalLink size={14} /></a>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="image-note-section">
          <div className="image-note-copy">
            <p className="eyebrow">02 / build in stages</p>
            <div className="route-glyph dark-route" aria-hidden="true"><span /><i /><b /></div>
            <h2>Progress becomes easier to see when the next step is small.</h2>
            <p>Do not try to collect every course. Choose one stage, create a focused lab or project, write down what happened, then continue.</p>
            <div className="principle-line"><span />Use the Learn route to decide what to study. Use Tech to decide what to work with.</div>
          </div>
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663244424614/jeYICrojYZlPwPVu.jpg" alt="Abstract stepping stones connected by blue route lines" />
        </section>

        <section className="study-section">
          <div className="study-header">
            <p className="eyebrow">03 / set your cadence</p>
            <h2>A first-week field checklist.</h2>
            <p>Use this as a personal starting point. Your selections remain for the session, making it easy to begin without over-planning.</p>
          </div>
          <div className="study-card">
            <div className="checklist-count"><span>{checked.length.toString().padStart(2, "0")}</span><small>of {studyChecklist.length} prepared</small></div>
            <div className="checklist-list">
              {studyChecklist.map((item, index) => (
                <button className={checked.includes(index) ? "check-item complete" : "check-item"} onClick={() => toggleChecklist(index)} key={item}>
                  <span className="check-box">{checked.includes(index) && <Check size={15} />}</span>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="handoff-banner">
          <div><p className="eyebrow">Need a working reference?</p><h2>The next learning step often needs the right tool.</h2></div>
          <a href={siteHref("tech")} className="lime-button">Open Tech toolbench <ArrowRight size={18} /></a>
        </section>
      </main>
    </SiteShell>
  );
}
