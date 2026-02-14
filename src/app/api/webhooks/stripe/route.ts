import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { Resend } from "resend";
import {calendar} from "@/lib/googleCalendar"; // 1. Import Resend



export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const resend = new Resend(process.env.RESEND_API_KEY); // 2. Initialize Resend
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const m = paymentIntent.metadata;

    try {
      // 💾 1. SAVE TO DATABASE
      await db.insert(bookings).values({
        firstName: m.firstName,
        lastName: m.lastName,
        email: m.email,
        phone: m.phone,
        service: m.service,
        duration: m.duration,
        appointmentDate: new Date(m.appointmentDate),
        message: m.message,
        stripePaymentId: paymentIntent.id,
        amountPaid: paymentIntent.amount,
        paymentStatus: "paid",
      });

      console.log(`✅ Success! Booking saved for ${m.firstName}`);

      const startTime = new Date(m.appointmentDate);
      const durationMinutes = parseInt(m.duration) || 60; // Default to 60 if not found
      const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

      await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: {
          summary: `Massage: ${m.firstName} ${m.lastName}`,
          description: `Service: ${m.service}\nDuration: ${m.duration}\nNotes: ${m.message}\nEmail: ${m.email}\nPhone number: ${m.phone}`,
          start: {
            dateTime: startTime.toISOString(),
            timeZone: 'Europe/London',
          },
          end: {
            dateTime: endTime.toISOString(),
            timeZone: 'Europe/London',
          },
        },
      });
      console.log(`📅 Calendar event created for ${m.firstName}`);

      // 📧 2. SEND EMAIL CONFIRMATION
      if (m.email) {
        await resend.emails.send({
          from: "Rungtawan Thai Massage <info@rungtawanthaitherapy.co.uk>",
          to: m.email,
          subject: "Booking Confirmed: Your Appointment at Rungtawan Thai Massage",
          html: `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 40px 0; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #eeeeee;">
        
        <div style="background-color: #064e3b; padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">RUNGTAWAN</h1>
          <p style="color: #d1fae5; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase;">Thai Therapy & Massage</p>
        </div>

        <div style="padding: 40px 30px;">
          <h2 style="color: #111827; margin-top: 0;">Sawadee ka, ${m.firstName},</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
            Your booking has been successfully confirmed. We have reserved your time slot and our therapist is looking forward to seeing you.
          </p>

          <div style="background-color: #f3f4f6; border-radius: 12px; padding: 25px; margin: 30px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding-bottom: 10px; color: #6b7280; font-size: 12px; text-transform: uppercase;">Service</td>
                <td style="padding-bottom: 10px; color: #111827; font-size: 14px; font-weight: bold; text-align: right;">${m.service}</td>
              </tr>
              <tr>
                <td style="padding-bottom: 10px; color: #6b7280; font-size: 12px; text-transform: uppercase;">Duration</td>
                <td style="padding-bottom: 10px; color: #111827; font-size: 14px; text-align: right;">${m.duration} Minutes</td>
              </tr>
              <tr>
                <td style="padding-bottom: 10px; color: #6b7280; font-size: 12px; text-transform: uppercase;">Date</td>
                <td style="padding-bottom: 10px; color: #111827; font-size: 14px; text-align: right;">${new Date(m.appointmentDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
              <tr>
                <td style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Arrival Time</td>
                <td style="color: #064e3b; font-size: 16px; font-weight: bold; text-align: right;">${new Date(m.appointmentDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 14px; color: #6b7280; line-height: 1.5;">
            <strong>Location:</strong><br />
            123 Example Street, Your Town, Postcode<br />
            <a href="https://maps.google.com" style="color: #064e3b; text-decoration: underline;">Open in Google Maps</a>
          </p>
        </div>

        <div style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #eeeeee;">
          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            If you need to reschedule or cancel, please contact us at least 24 hours in advance.
          </p>
          <p style="font-size: 12px; color: #9ca3af; margin: 10px 0 0 0;">
            &copy; 2026 Rungtawan Thai Massage. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `,
        });
        console.log(`📧 Confirmation email sent to ${m.email}`);
      }

    } catch (error) {
      console.error("❌ Webhook Process Error:", error);
    }
  }

  return new NextResponse("ok", { status: 200 });
}