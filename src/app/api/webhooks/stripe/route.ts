import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { db } from "@/db"; // Ensure this points to your src/db/index.ts
import { bookings } from "@/db/schema"; // Ensure this points to your src/db/schema.ts

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
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
      // 💾 THE DATABASE SAVE
      await db.insert(bookings).values({
        firstName: m.firstName,
        lastName: m.lastName,
        email: m.email,
        service: m.service,
        duration: m.duration,
        appointmentDate: new Date(m.appointmentDate),
        message: m.message,
        stripePaymentId: paymentIntent.id,
        amountPaid: paymentIntent.amount, // Pence
        paymentStatus: "paid",
      });

      console.log(`✅ Success! Booking saved for ${m.firstName}`);
    } catch (error) {
      console.error("❌ Drizzle/DB Error:", error);
    }
  }

  return new NextResponse("ok", { status: 200 });
}