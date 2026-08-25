/**
 * Industrial Field Manual design reminder: Notes are structured as subjects → units → focused pages.
 * Add a unit or note here first; use a full dedicated page only when the note grows beyond a concise study guide.
 */
export type StudyNote = {
  title: string;
  kind: "Concept note" | "Worked example" | "Revision sheet" | "Lab note";
  summary: string;
  updated: string;
};

export type SubjectNotes = {
  id: string;
  title: string;
  shortName: string;
  description: string;
  units: Array<{
    number: string;
    title: string;
    outcome: string;
    notes: StudyNote[];
  }>;
};

export const subjectNotes: SubjectNotes[] = [
  {
    id: "digital-logic",
    title: "Digital Logic & Computer Design",
    shortName: "Logic",
    description: "Build a revision library from Boolean rules through instruction flow and CPU design.",
    units: [
      { number: "01", title: "Number systems & Boolean algebra", outcome: "Convert, simplify, and verify basic expressions.", notes: [
        { title: "Binary, decimal & hexadecimal conversion", kind: "Concept note", summary: "A compact explanation of place values and a repeatable conversion method.", updated: "25 Aug 2026" },
        { title: "Boolean identities revision sheet", kind: "Revision sheet", summary: "Core identities, De Morgan’s laws, and a short self-check list.", updated: "25 Aug 2026" },
      ] },
      { number: "02", title: "Combinational circuits", outcome: "Read a circuit and explain what its output means.", notes: [
        { title: "Logic gates and truth tables", kind: "Concept note", summary: "AND, OR, NOT, XOR, NAND, and NOR with a small comparison table.", updated: "25 Aug 2026" },
        { title: "Multiplexer worked example", kind: "Worked example", summary: "Follow selection lines to trace the output of a 4-to-1 multiplexer.", updated: "25 Aug 2026" },
      ] },
    ],
  },
  {
    id: "networking",
    title: "Networking Essentials",
    shortName: "Networking",
    description: "Study notes for addressing, packet flow, services, and a safe lab mindset.",
    units: [
      { number: "01", title: "Network models & addressing", outcome: "Explain layers, address types, and what routing decisions use.", notes: [
        { title: "OSI and TCP/IP model comparison", kind: "Concept note", summary: "Map common protocols to layers without treating either model as a checklist.", updated: "25 Aug 2026" },
        { title: "IPv4 subnetting practice method", kind: "Worked example", summary: "Use the local subnet tool, then check network, broadcast, and usable ranges.", updated: "25 Aug 2026" },
      ] },
      { number: "02", title: "DNS, HTTP & packet inspection", outcome: "Trace a basic request and identify which protocol does which job.", notes: [
        { title: "A DNS lookup in plain language", kind: "Concept note", summary: "A small sequence from resolver to answer, including caching and common failure points.", updated: "25 Aug 2026" },
        { title: "Packet-capture lab journal template", kind: "Lab note", summary: "A repeatable way to record filters, observations, assumptions, and next questions.", updated: "25 Aug 2026" },
      ] },
    ],
  },
  {
    id: "linux",
    title: "Linux Operator",
    shortName: "Linux",
    description: "Keep practical Linux notes organized around commands, permissions, services, and diagnostics.",
    units: [
      { number: "01", title: "Files, processes & permissions", outcome: "Work confidently with the filesystem and basic access controls.", notes: [
        { title: "Reading Linux file permissions", kind: "Concept note", summary: "Owner, group, other, and symbolic permission changes with safe examples.", updated: "25 Aug 2026" },
        { title: "Process inspection command sheet", kind: "Revision sheet", summary: "A concise command reference for ps, top, pgrep, kill, and journalctl.", updated: "25 Aug 2026" },
      ] },
      { number: "02", title: "Services & logs", outcome: "Inspect a systemd service and diagnose a bounded problem.", notes: [
        { title: "systemctl and journalctl lab note", kind: "Lab note", summary: "A safe service-inspection sequence and a checklist for documenting findings.", updated: "25 Aug 2026" },
      ] },
    ],
  },
];
