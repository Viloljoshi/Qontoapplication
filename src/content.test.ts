import { describe, expect, it } from "vitest";
import { caseScenarios, getDecisionState } from "./content";

describe("illustrative decision routing", () => {
  it("routes a material sanctions ambiguity to escalation", () => {
    expect(getDecisionState({ ownershipConflict: false, materialSanctionsAmbiguity: true })).toBe("escalate");
  });

  it("routes an ownership conflict to review", () => {
    expect(getDecisionState({ ownershipConflict: true, materialSanctionsAmbiguity: false })).toBe("review");
  });

  it("allows straight-through resolution after conflicts clear", () => {
    expect(getDecisionState({ ownershipConflict: false, materialSanctionsAmbiguity: false })).toBe("straight-through");
  });

  it("keeps the same fictional company across all case states", () => {
    expect(Object.values(caseScenarios)).toHaveLength(3);
    expect(Object.values(caseScenarios).every((state) => state.evidence.some((item) => item.id === "registry"))).toBe(true);
  });
});
