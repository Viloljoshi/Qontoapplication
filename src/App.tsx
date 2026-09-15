import { useEffect, useMemo, useState } from "react";
import {
  caseScenarios,
  decisionElements,
  sources,
  type CaseScenarioKey,
  type EvidenceItem,
} from "./content";

type ViewMode = "brief" | "deep-dive";

const chapterLinks = [
  ["01", "The Challenge", "challenge"],
  ["02", "Decision State", "decision-state"],
  ["03", "Case Packet", "case-packet"],
  ["04", "Agent Autonomy", "bounded-agents"],
  ["05", "Periodic Review", "periodic-review"],
  ["06", "Migration", "migration"],
  ["07", "Measure + Start", "measure"],
];

function readView(): ViewMode {
  return new URLSearchParams(window.location.search).get("view") === "deep-dive"
    ? "deep-dive"
    : "brief";
}

function readCase(): CaseScenarioKey {
  const value = new URLSearchParams(window.location.search).get("case");
  return value === "resolved" || value === "sanctions" ? value : "current";
}

function updateQuery(values: Record<string, string>) {
  const url = new URL(window.location.href);
  Object.entries(values).forEach(([key, value]) => url.searchParams.set(key, value));
  window.history.replaceState({}, "", url);
}

function SourceRef({ id }: { id: number }) {
  const source = sources.find((item) => item.id === id);
  if (!source) return null;
  return (
    <a
      className="source-ref"
      href={source.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Source ${id}: ${source.title}`}
    >
      {id}
    </a>
  );
}

function EvidenceTag({ children, type }: { children: React.ReactNode; type: "observed" | "hypothesis" | "validate" }) {
  return <span className={`evidence-tag ${type}`}>{children}</span>;
}

function AppHeader({ view, onView }: { view: ViewMode; onView: (view: ViewMode) => void }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="#top" aria-label="Return to top">
          <span className="brand-mark" aria-hidden="true">D</span>
          <span>
            <strong>Qonto Due Diligence</strong>
            <small>Outside-in product proposal</small>
          </span>
        </a>
        <div className="header-actions">
          <div className="view-switch" aria-label="Choose reading mode">
            <button
              type="button"
              className={view === "brief" ? "active" : ""}
              aria-pressed={view === "brief"}
              onClick={() => onView("brief")}
            >
              Brief <span>5 min</span>
            </button>
            <button
              type="button"
              className={view === "deep-dive" ? "active" : ""}
              aria-pressed={view === "deep-dive"}
              onClick={() => onView("deep-dive")}
            >
              Interactive Model
            </button>
          </div>
          {view === "brief" && (
            <button className="print-button" type="button" onClick={() => window.print()}>
              Print Brief
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function BriefDecisionModel() {
  return (
    <div className="brief-model" aria-label="Decision state model">
      {decisionElements.map((item, index) => (
        <div className="brief-model-item" key={item.name}>
          <span className="model-index">0{index + 1}</span>
          <strong>{item.name}</strong>
          <small>{item.short}</small>
        </div>
      ))}
    </div>
  );
}

function ExecutiveBrief() {
  return (
    <main className="brief" id="main-content">
      <article className="brief-page brief-page-one">
        <div className="brief-kicker">
          <span>Senior Product Manager · Due Diligence</span>
          <span>Outside-in proposal · 15 Sep 2026</span>
        </div>
        <section className="brief-hero">
          <p className="overline">A product thesis for Qonto</p>
          <h1>A Trustworthy Decision System for Due Diligence</h1>
          <p className="brief-deck">
            Reduce avoidable customer and reviewer work while preserving evidence, control, and a reproducible reason for every outcome.
          </p>
        </section>

        <section className="brief-observation-grid" aria-label="Evidence discipline">
          <div>
            <EvidenceTag type="observed">Observed</EvidenceTag>
            <p>
              Qonto serves 600,000+ customers in 8 markets. Account opening and periodic review use identity, company, and beneficial-owner evidence.<SourceRef id={1} /><SourceRef id={2} /><SourceRef id={3} />
            </p>
          </div>
          <div>
            <EvidenceTag type="hypothesis">Hypothesis</EvidenceTag>
            <p>
              Scale creates repeated evidence requests and reviewer work when customer state, policy, and tool state do not stay aligned.
            </p>
          </div>
          <div>
            <EvidenceTag type="validate">To Validate</EvidenceTag>
            <p>
              Baseline rework, top exception reasons, evidence reuse, reviewer handling time, and decision-quality thresholds.
            </p>
          </div>
        </section>

        <section className="brief-thesis">
          <span className="section-number">01</span>
          <div>
            <p className="overline">The Product Problem</p>
            <h2>
              Keep one trustworthy decision state as identity, company, ownership, evidence, policy, and risk change across countries and time.
            </h2>
          </div>
          <p>
            Public Qonto material shows the breadth of evidence used at account opening and confirms recurring reviews for active accounts.<SourceRef id={2} /><SourceRef id={3} /> The product opportunity is to make each decision clear, current, and recoverable while routing material ambiguity to specialists.
          </p>
        </section>

        <section className="brief-system">
          <div className="section-line">
            <p className="overline">The Product Model</p>
            <p className="line-note">A shared state across onboarding and review</p>
          </div>
          <BriefDecisionModel />
          <p className="manifesto">Due diligence is a decision system, not a checklist.</p>
        </section>

        <footer className="brief-page-footer">
          <span>Vilol Joshi</span>
          <span>Page 1 / 2</span>
        </footer>
      </article>

      <article className="brief-page brief-page-two">
        <div className="brief-kicker">
          <span>Worked Example · Fictional SME</span>
          <span>Lumen Bikes GmbH · Germany</span>
        </div>
        <section className="brief-case">
          <div className="brief-case-title">
            <div>
              <p className="overline">Why Is This Case in Review?</p>
              <h2>One conflict. Four cleared checks. One targeted request.</h2>
            </div>
            <div className="decision-stamp review">
              <span>Current Decision</span>
              <strong>Specialist Review</strong>
            </div>
          </div>

          <div className="brief-case-grid">
            <div className="case-mini-list">
              <p className="overline">Already Cleared</p>
              <ul>
                <li><span aria-hidden="true">✓</span> Company exists</li>
                <li><span aria-hidden="true">✓</span> Representative authority</li>
                <li><span aria-hidden="true">✓</span> Identity verification</li>
                <li><span aria-hidden="true">✓</span> No material sanctions match</li>
              </ul>
            </div>
            <div className="case-conflict">
              <p className="overline">Unresolved</p>
              <strong>Ownership evidence conflicts</strong>
              <p>Official register: 60/40</p>
              <p>Uploaded list: 75/25</p>
            </div>
            <div className="case-next">
              <p className="overline">Recommended Next Step</p>
              <strong>Request dated ownership evidence</strong>
              <p>Keep every cleared check. Send the reviewer both originals, the mismatch, and the applicable rule.</p>
            </div>
          </div>
          <p className="fiction-note">Fictional case and illustrative decision logic. No Qonto customer data, screen, threshold, or internal policy is represented.</p>
        </section>

        <section className="brief-approach">
          <p className="overline">How I Would Build It</p>
          <div className="approach-steps">
            <div><span>01</span><strong>Baseline</strong><p>Map policy, queues, exceptions, overrides, and failure costs.</p></div>
            <div><span>02</span><strong>Prove</strong><p>Run a golden case set in shadow mode. Calibrate by cohort.</p></div>
            <div><span>03</span><strong>Assist</strong><p>Give reviewers a compact packet and capture each correction.</p></div>
            <div><span>04</span><strong>Migrate</strong><p>Move cohorts with stop gates, rollback, and signed control evidence.</p></div>
          </div>
        </section>

        <section className="brief-outcomes">
          <div>
            <p className="overline">North-Star Candidate</p>
            <h3>Trustworthy Straight-Through Resolution</h3>
            <p>Eligible cases resolved without human intervention while meeting decision-quality and control thresholds.</p>
          </div>
          <div className="metric-quadrants">
            <span>Customer <b>requests + wait</b></span>
            <span>Ops <b>handling + rework</b></span>
            <span>Control <b>false clears + misses</b></span>
            <span>System <b>latency + recovery</b></span>
          </div>
        </section>

        <section className="brief-credibility">
          <div>
            <p className="overline">Relevant Prior Pattern · Solytics Partners</p>
            <p>
              I led regulated compliance-product work using OCR + LLM extraction, field confidence, exception routing, policy guards, scoped tool execution, and audit trails. Prior-role outcomes included a 45% reduction in compliance review effort and a 25% cut in AML/KYC integration turnaround. These are prior-role results, not Qonto estimates.
            </p>
          </div>
          <div>
            <p className="overline">First 30 Days</p>
            <p>
              Validate the top 3 exception families, reconstruct 25 recent decisions with Ops and Compliance, define quality gates, and select one bounded cohort for shadow evaluation.
            </p>
          </div>
        </section>

        <div className="brief-close">
          <p>Open the Interactive Model for the case packet, autonomy gates, periodic-review model, migration ladder, and KPI tree.</p>
        </div>
        <footer className="brief-page-footer">
          <span>Vilol Joshi · Product hypothesis, based on public sources</span>
          <span>Page 2 / 2</span>
        </footer>
      </article>
    </main>
  );
}

type LensProps = {
  problem: string;
  hypothesis: string;
  approach: string;
  risk: string;
  measure: string;
  partners: string;
};

function SectionLens(props: LensProps) {
  return (
    <div className="section-lens" aria-label="Product decision summary">
      {Object.entries(props).map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}

function ChangeMind({ children }: { children: React.ReactNode }) {
  return (
    <aside className="change-mind">
      <span>What Would Change My Mind?</span>
      <p>{children}</p>
    </aside>
  );
}

function ChapterHeading({ number, label, title, intro }: { number: string; label: string; title: string; intro: React.ReactNode }) {
  return (
    <header className="chapter-heading">
      <div className="chapter-index">{number}</div>
      <div>
        <p className="overline">{label}</p>
        <h2>{title}</h2>
        <p className="chapter-intro">{intro}</p>
      </div>
    </header>
  );
}

function DecisionStateVisual() {
  const [active, setActive] = useState(0);
  return (
    <div className="decision-visual">
      <div className="decision-chain" aria-label="Select a decision-state element">
        {decisionElements.map((item, index) => (
          <button
            type="button"
            key={item.name}
            className={active === index ? "active" : ""}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            <strong>{item.name}</strong>
          </button>
        ))}
      </div>
      <div className="decision-detail" aria-live="polite">
        <span>{decisionElements[active].short}</span>
        <p>{decisionElements[active].detail}</p>
      </div>
      <div className="state-output">
        <span>Versioned Input</span>
        <i aria-hidden="true">→</i>
        <span>Explainable Outcome</span>
        <i aria-hidden="true">→</i>
        <span>Reproducible Record</span>
      </div>
    </div>
  );
}

function evidenceStateLabel(status: EvidenceItem["status"]) {
  if (status === "trusted") return "Trusted";
  if (status === "conflict") return "Conflict";
  if (status === "material") return "Material";
  return "Missing";
}

function CasePacket({ scenarioKey, onScenario }: { scenarioKey: CaseScenarioKey; onScenario: (key: CaseScenarioKey) => void }) {
  const scenario = caseScenarios[scenarioKey];
  const [selectedId, setSelectedId] = useState("ownership");
  const [action, setAction] = useState("");
  const selected = useMemo(
    () => scenario.evidence.find((item) => item.id === selectedId) ?? scenario.evidence[0],
    [scenario, selectedId],
  );

  const actionLabel =
    scenarioKey === "current"
      ? "Draft Evidence Request"
      : scenarioKey === "resolved"
        ? "Inspect Decision Trace"
        : "Open Escalation Packet";

  return (
    <div className="case-demo">
      <div className="scenario-tabs" role="tablist" aria-label="Fictional case states">
        {(Object.keys(caseScenarios) as CaseScenarioKey[]).map((key) => (
          <button
            type="button"
            role="tab"
            id={`scenario-${key}`}
            aria-controls="scenario-panel"
            aria-selected={scenarioKey === key}
            tabIndex={scenarioKey === key ? 0 : -1}
            key={key}
            onClick={() => {
              setAction("");
              onScenario(key);
            }}
          >
            {caseScenarios[key].tab}
          </button>
        ))}
      </div>

      <div className="case-shell" id="scenario-panel" role="tabpanel" aria-labelledby={`scenario-${scenarioKey}`}>
        <header className="case-header">
          <div>
            <p className="overline">DD-04821 · Fictional SME</p>
            <h3>Lumen Bikes GmbH</h3>
            <p>Germany · GmbH · New relationship</p>
          </div>
          <div className={`decision-stamp ${scenario.tone}`} aria-live="polite">
            <span>Current Decision</span>
            <strong>{scenario.decision}</strong>
          </div>
        </header>

        <div className="case-workspace">
          <section className="entity-panel" aria-label="Entity graph">
            <p className="panel-label">Entity Graph</p>
            <div className="entity-root">Lumen Bikes GmbH</div>
            <div className="entity-branch">
              <div><span>represented by</span><strong>Marta Klein</strong><small>Managing director</small></div>
              <div><span>owned by</span><strong>Marta Klein</strong><small>Declared 75%</small></div>
              <div><span>owned by</span><strong>Jonas Weber</strong><small>Declared 25%</small></div>
            </div>
          </section>

          <section className="evidence-panel" aria-label="Evidence list">
            <p className="panel-label">Evidence + Checks</p>
            <div className="evidence-list">
              {scenario.evidence.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={selected.id === item.id ? "selected" : ""}
                  aria-pressed={selected.id === item.id}
                  onClick={() => setSelectedId(item.id)}
                >
                  <span className={`status-dot ${item.status}`} aria-hidden="true" />
                  <span><strong>{item.label}</strong><small>{item.source}</small></span>
                  <em>{evidenceStateLabel(item.status)}</em>
                </button>
              ))}
            </div>
          </section>

          <section className="evidence-detail" aria-live="polite">
            <p className="panel-label">Selected Evidence</p>
            <span className={`status-label ${selected.status}`}>{evidenceStateLabel(selected.status)}</span>
            <h4>{selected.label}</h4>
            <p>{selected.detail}</p>
            <div className="provenance-note"><span>Provenance</span>{selected.provenance}</div>
          </section>
        </div>

        <footer className="case-footer">
          <div>
            <span>Why this outcome</span>
            <p>{scenario.reason}</p>
          </div>
          <div>
            <span>Recommended next step</span>
            <p>{scenario.next}</p>
          </div>
          <button
            type="button"
            onClick={() => setAction("Prototype action prepared. No external action was taken.")}
          >
            {actionLabel}
          </button>
        </footer>
        <p className="action-feedback" role="status">{action}</p>
      </div>
      <p className="fiction-note">Fictional case and illustrative rules. Built to show the product model, not to copy a Qonto screen or policy.</p>
    </div>
  );
}

function AgentWorkflow() {
  const steps = [
    ["01", "Trigger", "Signup, review, material change"],
    ["02", "Plan", "Select permitted checks + tools"],
    ["03", "Investigate", "Gather, compare, retry"],
    ["04", "Verify", "Evidence + policy + permission"],
    ["05", "Commit", "Resolve, ask, or escalate"],
    ["06", "Observe", "Trace, sample, evaluate"],
  ];
  return (
    <div className="agent-flow" aria-label="Bounded agent workflow">
      {steps.map(([number, title, note]) => (
        <div key={number}>
          <span>{number}</span>
          <strong>{title}</strong>
          <small>{note}</small>
        </div>
      ))}
    </div>
  );
}

function AutonomyGate() {
  const gates = [
    ["01", "Policy", "A versioned rule permits this outcome."],
    ["02", "Evidence", "Required proof is present and source-linked."],
    ["03", "Permission", "The agent and tool hold scoped authority."],
    ["04", "Evaluation", "The cohort clears its signed quality floor."],
  ];

  return (
    <div className="autonomy-gate" aria-label="Four gates for autonomous action">
      <div className="autonomy-gate-heading">
        <div>
          <p className="overline">Autonomy Gate</p>
          <h3>All four gates must pass before an agent commits a decision.</h3>
        </div>
        <p>Model confidence can inform a gate. It cannot grant authority.</p>
      </div>
      <div className="autonomy-gate-grid">
        {gates.map(([number, title, note]) => (
          <div key={number}>
            <span>{number}</span>
            <strong>{title}</strong>
            <p>{note}</p>
          </div>
        ))}
      </div>
      <div className="autonomy-outcomes">
        <div><span>4 / 4 pass</span><strong>Commit routine outcome</strong><p>Write the decision, reason, evidence links, and execution trace.</p></div>
        <div><span>Any gate fails</span><strong>Recover or escalate</strong><p>Retry an approved path or send one precise question to a specialist.</p></div>
      </div>
    </div>
  );
}

function BuildPartnerBoundary() {
  return (
    <div className="build-boundary">
      <div className="section-line">
        <p className="overline">Build + Partner Boundary · Hypothesis</p>
        <p className="line-note">Own the decision. Keep signal providers replaceable.</p>
      </div>
      <div className="build-boundary-grid">
        <div>
          <span>Own</span>
          <strong>Decision layer</strong>
          <p>Entity state, policy orchestration, evidence lineage, authority, decision reason, and audit record.</p>
        </div>
        <div>
          <span>Partner</span>
          <strong>Specialist evidence</strong>
          <p>Identity and liveness, company registers, sanctions data, and document-authenticity signals.</p>
        </div>
        <div>
          <span>Design for Change</span>
          <strong>Stable contracts</strong>
          <p>Common schemas, provider replay, shadow challengers, fallback paths, and source-level quality measures.</p>
        </div>
      </div>
      <p className="boundary-criteria">Decide with market coverage, evidence quality, explainability, data residency, failure recovery, latency, and total cost.</p>
    </div>
  );
}

function SolyticsProof() {
  return (
    <section className="solytics-proof" aria-labelledby="solytics-proof-title">
      <header>
        <div>
          <p className="overline">Built Before · Solytics Partners</p>
          <h3 id="solytics-proof-title">A governed compliance-agent pattern</h3>
        </div>
        <span>Prior-role evidence · No Qonto estimate</span>
      </header>
      <div className="solytics-proof-grid">
        <div>
          <span>Product Problem</span>
          <p>Modernise a legacy compliance platform for enterprise banking teams without weakening security or regulatory sign-off.</p>
        </div>
        <div>
          <span>System I Led</span>
          <p>OCR + LLM extraction, field confidence, pre/post-model guards, scoped tool calls, verification, and an audit trail.</p>
        </div>
        <div>
          <span>Operating Model</span>
          <p>Routine evidence followed governed paths. Specialists handled exceptions. Golden cases and reviewer corrections fed regression and cohort evaluation.</p>
        </div>
        <div className="solytics-results">
          <span>Previous-Role Results</span>
          <strong>45%</strong><p>less compliance review effort</p>
          <strong>25%</strong><p>faster AML/KYC integration turnaround</p>
        </div>
      </div>
      <footer>
        <span>Transferable principle</span>
        <p>Give the agent narrow authority, test the full action path, and preserve the evidence behind each result.</p>
      </footer>
    </section>
  );
}

function DeepDive({ scenarioKey, onScenario }: { scenarioKey: CaseScenarioKey; onScenario: (key: CaseScenarioKey) => void }) {
  return (
    <main className="deep-dive" id="main-content">
      <aside className="chapter-rail" aria-label="Deep dive chapters">
        <p>Reading Path</p>
        <nav>
          {chapterLinks.map(([number, label, id]) => (
            <a href={`#${id}`} key={id}><span>{number}</span>{label}</a>
          ))}
        </nav>
        <div className="rail-note">
          <span>Evidence Discipline</span>
          <p>Observed facts, hypotheses, and open questions stay separate.</p>
        </div>
      </aside>

      <div className="chapters">
        <section className="chapter chapter-opening" id="challenge">
          <ChapterHeading
            number="01"
            label="The Challenge"
            title="Reduce unnecessary due-diligence work without weakening control."
            intro="Entry checks, periodic review, reviewer work, and migration all depend on the same unit: a decision state that remains current, explainable, and recoverable."
          />
          <div className="evidence-board">
            <article>
              <EvidenceTag type="observed">Observed</EvidenceTag>
              <h3>Scale + Scope</h3>
              <p>Qonto reports 600,000+ customers across 8 markets. Public flows use identity, company, and ownership evidence at account opening and during recurring reviews.<SourceRef id={1} /><SourceRef id={2} /><SourceRef id={3} /></p>
            </article>
            <article>
              <EvidenceTag type="hypothesis">Hypothesis</EvidenceTag>
              <h3>Decision-State Debt</h3>
              <p>Each new market, legal form, evidence source, and policy version can add customer requests and reviewer work when state becomes fragmented.</p>
            </article>
            <article>
              <EvidenceTag type="validate">To Validate</EvidenceTag>
              <h3>Where Work Accumulates</h3>
              <p>Top exception families, repeated requests, queue delay, reviewer corrections, false-clear risk, and legacy-tool gaps.</p>
            </article>
          </div>
          <div className="problem-equation" aria-label="Problem equation">
            <span>Markets</span><b>×</b><span>Legal Forms</span><b>×</b><span>Lifecycle Events</span><b>×</b><span>Policy Versions</span><b>→</b><strong>Decision State</strong>
          </div>
          <ChangeMind>
            If internal data shows that evidence reuse, state fragmentation, and review rework are minor, I would target the largest verified exception family instead of building a broad state layer.
          </ChangeMind>
          <SectionLens
            problem="Repeated work can hide inside fragmented state."
            hypothesis="A shared decision state removes avoidable work."
            approach="Baseline exceptions and reconstruct recent cases."
            risk="A platform layer can outrun proven use cases."
            measure="Rework, request rate, decision quality."
            partners="Ops, Compliance, Risk, Country teams."
          />
        </section>

        <section className="chapter" id="decision-state">
          <ChapterHeading
            number="02"
            label="Product Model"
            title="Give every decision a complete, versioned state."
            intro="The model connects the customer, source evidence, effective policy, signals, outcome, and provenance. It supports onboarding, periodic review, QA, and audit from the same record."
          />
          <DecisionStateVisual />
          <div className="manifesto large">Due diligence is a decision system, not a checklist.</div>
          <details className="deep-note">
            <summary>Inspect the minimum decision record</summary>
            <div className="record-grid">
              <span>case_id</span><span>entity_graph_version</span><span>evidence_refs</span><span>policy_version</span><span>signal_versions</span><span>decision_reason</span><span>authority</span><span>tool_history</span><span>specialist_override</span><span>final_outcome</span>
            </div>
          </details>
          <SectionLens
            problem="A final label cannot explain itself."
            hypothesis="Versioned state makes decisions reproducible."
            approach="Define the minimum record around one case family."
            risk="Over-modeling slows delivery and reviewer work."
            measure="Decision reconstruction rate, missing provenance."
            partners="Engineering, Data, Compliance, Legal."
          />
        </section>

        <section className="chapter" id="case-packet">
          <ChapterHeading
            number="03"
            label="Worked Case"
            title="Send reviewers the question, the evidence, and the authority."
            intro="A reviewer should see why the case arrived, what already cleared, what remains unresolved, and which source or policy supports the next step. Try the 3 case states."
          />
          <CasePacket scenarioKey={scenarioKey} onScenario={onScenario} />
          <SectionLens
            problem="Reviewers rebuild context before they judge."
            hypothesis="A compact case packet cuts search and rework."
            approach="Design with reviewers using real exception families."
            risk="A summary can hide a material source detail."
            measure="Handling time, corrections, evidence opens."
            partners="Ops reviewers, Design, Compliance, QA."
          />
        </section>

        <section className="chapter" id="bounded-agents">
          <ChapterHeading
            number="04"
            label="Autonomous Workflow"
            title="Let agents finish routine cases inside a signed authority envelope."
            intro={<>An agent may plan, call approved tools, recover from provider failure, and commit an eligible case. Deterministic gates decide whether it has authority. Specialists handle policy gaps, material sanctions ambiguity, and adverse judgment. Qonto’s public AI and security pages describe approval boundaries, ML signals, and automated safeguards.<SourceRef id={4} /><SourceRef id={6} /></>}
          />
          <AgentWorkflow />

          <div className="mechanism-grid">
            <div className="mechanism-head"><span>Mechanism</span><span>Best Fit</span><span>Control</span></div>
            <div><strong>Policy Engine</strong><p>Eligibility, required checks, authority, hard stops</p><span>Versioned rules + tests</span></div>
            <div><strong>Multimodal Model</strong><p>Extract and reconcile documents, images, and free text</p><span>Field grounding + evals</span></div>
            <div><strong>Predictive ML + Graph</strong><p>Fraud risk, anomaly signals, entity resolution, network patterns</p><span>Cohort calibration + drift</span></div>
            <div><strong>Agent Runtime</strong><p>Plan, select tools, manage state, retry, and recover</p><span>Scoped identity + budgets</span></div>
            <div><strong>Specialist Authority</strong><p>Policy gaps, material ambiguity, adverse judgment</p><span>Case packet + override reason</span></div>
          </div>

          <AutonomyGate />

          <div className="agent-controls">
            <div>
              <p className="overline">Evidence Strength × Consequence</p>
              <div className="consequence-matrix" aria-label="Evidence strength by consequence matrix">
                <div className="axis y">Evidence Strength</div>
                <div className="axis x">Consequence</div>
                <div className="matrix-cell ask"><span>Weak evidence · Low consequence</span><strong>Agent Recovers</strong><small>Retry a source or request one missing field</small></div>
                <div className="matrix-cell human"><span>Weak evidence · High consequence</span><strong>Specialist Decides</strong><small>Ownership or sanctions ambiguity</small></div>
                <div className="matrix-cell automate"><span>Strong evidence · Low consequence</span><strong>Agent Acts</strong><small>Refresh a check or normalise a supported field</small></div>
                <div className="matrix-cell controlled"><span>Strong evidence · High consequence</span><strong>Rule-Gated Path</strong><small>Explicit authority + sampled oversight</small></div>
              </div>
            </div>
            <div className="autonomy-contract">
              <p className="overline">Agent Autonomy Contract</p>
              <div className="contract-half may">
                <span>May</span>
                <ul>
                  <li>Plan across approved tools</li>
                  <li>Retry through an approved fallback</li>
                  <li>Refresh expiring evidence</li>
                  <li>Resolve an eligible case after all gates pass</li>
                  <li>Send a policy-approved evidence request</li>
                </ul>
              </div>
              <div className="contract-half blocked">
                <span>Cannot</span>
                <ul>
                  <li>Change policy or thresholds</li>
                  <li>Create its own permissions</li>
                  <li>Overwrite source evidence</li>
                  <li>Clear material sanctions ambiguity</li>
                  <li>Issue an adverse outcome outside explicit authority</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="agent-reference-note">Current agent operations guidance treats identity, memory, tool access, policy checkpoints, tracing, and evaluation as one runtime control surface.<SourceRef id={7} /><SourceRef id={8} /> EU guidance also treats an agent’s external actions as part of the governed AI system.<SourceRef id={9} /></p>

          <BuildPartnerBoundary />
          <SolyticsProof />
          <SectionLens
            problem="A capable model can still lack authority."
            hypothesis="Four runtime gates let agents finish routine cases."
            approach="Start with one cohort, signed evals, and scoped tools."
            risk="Policy drift, tool failure, or permission creep changes outcomes."
            measure="False clears, gate failures, recovery, specialist overrides."
            partners="ML, Engineering, Risk, Security, Compliance."
          />
        </section>

        <section className="chapter" id="periodic-review">
          <ChapterHeading
            number="05"
            label="Periodic Review"
            title="Re-verify the material delta, subject to legal obligations."
            intro={<>Qonto’s customer help page confirms periodic checks for active accounts.<SourceRef id={3} /> EU AMLR, which applies from July 2027, also points to risk-based periodic and event-triggered updates.<SourceRef id={5} /> The product bet is to reuse trusted evidence when policy permits.</>}
          />
          <div className="delta-system">
            <div className="delta-input">
              <span>Last Verified State</span>
              <ul><li>Company active</li><li>Owners verified</li><li>ID valid</li><li>Risk tier set</li></ul>
            </div>
            <div className="delta-plus" aria-hidden="true">+</div>
            <div className="delta-input changed">
              <span>Material Delta</span>
              <ul><li className="muted">Company unchanged</li><li>Ownership filed</li><li className="muted">ID still valid</li><li>New risk signal</li></ul>
            </div>
            <div className="delta-arrow" aria-hidden="true">→</div>
            <div className="delta-output">
              <span>Targeted Review</span>
              <strong>2 questions</strong>
              <p>Ownership + new signal</p>
              <small>Preserve 2 trusted assertions</small>
            </div>
          </div>

          <div className="friction-budget">
            <div><span>Necessary</span><p>Required to establish current trust.</p></div>
            <div><span>Avoidable</span><p>Asking for evidence that remains valid.</p></div>
            <div><span>Misplaced</span><p>Applying a high-risk burden to a broad cohort.</p></div>
            <div><span>Invisible</span><p>Waiting while no customer action is possible.</p></div>
          </div>
          <ChangeMind>
            If policy, regulator expectations, or source reliability requires a full refresh for a cohort, the system should run that refresh. Delta logic narrows work where Compliance and Legal approve reuse.
          </ChangeMind>
          <SectionLens
            problem="A full restart repeats valid work."
            hypothesis="Trusted deltas can focus review effort."
            approach="Map obligations, event triggers, and evidence TTLs."
            risk="A missed change leaves stale customer knowledge."
            measure="Evidence reuse, requests, overdue reviews."
            partners="Compliance, Legal, Data, Country, Ops."
          />
        </section>

        <section className="chapter" id="migration">
          <ChapterHeading
            number="06"
            label="Reviewer Migration"
            title="Prove operating parity before retiring the legacy tool."
            intro="UI similarity cannot prove a safe migration. The new workflow must preserve decision quality, evidence, controls, throughput, auditability, and recovery for each cohort."
          />
          <div className="migration-ladder" aria-label="Migration phases">
            <div><span>01</span><strong>Baseline</strong><p>Cases, quality, controls, throughput</p></div>
            <div><span>02</span><strong>Shadow</strong><p>Compare outcomes with no authority</p></div>
            <div><span>03</span><strong>Assisted</strong><p>Reviewers use packets and correct them</p></div>
            <div><span>04</span><strong>Cohort Move</strong><p>Country + case type + stop gates</p></div>
            <div><span>05</span><strong>Decommission</strong><p>Evidence signed, fallback tested</p></div>
          </div>
          <div className="parity-grid">
            <p className="overline">Parity Means</p>
            <span>Decision Quality</span><span>Evidence Completeness</span><span>Control Coverage</span><span>Throughput</span><span>Auditability</span><span>Recoverability</span>
          </div>
          <details className="deep-note">
            <summary>Inspect cohort stop gates</summary>
            <div className="gate-list">
              <p><strong>Quality gate</strong> No material drop against signed golden cases.</p>
              <p><strong>Operations gate</strong> Queue age and handling time stay within agreed limits.</p>
              <p><strong>Control gate</strong> Required evidence, permissions, and audit events remain complete.</p>
              <p><strong>Recovery gate</strong> Team rehearses rollback and reconciles in-flight cases.</p>
            </div>
          </details>
          <ChangeMind>
            If the legacy tool encodes critical rules that the new platform cannot reproduce or observe, I would delay the affected cohort and expose those rules before migration.
          </ChangeMind>
          <SectionLens
            problem="A migration can preserve UI while losing control."
            hypothesis="Cohort evidence proves operating parity."
            approach="Baseline, shadow, assist, migrate, retire."
            risk="Hidden legacy logic or in-flight state is lost."
            measure="Parity gates, fallback use, queue stability."
            partners="Ops, Eng, Compliance, QA, Country teams."
          />
        </section>

        <section className="chapter" id="measure">
          <ChapterHeading
            number="07"
            label="Measurement + Collaboration"
            title="Optimise for straight-through resolution that remains trustworthy."
            intro="A speed metric alone can reward unsafe automation. The north-star candidate requires decision-quality and control thresholds before it counts an eligible case."
          />
          <div className="north-star">
            <div>
              <p className="overline">North-Star Candidate</p>
              <h3>Trustworthy Straight-Through Resolution</h3>
              <p>Eligible cases resolved without human intervention while meeting decision-quality and control thresholds.</p>
            </div>
            <div className="north-formula"><span>Eligible Auto-Resolved Cases</span><b>÷</b><span>Eligible Cases</span><small>Quality + control gates required</small></div>
          </div>
          <div className="kpi-tree" aria-label="KPI driver tree">
            <div className="kpi-root">Trustworthy STR</div>
            <div className="kpi-branch customer"><strong>Customer</strong><span>Requests per case</span><span>Time awaiting customer</span><span>Completion</span></div>
            <div className="kpi-branch ops"><strong>Operations</strong><span>Handling time</span><span>Rework</span><span>Queue age</span></div>
            <div className="kpi-branch quality"><strong>Decision Quality</strong><span>False clear</span><span>False escalation</span><span>Override rate</span></div>
            <div className="kpi-branch reliability"><strong>Reliability</strong><span>Provider failure</span><span>Decision latency</span><span>Recovery time</span></div>
          </div>

          <div className="collaboration-model">
            <p className="overline">One Decision, Shared Ownership</p>
            <div><span>Product</span><p>Outcome, sequence, trade-offs</p></div>
            <div><span>Compliance + Legal</span><p>Policy, authority, obligations</p></div>
            <div><span>Ops + Design</span><p>Case flow, judgment, feedback</p></div>
            <div><span>Risk + Data/ML</span><p>Signals, evaluation, drift</p></div>
            <div><span>Engineering</span><p>State, tools, reliability</p></div>
            <div><span>Country Teams</span><p>Local forms, sources, rollout</p></div>
          </div>

          <div className="first-thirty">
            <div className="first-thirty-title">
              <p className="overline">First 30 Days · Questions Before Roadmap</p>
              <h3>Leave with one measured problem and one safe cohort.</h3>
            </div>
            <div><span>Days 1-10</span><p>Shadow reviewers. Map the top exception families, policy owners, source failures, and customer requests.</p></div>
            <div><span>Days 11-20</span><p>Reconstruct 25 decisions with Ops and Compliance. Define a golden set and hard quality gates.</p></div>
            <div><span>Days 21-30</span><p>Select one bounded cohort for shadow evaluation. Agree stop gates, owner, review cadence, and rollback.</p></div>
          </div>
          <SectionLens
            problem="Speed metrics can hide poor decisions."
            hypothesis="Gated STR aligns customer, Ops, and control."
            approach="Baseline drivers before setting a target."
            risk="A single rate hides cohort-level harm."
            measure="North star plus cohort guardrails."
            partners="Product, Ops, Compliance, Data, Eng, Legal."
          />
        </section>

        <section className="sources-section" id="sources">
          <div className="sources-heading">
            <p className="overline">Sources + Boundaries</p>
            <h2>Public evidence, with clear boundaries.</h2>
            <p>Accessed 15 Sep 2026. Product concepts, case data, rules, metrics, and screen layouts in this artifact are proposals unless marked observed.</p>
          </div>
          <ol>
            {sources.map((source) => (
              <li key={source.id}>
                <span>{String(source.id).padStart(2, "0")}</span>
                <a href={source.url} target="_blank" rel="noreferrer">{source.label}: {source.title}</a>
                <p>{source.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <footer className="deep-footer">
          <div>
            <span>Prepared by</span>
            <strong>Vilol Joshi</strong>
          </div>
          <p>Outside-in product work for discussion. No Qonto endorsement or internal access is implied.</p>
          <a href="mailto:joshivilol1011@gmail.com">Start a Conversation</a>
        </footer>
      </div>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<ViewMode>(readView);
  const [scenario, setScenario] = useState<CaseScenarioKey>(readCase);

  useEffect(() => {
    const onPopState = () => {
      setView(readView());
      setScenario(readCase());
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const chooseView = (next: ViewMode) => {
    setView(next);
    updateQuery({ view: next });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseScenario = (next: CaseScenarioKey) => {
    setScenario(next);
    updateQuery({ view: "deep-dive", case: next });
  };

  return (
    <div id="top">
      <a className="skip-link" href="#main-content">Skip to Main Content</a>
      <AppHeader view={view} onView={chooseView} />
      {view === "brief" ? <ExecutiveBrief /> : <DeepDive scenarioKey={scenario} onScenario={chooseScenario} />}
    </div>
  );
}
