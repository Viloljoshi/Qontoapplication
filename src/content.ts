export type CaseScenarioKey = "current" | "resolved" | "sanctions";

export type EvidenceItem = {
  id: string;
  label: string;
  source: string;
  status: "trusted" | "conflict" | "missing" | "material";
  detail: string;
  provenance: string;
};

export type CaseScenario = {
  key: CaseScenarioKey;
  tab: string;
  decision: string;
  tone: "clear" | "review" | "stop";
  reason: string;
  next: string;
  evidence: EvidenceItem[];
};

export function getDecisionState(input: {
  ownershipConflict: boolean;
  materialSanctionsAmbiguity: boolean;
}) {
  if (input.materialSanctionsAmbiguity) return "escalate" as const;
  if (input.ownershipConflict) return "review" as const;
  return "straight-through" as const;
}

const sharedEvidence: EvidenceItem[] = [
  {
    id: "registry",
    label: "Company register",
    source: "Official register",
    status: "trusted",
    detail: "Lumen Bikes GmbH is active. Registered address and managing director match the application.",
    provenance: "Retrieved 15 Sep 2026 · source snapshot retained",
  },
  {
    id: "identity",
    label: "Representative identity",
    source: "Identity provider",
    status: "trusted",
    detail: "Marta Klein passed document and liveness checks. Name and date of birth match the application.",
    provenance: "Provider result · model v4.12 · score retained",
  },
  {
    id: "eligibility",
    label: "Market + legal form",
    source: "Policy service",
    status: "trusted",
    detail: "Germany and the stated legal form follow the fictional case policy used for this prototype.",
    provenance: "Illustrative policy DE-GMBH-18 · effective 01 Sep 2026",
  },
];

export const caseScenarios: Record<CaseScenarioKey, CaseScenario> = {
  current: {
    key: "current",
    tab: "Current Case",
    decision: "Human Review",
    tone: "review",
    reason: "The uploaded shareholder list conflicts with the official register. Ownership remains unresolved.",
    next: "Request dated ownership evidence. Keep all cleared checks intact.",
    evidence: [
      ...sharedEvidence,
      {
        id: "ownership",
        label: "Ownership structure",
        source: "Register + uploaded list",
        status: "conflict",
        detail: "The register shows 60/40 ownership. The uploaded shareholder list shows 75/25. The system cannot establish the current structure.",
        provenance: "Conflict found by comparison agent · both originals linked",
      },
      {
        id: "sanctions",
        label: "Sanctions screening",
        source: "Screening provider",
        status: "trusted",
        detail: "No material match found for the company, representative, or declared owners in this fictional case.",
        provenance: "Provider response retained · query + list version recorded",
      },
    ],
  },
  resolved: {
    key: "resolved",
    tab: "Evidence Resolved",
    decision: "Eligible for Straight-Through Resolution",
    tone: "clear",
    reason: "A dated filing receipt resolves the ownership mismatch. Required evidence and hard checks now agree.",
    next: "Resolve without a reviewer if live policy and quality gates pass.",
    evidence: [
      ...sharedEvidence,
      {
        id: "ownership",
        label: "Ownership structure",
        source: "Register + filing receipt",
        status: "trusted",
        detail: "A dated filing receipt explains the register lag and supports the 75/25 structure declared by the applicant.",
        provenance: "Document extracted · critical fields cross-checked · original retained",
      },
      {
        id: "sanctions",
        label: "Sanctions screening",
        source: "Screening provider",
        status: "trusted",
        detail: "No material match found for the company, representative, or declared owners in this fictional case.",
        provenance: "Provider response retained · query + list version recorded",
      },
    ],
  },
  sanctions: {
    key: "sanctions",
    tab: "Material Ambiguity",
    decision: "Escalate",
    tone: "stop",
    reason: "A potential sanctions match has material ambiguity. Confidence cannot grant authority to clear it.",
    next: "Route to an authorised specialist with source records and match factors.",
    evidence: [
      ...sharedEvidence,
      {
        id: "ownership",
        label: "Ownership structure",
        source: "Register + filing receipt",
        status: "trusted",
        detail: "The ownership structure is supported by dated evidence. Both owners remain in screening scope.",
        provenance: "Document extracted · critical fields cross-checked · original retained",
      },
      {
        id: "sanctions",
        label: "Sanctions screening",
        source: "Screening provider",
        status: "material",
        detail: "A name and date-of-birth overlap needs specialist judgment. The agent has not cleared or dismissed the result.",
        provenance: "Raw match factors linked · provider + list version recorded",
      },
    ],
  },
};

export const decisionElements = [
  {
    name: "Entity",
    short: "Who and what",
    detail: "Company, representative, owners, roles, and relationships form one versioned graph.",
  },
  {
    name: "Evidence",
    short: "Proof",
    detail: "Original documents, provider results, and registry records support each material assertion.",
  },
  {
    name: "Policy",
    short: "Required state",
    detail: "Market, legal form, risk tier, and effective date determine the required checks and authority.",
  },
  {
    name: "Signals",
    short: "Risk input",
    detail: "Identity, fraud, sanctions, document, and ownership signals retain their source and confidence.",
  },
  {
    name: "Decision",
    short: "Outcome",
    detail: "Resolve, ask, review, escalate, or decline, with an explicit reason and next action.",
  },
  {
    name: "Provenance",
    short: "Reproduce it",
    detail: "Source, rule, model, prompt, tool call, reviewer, and timestamp explain how the outcome was reached.",
  },
];

export const sources = [
  {
    id: 1,
    label: "Qonto Role",
    title: "Senior Product Manager - Due Diligence",
    url: "https://jobs.lever.co/qonto/ccebc25a-cc07-458e-bf9b-d36c33de441c",
    note: "Role scope, agentic workflows, periodic reviews, reviewer migration, 600,000+ customers, and 8 markets.",
  },
  {
    id: 2,
    label: "Qonto About",
    title: "About Qonto",
    url: "https://qonto.com/en/about",
    note: "Public company scale and payment-institution status.",
  },
  {
    id: 3,
    label: "Qonto Onboarding",
    title: "Open a Business Account Online",
    url: "https://qonto.com/en/open-an-account",
    note: "Public account-opening steps and examples of identity, company, and beneficial-owner evidence.",
  },
  {
    id: 4,
    label: "Qonto Reviews",
    title: "Common Questions About Periodic Reviews",
    url: "https://support-fr.qonto.com/hc/en-us/articles/50470299693585-What-are-the-common-questions-about-periodic-reviews",
    note: "Public description of periodic reviews for active accounts and customer document requests.",
  },
  {
    id: 5,
    label: "Qonto AI",
    title: "Qonto AI Agents",
    url: "https://qonto.com/en/ai",
    note: "Qonto’s public pattern of AI preparing work while customers retain control over consequential actions.",
  },
  {
    id: 6,
    label: "EU AMLR",
    title: "Regulation (EU) 2024/1624",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1624",
    note: "Risk-based periodic and event-triggered updates. The regulation applies from 10 July 2027.",
  },
];
