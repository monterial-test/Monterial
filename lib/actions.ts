'use server'

import { createClient } from '@sanity/client'
import { z } from 'zod';
import { headers } from 'next/headers';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

// Simple in-memory rate limiter (per session/IP)
const rateLimitMap = new Map<string, { count: number, lastRequest: number }>();
const LIMIT = 5; // max 5 requests
const WINDOW = 60 * 60 * 1000; // 1 hour window

const inquirySchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Invalid email address"),
  type: z.string(),
  message: z.string().min(10, "Message is too short").max(2000),
});

export async function submitInquiry(formData: any) {
  try {
    // 1. Rate Limiting Check
    const headerList = await headers();
    const ip = headerList.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip);

    if (userLimit) {
      if (now - userLimit.lastRequest < WINDOW) {
        if (userLimit.count >= LIMIT) {
          return { success: false, error: "Too many requests. Please try again later." };
        }
        userLimit.count++;
      } else {
        userLimit.count = 1;
        userLimit.lastRequest = now;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastRequest: now });
    }

    // 2. Input Validation
    const validatedData = inquirySchema.parse(formData);

    // 3. Save to Sanity
    const res = await client.create({
      _type: 'inquiry',
      ...validatedData,
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
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error('Submission error:', error)
    return { success: false, error: 'Failed to send message' }
  }
}
