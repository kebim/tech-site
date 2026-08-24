/**
 * Industrial Field Manual design reminder: shared shell uses a slim paper-and-ink masthead,
 * route-marker logo, calibration bands, and direct labels rather than generic app navigation.
 */
import { Link } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { siteHref } from "@/lib/siteUrls";

type SiteShellProps = {
  active: "learn" | "tech";
  children: React.ReactNode;
};

export function SiteShell({ active, children }: SiteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const other = active === "learn" ? "Tech" : "Learn";
  const otherHref = siteHref(active === "learn" ? "tech" : "learn");

  return (
    <div className={`site-shell ${active === "tech" ? "tech-shell" : "learn-shell"}`}>
      <header className="masthead">
        <Link href="/" className="brand-lockup" aria-label="Learn and Tech Hub home">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663244424614/MMjaRnPgLgyYvjpS.png" alt="" className="brand-mark" />
          <span className="brand-name"><strong>LEARN</strong><span className="brand-divider">/</span>TECH</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href={siteHref("learn")} className={active === "learn" ? "nav-link active" : "nav-link"}>Learn</a>
          <a href={siteHref("tech")} className={active === "tech" ? "nav-link active" : "nav-link"}>Tech</a>
          <Link href="/about" className="nav-link">About</Link>
          <a href="#field-notes" className="nav-link">Field notes</a>
        </nav>
        <a className="cross-site-link" href={otherHref}>
          Open {other} <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href={siteHref("learn")} onClick={() => setMenuOpen(false)}>Learn roadmaps</a>
          <a href={siteHref("tech")} onClick={() => setMenuOpen(false)}>Tech toolbench</a>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About the site</Link>
          <a href="#field-notes" onClick={() => setMenuOpen(false)}>Field notes</a>
        </nav>
      )}
      {children}
      <footer id="field-notes" className="site-footer">
        <div>
          <p className="eyebrow">Field notes</p>
          <div className="route-glyph footer-glyph" aria-hidden="true"><span /><i /><b /></div>
          <p className="footer-statement">A practical study companion for building technical confidence one useful action at a time.</p>
        </div>
        <div className="footer-meta">
          <span>Editable content: <code>client/src/data/content.ts</code></span>
          <span>Routes: <code>/learn</code> and <code>/tech</code></span>
          <span className="footer-links"><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/editorial">Editorial</Link></span>
        </div>
      </footer>
    </div>
  );
}
