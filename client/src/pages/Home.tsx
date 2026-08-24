/**
 * Industrial Field Manual design reminder: the portal route should make an immediate, editorial choice
 * between the two experiences. Subdomains default to their appropriate site without adding extra chrome.
 */
import { ArrowRight, BookOpenText, Wrench } from "lucide-react";
import { Link } from "wouter";
import LearnPage from "./LearnPage";
import TechPage from "./TechPage";
import { siteMode } from "@/lib/siteUrls";

export default function Home() {
  if (siteMode === "learn") return <LearnPage />;
  if (siteMode === "tech") return <TechPage />;
  if (typeof window !== "undefined" && window.location.hostname.startsWith("learn.")) return <LearnPage />;
  if (typeof window !== "undefined" && window.location.hostname.startsWith("tech.")) return <TechPage />;

  return (
    <main className="portal-page">
      <div className="portal-head"><img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663244424614/MMjaRnPgLgyYvjpS.png" alt="" /><span><strong>LEARN</strong> / TECH</span><p>Two workspaces. One practical direction.</p></div>
      <section className="portal-grid">
        <Link href="/learn" className="portal-panel learn-portal">
          <div><BookOpenText size={25} /><p className="eyebrow">For structured learning</p><h1>Learn</h1><p>Roadmaps for IT, Linux, networking, cybersecurity, web, and automation.</p></div><span className="portal-arrow">Enter Learn <ArrowRight size={20} /></span>
        </Link>
        <Link href="/tech" className="portal-panel tech-portal">
          <div><Wrench size={25} /><p className="eyebrow">For practical work</p><h1>Tech</h1><p>A toolbench of techniques and trusted reference points for your next task.</p></div><span className="portal-arrow">Enter Tech <ArrowRight size={20} /></span>
        </Link>
      </section>
    </main>
  );
}
