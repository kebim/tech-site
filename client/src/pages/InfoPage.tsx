/**
 * Industrial Field Manual design reminder: policy pages use the same editorial voice and direct route language.
 * They are informational publisher pages, not ad placements or thin utility screens.
 */
import { ArrowLeft, ArrowUpRight, BookOpenCheck, CheckCircle2, Mail, ScrollText, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "wouter";
import { requiredBeforeLaunch, siteConfig } from "@/data/site";
import { SiteShell } from "@/components/SiteShell";
import { siteHref } from "@/lib/siteUrls";

type InfoKind = "about" | "contact" | "privacy" | "terms" | "editorial";

const pageDetails: Record<InfoKind, { eyebrow: string; title: string; lead: string; icon: typeof ShieldCheck }> = {
  about: { eyebrow: "Publisher identity", title: "A field manual for practical technical capability.", lead: "Learn & Tech exists to give technology learners a clear route from first principles to safe, visible practice.", icon: BookOpenCheck },
  contact: { eyebrow: "Publisher contact", title: "Make it easy to reach the people behind the site.", lead: "A public contact route helps learners report corrections, ask a question, or communicate with the site owner.", icon: Mail },
  privacy: { eyebrow: "Privacy & cookies", title: "Clear about data, cookies, and future advertising.", lead: "This policy explains the current behavior of the site and what changes when third-party advertising is enabled.", icon: ShieldCheck },
  terms: { eyebrow: "Terms of use", title: "Learn responsibly and test only where you are authorized.", lead: "The site is a learning and reference resource. It does not replace professional, legal, security, or operational judgment.", icon: ScrollText },
  editorial: { eyebrow: "Editorial policy", title: "Original learning guidance, useful context, and transparent limits.", lead: "The site aims to explain technical topics plainly, link to useful sources, and keep safety and accuracy ahead of traffic tactics.", icon: BookOpenCheck },
};

function useKind(): InfoKind {
  const [location] = useLocation();
  if (location.startsWith("/contact")) return "contact";
  if (location.startsWith("/privacy")) return "privacy";
  if (location.startsWith("/terms")) return "terms";
  if (location.startsWith("/editorial")) return "editorial";
  return "about";
}

export default function InfoPage() {
  const kind = useKind();
  const detail = pageDetails[kind];
  const Icon = detail.icon;
  const isConfigured = Boolean(siteConfig.publicEmail && siteConfig.ownerName);

  return (
    <SiteShell active="learn">
      <main className="info-page">
        <section className="info-hero">
          <Link href="/" className="back-link"><ArrowLeft size={15} /> Return to the two workspaces</Link>
          <div className="info-icon"><Icon size={26} /></div>
          <p className="eyebrow">{detail.eyebrow}</p>
          <h1>{detail.title}</h1>
          <p>{detail.lead}</p>
        </section>

        {kind === "about" && <div className="info-layout"><article className="policy-copy"><h2>What the two workspaces do</h2><p><strong>Learn</strong> organizes practical routes through IT, Linux, networking, cybersecurity, web development, automation, logic, cloud computing, quantum computing, data, and systems design. It treats learning as a sequence of clear outcomes and safe practice, not an endless catalogue.</p><p><strong>Tech</strong> is the working reference: a curated toolbench, study techniques, and a few browser-only utilities. It is designed to help a learner make a considered next move while keeping authorization, source quality, and documentation in view.</p><h2>How the site earns trust</h2><p>Articles and roadmap stages should provide original context, distinguish a useful starting point from a complete solution, and link to primary documentation when possible. The site does not promise certifications, jobs, security outcomes, or a substitute for professional review.</p></article><aside className="info-aside"><p className="eyebrow">Working principle</p><blockquote>“A small safe practice loop beats a large list of links.”</blockquote><a href={siteHref("learn")} className="aside-link">Explore the Learning routes <ArrowUpRight size={15} /></a><a href={siteHref("tech")} className="aside-link">Open the Toolbench <ArrowUpRight size={15} /></a></aside></div>}

        {kind === "contact" && <div className="info-layout"><article className="policy-copy"><h2>Contact the publisher</h2>{isConfigured ? <p>For general questions, corrections, accessibility feedback, or policy enquiries, email <a className="inline-link" href={`mailto:${siteConfig.publicEmail}`}>{siteConfig.publicEmail}</a>.</p> : <div className="launch-alert"><CheckCircle2 size={20} /><div><strong>Set the public contact before launch.</strong><p>Add the site owner name and a real public email address in <code>client/src/data/site.ts</code>. This is intentionally not a fake contact address.</p></div></div>}<p>When reporting an issue, include the page address, a short description of the problem, and—where relevant—the source that supports the correction. This makes it easier to improve the learning content without collecting more information than necessary.</p><h2>What to expect</h2><p>This static site does not provide an account portal, live support desk, or transactional service. Contact details should be used only for genuine editorial, accessibility, and site-administration communication.</p></article><aside className="info-aside"><p className="eyebrow">Launch requirement</p><p>Use a monitored mailbox that is appropriate for a public education website. Do not publish an email address you cannot access.</p></aside></div>}

        {kind === "privacy" && <div className="info-layout"><article className="policy-copy"><h2>Current website behavior</h2><p>The browser utilities on the Tech site run locally in the visitor’s browser. Their inputs are not sent by these utilities to a Learn & Tech server, and this static site does not offer visitor accounts or collect a contact form submission by default.</p><h2>Analytics and advertising when enabled</h2><p>If the publisher later enables analytics or third-party advertising, those providers may collect or receive information through technologies such as cookies, web beacons, IP addresses, or identifiers. Google and other third-party vendors may use cookies to serve ads based on prior visits to this or other websites.</p><p>Visitors can review <a className="inline-link" href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google’s Ad Settings</a> and may find additional opt-out options through <a className="inline-link" href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">aboutads.info</a>. When advertising is activated, the publisher should also configure any consent tools required by the laws that apply to visitors and the publisher.</p><h2>Updates and questions</h2><p>This page should be updated when the publisher changes advertising providers, analytics, contact collection, or any other data practice. The current policy update date is {siteConfig.policyUpdated}.</p></article><aside className="info-aside"><p className="eyebrow">Before enabling ads</p><p>Review the actual AdSense account instructions, display the required consent experience where applicable, and replace this general explanation if your tools or data flows change.</p><a className="aside-link" href="https://support.google.com/adsense/answer/1348695?hl=en" target="_blank" rel="noreferrer">Read Google’s required content guidance <ArrowUpRight size={15} /></a></aside></div>}

        {kind === "terms" && <div className="info-layout"><article className="policy-copy"><h2>Educational use</h2><p>Learn & Tech provides learning roadmaps, practical references, and local browser utilities for general educational use. Information may become outdated; verify important details in primary documentation and test commands or designs in an appropriate environment.</p><h2>Authorized practice only</h2><p>Security, networking, Linux, cloud, and automation materials must be used only on systems, accounts, labs, and networks that you own or where you have explicit authorization. The site does not endorse bypassing access controls, collecting data without permission, or using a tool to harm systems or people.</p><h2>External references</h2><p>The site links to external documentation and learning resources for convenience. Those resources have their own policies, availability, and terms. A link does not mean that Learn & Tech controls or endorses every external page.</p><h2>Changes</h2><p>The publisher may update content, policies, routes, and tools to keep the site accurate and useful. Continued use after a clearly posted update means the visitor accepts the revised terms to the extent permitted by law.</p></article><aside className="info-aside"><p className="eyebrow">Important limit</p><p>Nothing on this site is a guarantee of a technical outcome, professional qualification, income, security assessment, or legal compliance.</p></aside></div>}

        {kind === "editorial" && <div className="info-layout"><article className="policy-copy"><h2>Original value over copied lists</h2><p>The site’s core value is original organization and explanation: why a learner should take a stage, what a tool is appropriate for, what safe practice looks like, and what outcome to aim for. Linked material should be introduced with useful context rather than republished without added value.</p><h2>Source and correction practice</h2><p>For technical claims that may change, the preferred source is official documentation, a standards body, a vendor’s primary resource, or a widely respected educational source. Corrections should identify the page, the claim, and a supporting source; significant changes should be reflected in the page content rather than silently ignored.</p><h2>Commercial independence</h2><p>Advertising or partner relationships, if activated later, should not be presented as editorial recommendations. Paid placements must remain distinct from navigation and learning content, and no page should ask visitors to click advertising.</p></article><aside className="info-aside"><p className="eyebrow">Editorial promise</p><blockquote>“Tell learners what to do next—and what to verify before they do it.”</blockquote></aside></div>}

        <section className="readiness-panel"><div><p className="eyebrow">Publisher readiness</p><h2>Prepare the custom-domain launch with real ownership details.</h2></div><div className="readiness-list">{requiredBeforeLaunch.map((item) => <p key={item}><CheckCircle2 size={16} />{item}</p>)}</div></section>
      </main>
    </SiteShell>
  );
}
