/**
 * Industrial Field Manual design reminder: the Notes Library feels like a field binder—subject tabs,
 * unit drawers, compact study cards, and a visible maintenance path for the publisher.
 */
import { BookMarked, FileText, FolderTree, PencilLine } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteShell } from "@/components/SiteShell";
import { subjectNotes } from "@/data/notes";

export default function NotesPage() {
  const [selected, setSelected] = useState(subjectNotes[0].id);
  const current = subjectNotes.find((subject) => subject.id === selected) ?? subjectNotes[0];

  function chooseSubject(id: string) {
    setSelected(id);
  }

  return (
    <SiteShell active="learn">
      <main className="notes-page">
        <section className="notes-hero">
          <div><p className="eyebrow"><span className="signal-dot" /> Learn / subject notes</p><h1>Build a study library<br /><em>unit by unit.</em></h1><p>Organize your own revision notes, worked examples, lab records, and chapter sheets by subject. The structure below is ready for gradual additions.</p></div>
          <div className="notes-hero-stamp"><FolderTree size={34} /><span>Editable source</span><code>client/src/data/notes.ts</code></div>
        </section>
        <section className="notes-layout">
          <aside className="subject-rail"><p className="eyebrow">Subjects / choose one</p>{subjectNotes.map((subject, index) => <button key={subject.id} onClick={() => chooseSubject(subject.id)} className={current.id === subject.id ? "subject-tab active" : "subject-tab"}><span>{String(index + 1).padStart(2, "0")}</span><b>{subject.shortName}</b></button>)}</aside>
          <section className="unit-library"><div className="library-head"><div><p className="eyebrow">{current.shortName} / unit notes</p><h2>{current.title}</h2><p>{current.description}</p></div><span className="library-count"><BookMarked size={18} /> {current.units.reduce((total, unit) => total + unit.notes.length, 0)} notes</span></div>
            <Accordion type="single" collapsible defaultValue={current.units[0]?.number} className="unit-accordion" key={current.id}>
              {current.units.map((unit) => <AccordionItem value={unit.number} key={unit.number} className="unit-item"><AccordionTrigger className="unit-trigger"><span className="unit-number">Unit {unit.number}</span><span><b>{unit.title}</b><small>{unit.outcome}</small></span></AccordionTrigger><AccordionContent className="unit-content"><div className="note-card-grid">{unit.notes.map((note) => <article className="note-card" key={note.title}><div><span className="note-kind">{note.kind}</span><span className="note-date">Updated {note.updated}</span></div><h3>{note.title}</h3><p>{note.summary}</p><button className="note-open-button" type="button" onClick={() => window.alert("Create this note as a full page when you are ready. Its title and unit structure are already editable in client/src/data/notes.ts.")}><FileText size={15} /> Prepare full note</button></article>)}</div></AccordionContent></AccordionItem>)}
            </Accordion>
          </section>
        </section>
        <section className="notes-maintain"><PencilLine size={24} /><div><p className="eyebrow">How to add content</p><h2>Add a subject, unit, then a note card.</h2><p>Start with concise revision sheets and examples. When a card becomes a substantial lesson, create a dedicated article page and link it from this unit. This keeps the library organized and gives each original guide a clear purpose.</p></div><Link href="/learn" className="ink-button">Return to roadmaps</Link></section>
      </main>
    </SiteShell>
  );
}
