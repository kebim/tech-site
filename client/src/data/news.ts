/**
 * Industrial Field Manual design reminder: News entries use a neutral summary, a published date,
 * an editorial “why it matters” note, and a primary source URL. Add newest items at the top.
 */
export type TechNewsItem = {
  id: string;
  published: string;
  category: "AI" | "Cybersecurity" | "Cloud" | "Linux" | "Networking";
  title: string;
  summary: string;
  whyItMatters: string;
  sourceName: string;
  sourceUrl: string;
};

export const techNews: TechNewsItem[] = [
  {
    id: "cisa-kev-trueconf",
    published: "20 Aug 2026",
    category: "Cybersecurity",
    title: "CISA adds two TrueConf Server issues to its known-exploited catalog",
    summary: "CISA added two vulnerabilities affecting TrueConf Server to its Known Exploited Vulnerabilities Catalog, citing evidence of active exploitation.",
    whyItMatters: "This is a good reminder to prioritize externally exposed systems, track authoritative vulnerability catalogs, and verify that patching plans include evidence checks—not only version updates.",
    sourceName: "CISA alert",
    sourceUrl: "https://www.cisa.gov/news-events/alerts/2026/08/20/cisa-adds-two-known-exploited-vulnerabilities-catalog",
  },
  {
    id: "google-ai-july-recap",
    published: "04 Aug 2026",
    category: "AI",
    title: "Google recaps new Gemini models and robotics research updates",
    summary: "Google’s July update recap highlighted new Gemini models aimed at production AI-agent workloads and Gemini Robotics ER 2 for embodied-reasoning research.",
    whyItMatters: "For learners, the useful question is not only what a new model can do, but which reliability, cost, latency, evaluation, and safety constraints remain when moving from a demo to a system.",
    sourceName: "Google News",
    sourceUrl: "https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-july-2026/",
  },
];
