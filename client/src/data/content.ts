/**
 * Industrial Field Manual design reminder: this file is the single editable source for learner routes,
 * resource links, tools, and techniques. Keep content concise, concrete, and action-oriented.
 */

export type Roadmap = {
  id: string;
  title: string;
  eyebrow: string;
  duration: string;
  level: string;
  description: string;
  focus: string[];
  color: "lime" | "cobalt" | "clay" | "ink";
  stages: Array<{
    title: string;
    outcome: string;
    resource: string;
    resourceLabel: string;
  }>;
};

export type Tool = {
  name: string;
  category: string;
  forTrack: string;
  description: string;
  useCase: string;
  url: string;
  level: "Start here" | "Build with it" | "Deep practice";
};

export const roadmapFilters = ["All", "IT", "Linux", "Networking", "Cybersecurity", "Web", "Automation", "Logic", "Cloud", "Quantum", "Data", "Systems"];

export const roadmaps: Roadmap[] = [
  {
    id: "it-foundations",
    title: "IT Foundations",
    eyebrow: "Start with the system",
    duration: "6–8 weeks",
    level: "First principles",
    description: "Build the vocabulary and operating habits that make every technical specialization easier to understand.",
    focus: ["Hardware", "Operating systems", "Files & processes"],
    color: "lime",
    stages: [
      { title: "Map the machine", outcome: "Explain how CPU, memory, storage, and peripherals work together.", resource: "https://www.professormesser.com/", resourceLabel: "Professor Messer" },
      { title: "Operate the system", outcome: "Navigate files, manage processes, and diagnose basic system issues.", resource: "https://www.netacad.com/courses/operating-systems-basics", resourceLabel: "OS Basics" },
      { title: "Document your work", outcome: "Write repeatable troubleshooting notes and a personal command glossary.", resource: "https://www.markdownguide.org/basic-syntax/", resourceLabel: "Markdown Guide" },
    ],
  },
  {
    id: "linux",
    title: "Linux Operator",
    eyebrow: "Use the terminal with intent",
    duration: "8–10 weeks",
    level: "Hands-on core",
    description: "Move from basic navigation to the habits that make Linux a reliable daily workspace and server foundation.",
    focus: ["Shell", "Permissions", "Services"],
    color: "clay",
    stages: [
      { title: "Learn the shell", outcome: "Move, create, inspect, and redirect files without relying on a graphical interface.", resource: "https://linuxjourney.com/", resourceLabel: "Linux Journey" },
      { title: "Control access", outcome: "Set ownership, permissions, and safe SSH access for a small lab machine.", resource: "https://overthewire.org/wargames/bandit/", resourceLabel: "OverTheWire: Bandit" },
      { title: "Run a service", outcome: "Install, inspect, start, and troubleshoot a systemd-managed service.", resource: "https://www.freedesktop.org/software/systemd/man/latest/systemctl.html", resourceLabel: "systemctl reference" },
    ],
  },
  {
    id: "networking",
    title: "Networking Essentials",
    eyebrow: "Follow the packet",
    duration: "8–12 weeks",
    level: "Concept to capture",
    description: "Understand how devices communicate, then verify that understanding by observing real packets and routes.",
    focus: ["TCP/IP", "Routing", "Packet analysis"],
    color: "cobalt",
    stages: [
      { title: "Read the layers", outcome: "Describe the role of Ethernet, IP, TCP, UDP, DNS, and HTTP in one request.", resource: "https://skillsforall.com/course/networking-basics", resourceLabel: "Networking Basics" },
      { title: "Build a tiny lab", outcome: "Assign addresses, test reachability, and compare a switch with a router.", resource: "https://www.packettracernetwork.com/", resourceLabel: "Packet Tracer guides" },
      { title: "Inspect traffic", outcome: "Filter a packet capture to explain a DNS lookup and a web request.", resource: "https://www.wireshark.org/docs/wsug_html_chunked/", resourceLabel: "Wireshark Guide" },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    eyebrow: "Defend by understanding",
    duration: "12–16 weeks",
    level: "Lab-first",
    description: "Learn defensive thinking from operating-system fundamentals through web, network, and incident analysis labs.",
    focus: ["Threat models", "Web security", "Detection"],
    color: "ink",
    stages: [
      { title: "Build a safe lab", outcome: "Create an isolated practice environment and record a simple threat model.", resource: "https://tryhackme.com/", resourceLabel: "TryHackMe" },
      { title: "Study web risk", outcome: "Recognize common web vulnerabilities and test only within authorized labs.", resource: "https://portswigger.net/web-security", resourceLabel: "Web Security Academy" },
      { title: "Trace an incident", outcome: "Use logs, a timeline, and containment notes to explain a simulated alert.", resource: "https://www.sans.org/white-papers/", resourceLabel: "SANS papers" },
    ],
  },
  {
    id: "web",
    title: "Web Builder",
    eyebrow: "Turn concepts into interfaces",
    duration: "10–14 weeks",
    level: "Build in public",
    description: "Learn the browser stack by making accessible pages, small interactive tools, and a documented portfolio.",
    focus: ["HTML & CSS", "JavaScript", "Git"],
    color: "cobalt",
    stages: [
      { title: "Structure a page", outcome: "Create semantic, responsive HTML and CSS for a small personal page.", resource: "https://developer.mozilla.org/en-US/docs/Learn_web_development", resourceLabel: "MDN Learn" },
      { title: "Add behavior", outcome: "Build a browser interaction with JavaScript and explain its event flow.", resource: "https://javascript.info/", resourceLabel: "javascript.info" },
      { title: "Ship a project", outcome: "Publish a small project with a clear README and version history.", resource: "https://docs.github.com/en/get-started/start-your-journey/hello-world", resourceLabel: "GitHub Hello World" },
    ],
  },
  {
    id: "automation",
    title: "Automation & Data",
    eyebrow: "Make repeatable work lighter",
    duration: "8–12 weeks",
    level: "Useful scripting",
    description: "Use Python, shell, and structured data to automate small operational tasks and report what happened.",
    focus: ["Python", "APIs", "Data hygiene"],
    color: "clay",
    stages: [
      { title: "Script a routine", outcome: "Write a small Python script that reads a file and creates a useful report.", resource: "https://automatetheboringstuff.com/", resourceLabel: "Automate the Boring Stuff" },
      { title: "Use structured data", outcome: "Read, clean, and summarize a CSV while preserving an audit-friendly process.", resource: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html", resourceLabel: "Pandas tutorials" },
      { title: "Call an API", outcome: "Request public data, handle errors, and save a timestamped result responsibly.", resource: "https://requests.readthedocs.io/en/latest/", resourceLabel: "Requests docs" },
    ],
  },
  {
    id: "digital-logic",
    title: "Digital Logic & Computer Design",
    eyebrow: "Follow the signal",
    duration: "8–12 weeks",
    level: "From gates to machines",
    description: "See how binary values become decisions, memory, instruction flow, and the architecture beneath modern software.",
    focus: ["Boolean algebra", "Circuits", "CPU design"],
    color: "ink",
    stages: [
      { title: "Reason in binary", outcome: "Convert values, simplify Boolean expressions, and predict the output of small logic circuits.", resource: "https://www.nand2tetris.org/", resourceLabel: "Nand2Tetris" },
      { title: "Compose a computer", outcome: "Connect gates into arithmetic logic, registers, and a simple CPU model.", resource: "https://www.nand2tetris.org/course", resourceLabel: "Nand2Tetris course" },
      { title: "Trace an instruction", outcome: "Explain how a basic instruction moves through fetch, decode, execute, and storage.", resource: "https://www.nand2tetris.org/project01", resourceLabel: "Project sequence" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Computing Foundations",
    eyebrow: "Design for change",
    duration: "10–14 weeks",
    level: "Infrastructure literacy",
    description: "Learn the cloud vocabulary, core delivery models, identity boundaries, and operational habits behind reliable services.",
    focus: ["Compute", "Identity", "Reliability"],
    color: "cobalt",
    stages: [
      { title: "Map the shared model", outcome: "Describe what a cloud provider manages and what a team remains responsible for.", resource: "https://aws.amazon.com/training/digital/", resourceLabel: "AWS Skill Builder" },
      { title: "Deploy a tiny service", outcome: "Configure a simple static site or containerized sample without exposing credentials.", resource: "https://cloud.google.com/learn/training", resourceLabel: "Cloud training" },
      { title: "Design for recovery", outcome: "Write a short availability, backup, and incident response plan for a small service.", resource: "https://sre.google/workbook/table-of-contents/", resourceLabel: "SRE workbook" },
    ],
  },
  {
    id: "quantum",
    title: "Quantum Computing Primer",
    eyebrow: "Think beyond classical bits",
    duration: "6–10 weeks",
    level: "Conceptual foundation",
    description: "Build an intuitive and mathematical foundation for qubits, measurement, circuits, and the limits of quantum advantage.",
    focus: ["Qubits", "Circuits", "Algorithms"],
    color: "clay",
    stages: [
      { title: "Learn the vocabulary", outcome: "Distinguish superposition, entanglement, interference, and measurement without treating them as magic.", resource: "https://learning.quantum.ibm.com/", resourceLabel: "IBM Quantum Learning" },
      { title: "Read a circuit", outcome: "Predict simple one- and two-qubit circuit outcomes using a simulator.", resource: "https://quantum.country/", resourceLabel: "Quantum Country" },
      { title: "Compare the models", outcome: "Explain the difference between a quantum speedup claim and a practical application claim.", resource: "https://quantum.cloud.ibm.com/docs/en/guides", resourceLabel: "IBM Quantum docs" },
    ],
  },
  {
    id: "data",
    title: "Data & Databases",
    eyebrow: "Ask precise questions",
    duration: "10–14 weeks",
    level: "From rows to insight",
    description: "Use structured data responsibly, query a relational database, and communicate what the evidence does—and does not—say.",
    focus: ["SQL", "Data quality", "Visualization"],
    color: "lime",
    stages: [
      { title: "Think in tables", outcome: "Describe entities, relationships, keys, and common data-quality failures.", resource: "https://sqlbolt.com/", resourceLabel: "SQLBolt" },
      { title: "Query with care", outcome: "Write select, join, group, and filter queries against a practice dataset.", resource: "https://mode.com/sql-tutorial/", resourceLabel: "SQL tutorial" },
      { title: "Explain the result", outcome: "Create a small, honest summary that identifies assumptions, limits, and the next question.", resource: "https://www.kaggle.com/learn", resourceLabel: "Kaggle Learn" },
    ],
  },
  {
    id: "systems",
    title: "Systems & Service Design",
    eyebrow: "Make trade-offs visible",
    duration: "10–14 weeks",
    level: "Architecture thinking",
    description: "Practice turning a vague product request into a system diagram, explicit trade-offs, and an operationally realistic design.",
    focus: ["APIs", "Scale", "Observability"],
    color: "cobalt",
    stages: [
      { title: "Draw the boundaries", outcome: "Describe a service’s users, inputs, outputs, dependencies, and failure paths.", resource: "https://github.com/donnemartin/system-design-primer", resourceLabel: "System Design Primer" },
      { title: "Choose the trade-off", outcome: "Compare simple architecture options using latency, cost, consistency, and team complexity.", resource: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/", resourceLabel: "Designing Data-Intensive Apps" },
      { title: "Operate the design", outcome: "Draft useful service-level indicators, logs, and runbook steps for a fictional service.", resource: "https://sre.google/sre-book/table-of-contents/", resourceLabel: "Google SRE book" },
    ],
  },
];

export const toolCategories = ["All", "Linux", "Networking", "Security", "Build", "Logic", "Cloud", "Quantum", "Data", "Systems", "Reference"];

export const tools: Tool[] = [
  { name: "Linux Journey", category: "Linux", forTrack: "Linux Operator", description: "Short, focused lessons for the Linux command line and operating-system concepts.", useCase: "Build a daily terminal habit.", url: "https://linuxjourney.com/", level: "Start here" },
  { name: "tmux", category: "Linux", forTrack: "Linux Operator", description: "A terminal multiplexer for persistent, split, and repeatable command-line sessions.", useCase: "Keep a remote lab session organized.", url: "https://github.com/tmux/tmux/wiki", level: "Build with it" },
  { name: "Wireshark", category: "Networking", forTrack: "Networking Essentials", description: "A packet analyzer for examining and filtering network traffic in controlled environments.", useCase: "Verify what a DNS or HTTP exchange is doing.", url: "https://www.wireshark.org/", level: "Start here" },
  { name: "Nmap", category: "Networking", forTrack: "Networking Essentials", description: "A network discovery and inventory tool; use only on systems you own or are authorized to assess.", useCase: "Inventory a permitted lab network.", url: "https://nmap.org/book/man.html", level: "Deep practice" },
  { name: "PortSwigger Academy", category: "Security", forTrack: "Cybersecurity Analyst", description: "Interactive web-security labs with guided explanations and a safe practice context.", useCase: "Learn web security through authorized labs.", url: "https://portswigger.net/web-security", level: "Start here" },
  { name: "OWASP Top 10", category: "Security", forTrack: "Cybersecurity Analyst", description: "A community reference for common web-application security risks and their prevention context.", useCase: "Frame a web risk conversation.", url: "https://owasp.org/www-project-top-ten/", level: "Build with it" },
  { name: "GitHub Desktop", category: "Build", forTrack: "Web Builder", description: "A visual Git client that makes commits, branches, and pull requests more approachable.", useCase: "Version a first portfolio project.", url: "https://desktop.github.com/", level: "Start here" },
  { name: "MDN Web Docs", category: "Reference", forTrack: "Web Builder", description: "A browser-focused reference for HTML, CSS, JavaScript, and web platform APIs.", useCase: "Check how a browser feature works.", url: "https://developer.mozilla.org/", level: "Build with it" },
  { name: "Postman", category: "Build", forTrack: "Automation & Data", description: "An API client for testing requests, saving collections, and documenting responses.", useCase: "Inspect an API before writing code against it.", url: "https://www.postman.com/", level: "Start here" },
  { name: "Python Requests", category: "Reference", forTrack: "Automation & Data", description: "A practical Python library for making HTTP requests and handling responses.", useCase: "Automate a small public-data request.", url: "https://requests.readthedocs.io/", level: "Build with it" },
  { name: "Cisco Packet Tracer", category: "Networking", forTrack: "Networking Essentials", description: "A network simulation workspace for learning topology, configuration, and basic packet flow.", useCase: "Build a safe switching and routing lab.", url: "https://www.netacad.com/courses/packet-tracer", level: "Deep practice" },
  { name: "Cheatography", category: "Reference", forTrack: "IT Foundations", description: "Community-maintained quick reference sheets across software, operating systems, and development topics.", useCase: "Find a concise reminder, then verify it in primary docs.", url: "https://cheatography.com/", level: "Start here" },
  { name: "CircuitVerse", category: "Logic", forTrack: "Digital Logic & Computer Design", description: "A visual circuit design workspace for creating and simulating small digital-logic circuits in the browser.", useCase: "Test a gate, multiplexer, register, or small CPU component.", url: "https://circuitverse.org/", level: "Start here" },
  { name: "Logisim-evolution", category: "Logic", forTrack: "Digital Logic & Computer Design", description: "An open-source digital circuit simulator for exploring logic gates, combinational circuits, and computer architecture.", useCase: "Build and inspect a digital logic project locally.", url: "https://github.com/logisim-evolution/logisim-evolution", level: "Build with it" },
  { name: "Nand2Tetris Software Suite", category: "Logic", forTrack: "Digital Logic & Computer Design", description: "Course tools that support building a computer from elementary logic gates through higher-level software.", useCase: "Work through a staged computer-construction curriculum.", url: "https://www.nand2tetris.org/software", level: "Deep practice" },
  { name: "Docker", category: "Cloud", forTrack: "Cloud Computing Foundations", description: "A container platform for packaging an application and its dependencies into repeatable local environments.", useCase: "Run a small service consistently in a local practice environment.", url: "https://docs.docker.com/get-started/", level: "Build with it" },
  { name: "Terraform", category: "Cloud", forTrack: "Cloud Computing Foundations", description: "Infrastructure-as-code tooling for describing and reviewing infrastructure changes before applying them.", useCase: "Practice expressing a simple infrastructure plan as version-controlled code.", url: "https://developer.hashicorp.com/terraform/tutorials", level: "Deep practice" },
  { name: "Cloud Custodian", category: "Cloud", forTrack: "Cloud Computing Foundations", description: "Policy-as-code tooling for evaluating cloud resources against operational rules.", useCase: "Learn how teams describe guardrails for a permitted cloud account.", url: "https://cloudcustodian.io/docs/", level: "Deep practice" },
  { name: "Qiskit", category: "Quantum", forTrack: "Quantum Computing Primer", description: "An open-source SDK for representing quantum circuits, simulations, and related quantum-information workflows.", useCase: "Model a small circuit and compare simulated outcomes.", url: "https://qiskit.qotlabs.org/learning", level: "Build with it" },
  { name: "IBM Quantum Composer", category: "Quantum", forTrack: "Quantum Computing Primer", description: "A visual quantum-circuit interface for exploring gates and measurement outcomes with guided documentation.", useCase: "Sketch a simple circuit before writing code.", url: "https://quantum.ibm.com/composer", level: "Start here" },
  { name: "DuckDB", category: "Data", forTrack: "Data & Databases", description: "An analytical database that runs locally and makes it practical to query files with SQL.", useCase: "Explore a CSV or Parquet file without provisioning a server.", url: "https://duckdb.org/docs/stable/", level: "Build with it" },
  { name: "DB Fiddle", category: "Data", forTrack: "Data & Databases", description: "A browser-based SQL sandbox for trying short queries against supported database dialects.", useCase: "Test a small SQL idea before moving to a local or shared database.", url: "https://dbfiddle.uk/", level: "Start here" },
  { name: "Mermaid Live", category: "Systems", forTrack: "Systems & Service Design", description: "An online editor for rendering versionable diagrams from concise Mermaid syntax.", useCase: "Draft a service, sequence, or dependency diagram quickly.", url: "https://mermaid.live/", level: "Start here" },
  { name: "OpenTelemetry", category: "Systems", forTrack: "Systems & Service Design", description: "An observability framework for producing and collecting traces, metrics, and logs across systems.", useCase: "Learn the signals that make a service diagnosable.", url: "https://opentelemetry.io/docs/", level: "Deep practice" },
];

export const techniques = [
  { number: "01", title: "Learn in loops", text: "Read a concept, try it in a safe lab, then record what happened in your own words." },
  { number: "02", title: "Keep a lab journal", text: "Capture commands, outputs, assumptions, and the next question. Good notes become your reference." },
  { number: "03", title: "Use least privilege", text: "Work with the smallest necessary permission and test only systems you own or are explicitly authorized to assess." },
  { number: "04", title: "Build visible proof", text: "Turn milestones into small repos, diagrams, write-ups, or projects that show how you reasoned." },
];

export const studyChecklist = [
  "Choose one track for the next 30 days",
  "Set up a safe practice environment",
  "Schedule two focused study blocks this week",
  "Record one lesson learned after each session",
];
