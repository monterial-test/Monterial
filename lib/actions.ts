'use server'

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // Requires a token with write access
})

export async function submitInquiry(formData: { name: string; email: string; type: string; message: string }) {
  try {
    // 1. Save to Sanity
    const res = await client.create({
      _type: 'inquiry',
      ...formData,
      status: 'new',
    })

    // 2. Fetch Receiver Email from Sanity
    let receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER;
    try {
      const settings = await client.fetch(`*[_type == "settings"][0]{ contactReceiverEmail, email }`);
      if (settings?.contactReceiverEmail) {
        receiverEmail = settings.contactReceiverEmail;
      } else if (settings?.email) {
        receiverEmail = settings.email;
      }
    } catch (err) {
      console.warn("Could not fetch receiver email from Sanity, using env fallback.");
    }

    // 3. Send Email Notification with Resend
    try {
      if (process.env.RESEND_API_KEY && receiverEmail) {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "onboarding@resend.dev", // Default sender for testing without custom domain
          to: receiverEmail,
          replyTo: formData.email,
          subject: `New Inquiry: ${formData.type} from ${formData.name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2 style="color: #333;">New Website Inquiry</h2>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Type:</strong> ${formData.type}</p>
              </div>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; color: #555; line-height: 1.5;">${formData.message}</p>
            </div>
          `,
        });
        console.log("Email notification sent successfully via Resend.");
      } else {
        console.warn("RESEND_API_KEY or receiverEmail not configured. Email notification skipped.");
      }
    } catch (emailError) {
      console.error("Failed to send email notification via Resend:", emailError);
    }

    return { success: true, id: res._id }
  } catch (error) {
    console.error('Submission error:', error)
    return { success: false, error: 'Failed to send message' }
  }
}
