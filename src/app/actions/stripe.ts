"use server"

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createPaymentIntent(amount: number, formData: any) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'gbp',
      automatic_payment_methods: { enabled: true },
      metadata: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        service: formData.service,
        duration: formData.duration,
        message: formData.message,
        appointmentDate: formData.appointmentDate,
      },
      receipt_email: formData.email,
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Stripe Error:", error);
    throw new Error("Failed to create payment intent");
  }
}