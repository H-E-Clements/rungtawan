"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '@/app/actions/stripe';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  birthDate: z.date({ required_error: "Please select a date of birth" }),
  message: z.string().min(10, "Message must be at least 10 characters"),
  agree: z.literal(true, {
    error_map: () => ({ message: "You must agree to the terms" }),
  }),
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function Booking() {
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
	const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [clientSecret, setClientSecret] = useState<string | null>(null);


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { firstName: '', lastName: '', email: '', message: '', agree: false },
	});


	async function onNext(values: z.infer<typeof formSchema>) {
	  setFormData(values);
	  
	  // Call our server action
	  try {
		const { clientSecret } = await createPaymentIntent(199); // £199
		setClientSecret(clientSecret);
		setIsCheckoutOpen(true);
	  } catch (err) {
		alert("Payment system is currently down. Please try again later.");
	  }
	}

  // Step 2: Simulate Payment Logic
  async function handlePayment() {
    setIsProcessing(true);
    
    // Simulate API call to Stripe/PayPal
    const result = await stripe.confirmPayment({
		elements,
		confirmParams: {
			return_url: `${window.location.origin}/success`,
		},
	});
    
    console.log("Payment confirmed for:", formData);
    alert("Payment Successful! Booking has been created.");
    
    setIsProcessing(false);
    setIsCheckoutOpen(false);
    form.reset();
  }

  return (
    <section className="flex items-center justify-center py-12 px-4">
      <div className="grid md:grid-cols-2 md:gap-10 lg:gap-20 max-w-7xl w-full items-center">
        <div className="p-5">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">Get in touch</h1>
          <p className="text-sm/6 text-gray-600 mb-8 max-w-[400px]">Complete your details to proceed to booking.</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onNext)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem><FormLabel>First name<span className="text-destructive">*</span></FormLabel><FormControl><Input required placeholder="David" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem><FormLabel>Last name<span className="text-destructive">*</span></FormLabel><FormControl><Input required placeholder="Andrew" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email<span className="text-destructive">*</span></FormLabel><FormControl><Input required placeholder="david@company.com" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="birthDate" render={({ field }) => (
                <FormItem className="flex flex-col"><FormLabel>Appointment Date<span className="text-destructive">*</span></FormLabel><FormControl><DatePicker required value={field.value} onChange={field.onChange} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem><FormLabel>Message<span className="text-destructive">*</span></FormLabel><FormControl><Textarea required placeholder="Details..." {...field} rows={4} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="agree" render={({ field }) => (
                <FormItem><div className="flex flex-row items-start space-x-3 py-4"><FormControl><Checkbox required checked={field.value} onCheckedChange={field.onChange}/></FormControl><FormLabel className="text-sm text-gray-500">Agree to terms<span className="text-destructive">*</span></FormLabel></div><FormMessage /></FormItem>
              )} />

              <Button type="submit" className="w-full py-6 bg-emerald-900 hover:bg-emerald-800 text-white font-medium">
                Next: Proceed to Payment
              </Button>
            </form>
          </Form>
        </div>

        {/* Image */}
        <div className="rounded-3xl p-10 relative min-h-[662px] w-full max-w-[520px] hidden md:flex flex-col justify-end overflow-hidden">
          <Image src="/photos/booking/booking-background.jpg" alt="Background" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/10 z-0" />
          <div className="relative z-10"><p className="text-sm text-white mb-5">━ Your Brand Tagline</p></div>
        </div>
      </div>

      {/* --- CHECKOUT MODAL --- */}
		<Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Complete Your Booking</DialogTitle>
					<DialogDescription>Enter your card details below.</DialogDescription>
				</DialogHeader>

				{clientSecret && (
					<Elements stripe={stripePromise} options={{ clientSecret }}>
						<CheckoutForm amount={199} />
					</Elements>
				)}
			</DialogContent>
		</Dialog>
    </section>
  );
}

export default Booking;