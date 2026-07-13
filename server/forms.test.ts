import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { sendBrevoEmail, formatCapacityLeakAuditEmail, formatClarityProIntakeEmail, formatContactEmail } from "./brevo";

// Mock the brevo module for unit tests
vi.mock("./brevo", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./brevo")>();
  return {
    ...actual,
    sendBrevoEmail: vi.fn().mockResolvedValue(true),
  };
});

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as unknown as TrpcContext["res"],
  };
}

describe("forms.submitCapacityLeakAudit", () => {
  it("accepts valid submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.submitCapacityLeakAudit({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      role: "CEO",
      company: "Acme Inc",
      challenge: "Too many meetings",
    });

    expect(result).toEqual({ success: true, notified: true });
  });

  it("rejects invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.forms.submitCapacityLeakAudit({
        firstName: "Jane",
        lastName: "Doe",
        email: "not-an-email",
      })
    ).rejects.toThrow();
  });

  it("rejects missing required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.forms.submitCapacityLeakAudit({
        firstName: "",
        lastName: "Doe",
        email: "jane@example.com",
      })
    ).rejects.toThrow();
  });
});

describe("forms.submitClarityProIntake", () => {
  it("accepts valid submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.submitClarityProIntake({
      firstName: "Sarah",
      email: "sarah@example.com",
      clarityNeed: "Niche clarity",
      background: "Former corporate executive",
    });

    expect(result).toEqual({ success: true, notified: true });
  });

  it("works with minimal fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.submitClarityProIntake({
      firstName: "Sarah",
      email: "sarah@example.com",
    });

    expect(result).toEqual({ success: true, notified: true });
  });
});

describe("forms.submitContact", () => {
  it("accepts valid submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.submitContact({
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      subject: "General Inquiry",
      message: "I would like to learn more about your services.",
    });

    expect(result).toEqual({ success: true, notified: true });
  });

  it("rejects empty message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.forms.submitContact({
        firstName: "John",
        lastName: "Smith",
        email: "john@example.com",
        subject: "General Inquiry",
        message: "",
      })
    ).rejects.toThrow();
  });
});

describe("Brevo Email Formatting", () => {
  it("formats Capacity Leak Audit email correctly", () => {
    const html = formatCapacityLeakAuditEmail({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      role: "Founder",
      company: "Test Co",
      challenge: "Time management",
    });
    expect(html).toContain("Jane");
    expect(html).toContain("Smith");
    expect(html).toContain("jane@example.com");
    expect(html).toContain("Founder");
    expect(html).toContain("Test Co");
    expect(html).toContain("Time management");
  });

  it("formats Clarity Pro intake email correctly", () => {
    const html = formatClarityProIntakeEmail({
      firstName: "Sarah",
      email: "sarah@example.com",
      clarityNeed: "Niche clarity",
      background: "New coach starting out",
    });
    expect(html).toContain("Sarah");
    expect(html).toContain("sarah@example.com");
    expect(html).toContain("Niche clarity");
    expect(html).toContain("New coach starting out");
  });

  it("formats Contact email correctly", () => {
    const html = formatContactEmail({
      firstName: "Mark",
      lastName: "Johnson",
      email: "mark@example.com",
      subject: "Partnership inquiry",
      message: "I would like to discuss a partnership.",
    });
    expect(html).toContain("Mark");
    expect(html).toContain("Johnson");
    expect(html).toContain("mark@example.com");
    expect(html).toContain("Partnership inquiry");
    expect(html).toContain("I would like to discuss a partnership.");
  });
});
