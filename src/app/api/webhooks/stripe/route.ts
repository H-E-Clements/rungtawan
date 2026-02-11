import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { Resend } from "resend"; // 1. Import Resend



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
        service: m.service,
        duration: m.duration,
        appointmentDate: new Date(m.appointmentDate),
        message: m.message,
        stripePaymentId: paymentIntent.id,
        amountPaid: paymentIntent.amount,
        paymentStatus: "paid",
      });

      console.log(`✅ Success! Booking saved for ${m.firstName}`);

      // 📧 2. SEND EMAIL CONFIRMATION
      if (m.email) {
        await resend.emails.send({
          from: "onboarding@resend.dev", // Replace with your domain later
          to: m.email,
          subject: "Booking Confirmed - Rungtawan Thai Massage",
          html: `
            <h1>Sawadee ka, ${m.firstName}!</h1>
            <p>Your booking for <strong>${m.service} (${m.duration})</strong> has been confirmed.</p>
            <p><strong>Date:</strong> ${new Date(m.appointmentDate).toLocaleDateString()}</p>
            <p>We look forward to seeing you soon.</p>
            <br />
            <p>Rungtawan Thai Massage</p>
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