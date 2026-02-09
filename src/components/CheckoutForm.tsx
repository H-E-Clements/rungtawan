"use client"

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "./ui/button";

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "An unknown error occurred");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
      <Button 
        disabled={!stripe || loading} 
        className="w-full bg-emerald-900 py-6"
      >
        {loading ? "Processing..." : `Pay £${amount}`}
      </Button>
    </form>
  );
}