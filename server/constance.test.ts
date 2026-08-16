import { describe, expect, it } from "vitest";
import { buildCapacityLeakAuditNotes, fileLeadWithConstance } from "./constance";

describe("fileLeadWithConstance", () => {
  it("returns false without throwing when CONSTANCE_LEAD_SECRET is not set", async () => {
    const original = process.env.CONSTANCE_LEAD_SECRET;
    delete process.env.CONSTANCE_LEAD_SECRET;

    const result = await fileLeadWithConstance({ name: "Jane Doe", source: "Capacity Leak Audit" });
    expect(result).toBe(false);

    if (original !== undefined) process.env.CONSTANCE_LEAD_SECRET = original;
  });
});

describe("buildCapacityLeakAuditNotes", () => {
  it("combines role, company, and challenge into readable text", () => {
    const notes = buildCapacityLeakAuditNotes({
      role: "Founder",
      company: "Acme Inc",
      challenge: "Too many meetings",
    });
    expect(notes).toBe("Role: Founder | Company/Ministry: Acme Inc | Biggest challenge: Too many meetings");
  });

  it("omits missing fields cleanly", () => {
    const notes = buildCapacityLeakAuditNotes({ role: "Founder" });
    expect(notes).toBe("Role: Founder");
  });

  it("returns an empty string when nothing is provided", () => {
    expect(buildCapacityLeakAuditNotes({})).toBe("");
  });
});
