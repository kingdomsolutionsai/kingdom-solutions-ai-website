import { describe, expect, it } from "vitest";

describe("Brevo API Key Validation", () => {
  it("should successfully authenticate with the Brevo API", async () => {
    const apiKey = process.env.BREVO_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey!.length).toBeGreaterThan(10);

    // Call the Brevo account endpoint to validate the API key
    const response = await fetch("https://api.brevo.com/v3/account", {
      method: "GET",
      headers: {
        "api-key": apiKey!,
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.email).toBeDefined();
  });

  it("should have a valid sender email configured", () => {
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    expect(senderEmail).toBeDefined();
    expect(senderEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
