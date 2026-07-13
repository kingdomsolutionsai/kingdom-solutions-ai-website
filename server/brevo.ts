/**
 * Brevo Transactional Email Service
 * Sends form submission notifications to tabitha@kingdomsolutionsai.com
 * using the Brevo v3 REST API.
 */

interface SendEmailOptions {
  subject: string;
  htmlContent: string;
  replyToEmail?: string;
  replyToName?: string;
}

export async function sendBrevoEmail(options: SendEmailOptions): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "tabitha@kingdomsolutionsai.com";

  if (!apiKey) {
    console.error("[Brevo] API key not configured");
    return false;
  }

  const payload: Record<string, unknown> = {
    sender: {
      name: "Kingdom Solutions AI™",
      email: senderEmail,
    },
    to: [
      {
        email: "tabitha@kingdomsolutionsai.com",
        name: "Tabitha Rector",
      },
    ],
    subject: options.subject,
    htmlContent: options.htmlContent,
  };

  if (options.replyToEmail) {
    payload.replyTo = {
      email: options.replyToEmail,
      name: options.replyToName || options.replyToEmail,
    };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("[Brevo] Email send failed:", response.status, errorData);
      return false;
    }

    const data = await response.json();
    console.log("[Brevo] Email sent successfully. MessageId:", data.messageId);
    return true;
  } catch (error) {
    console.error("[Brevo] Email send error:", error);
    return false;
  }
}

/**
 * Format a Capacity Leak Audit submission into an HTML email
 */
export function formatCapacityLeakAuditEmail(data: {
  firstName: string;
  lastName?: string;
  email: string;
  role?: string;
  company?: string;
  challenge?: string;
}): string {
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; background: #FDFBF7; border-top: 3px solid #C5A55A;">
      <h1 style="font-size: 22px; color: #2C2C2C; margin-bottom: 8px; font-weight: 500;">New Capacity Leak Audit™ Submission</h1>
      <p style="font-size: 13px; color: #8A7D6B; margin-bottom: 30px;">A new visitor has submitted the Capacity Leak Audit form.</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B; width: 140px;">First Name</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.firstName}</td>
        </tr>
        ${data.lastName ? `<tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Last Name</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.lastName}</td>
        </tr>` : ""}
        <tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Email</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;"><a href="mailto:${data.email}" style="color: #C5A55A;">${data.email}</a></td>
        </tr>
        ${data.role ? `<tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Role</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.role}</td>
        </tr>` : ""}
        ${data.company ? `<tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Company</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.company}</td>
        </tr>` : ""}
        ${data.challenge ? `<tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Biggest Challenge</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.challenge}</td>
        </tr>` : ""}
      </table>
      <p style="font-size: 12px; color: #8A7D6B; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E8E2D8;">This submission was sent from the Kingdom Solutions AI™ website.</p>
    </div>
  `;
}

/**
 * Format a Clarity Pro intake submission into an HTML email
 */
export function formatClarityProIntakeEmail(data: {
  firstName: string;
  email: string;
  clarityNeed?: string;
  background?: string;
}): string {
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; background: #FDFBF7; border-top: 3px solid #C5A55A;">
      <h1 style="font-size: 22px; color: #2C2C2C; margin-bottom: 8px; font-weight: 500;">New Clarity Pro™ Intake Submission</h1>
      <p style="font-size: 13px; color: #8A7D6B; margin-bottom: 30px;">A new visitor wants to begin with Clarity Pro™.</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B; width: 140px;">First Name</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.firstName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Email</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;"><a href="mailto:${data.email}" style="color: #C5A55A;">${data.email}</a></td>
        </tr>
        ${data.clarityNeed ? `<tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Clarity Need</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.clarityNeed}</td>
        </tr>` : ""}
        ${data.background ? `<tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Background</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.background}</td>
        </tr>` : ""}
      </table>
      <p style="font-size: 12px; color: #8A7D6B; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E8E2D8;">This submission was sent from the Kingdom Solutions AI™ website.</p>
    </div>
  `;
}

/**
 * Format a Contact form submission into an HTML email
 */
export function formatContactEmail(data: {
  firstName: string;
  lastName?: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; background: #FDFBF7; border-top: 3px solid #C5A55A;">
      <h1 style="font-size: 22px; color: #2C2C2C; margin-bottom: 8px; font-weight: 500;">New Kingdom Solutions AI™ Contact Form Submission</h1>
      <p style="font-size: 13px; color: #8A7D6B; margin-bottom: 30px;">A new message has been submitted through the contact form.</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B; width: 140px;">Name</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.firstName}${data.lastName ? ` ${data.lastName}` : ""}</td>
        </tr>
        <tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Email</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;"><a href="mailto:${data.email}" style="color: #C5A55A;">${data.email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Subject</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.subject}</td>
        </tr>
        <tr style="border-bottom: 1px solid #E8E2D8;">
          <td style="padding: 12px 0; font-size: 13px; color: #8A7D6B;">Message</td>
          <td style="padding: 12px 0; font-size: 14px; color: #2C2C2C;">${data.message}</td>
        </tr>
      </table>
      <p style="font-size: 12px; color: #8A7D6B; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E8E2D8;">This submission was sent from the Kingdom Solutions AI™ website.</p>
    </div>
  `;
}
