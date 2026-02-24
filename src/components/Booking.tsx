"use client"

import React, { useState, useMemo, useEffect } from 'react';
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
} from "@/components/ui/dialog";

import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '@/app/actions/stripe';
import { getBookedSlots } from '@/app/actions/bookings'; // Import your new action
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { services } from "@/data/services";

const formSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(11, "Phone number must be in the correct format"),
    appointmentDate: z.date({ required_error: "Please select an appointment date" }),
    time: z.string().min(1, "Please select a time slot"), // New field
    service: z.string().min(1, "Please select a service"),
    duration: z.string().min(1, "Please select a duration"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    agree: z.literal(true, {
        error_map: () => ({ message: "You must agree to the terms" }),
    }),
    healthConsent: z.literal(true, {
        error_map: () => ({ message: "Health consent is required for booking" }),
    }),
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function Booking() {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '', lastName: '', email: '', phone: '',
            service: '', duration: '', time: '', message: '', agree: false, healthConsent: false
        },
    });

    // Watchers
    const selectedServiceTitle = form.watch("service");
    const selectedDuration = form.watch("duration");
    const selectedDate = form.watch("appointmentDate");

    // Generate 10am - 8pm time slots
    const timeSlots = useMemo(() => {
        const slots = [];
        for (let i = 10; i <= 20; i++) {
            slots.push(`${i}:00`);
            if (i !== 20) slots.push(`${i}:30`);
        }
        return slots;
    }, []);

    // Fetch booked slots when date changes
    useEffect(() => {
        async function updateBookedSlots() {
            if (selectedDate) {
                setIsLoadingSlots(true);
                try {
                    const booked = await getBookedSlots(selectedDate);
                    setBookedSlots(booked);
                } catch (error) {
                    console.error("Failed to fetch slots", error);
                } finally {
                    setIsLoadingSlots(false);
                }
            }
        }
        updateBookedSlots();
    }, [selectedDate]);

    const selectedServiceData = useMemo(() => {
        return services.find(s => s.title === selectedServiceTitle);
    }, [selectedServiceTitle]);

    const currentPrice = useMemo(() => {
        const option = selectedServiceData?.options.find(o => o.time.toString() === selectedDuration);
        return option ? option.cost : null;
    }, [selectedServiceData, selectedDuration]);

    async function onNext(values: z.infer<typeof formSchema>) {
        // Combine Date and Time
        const [hours, minutes] = values.time.split(":").map(Number);
        const appointmentFullDate = new Date(values.appointmentDate);
        appointmentFullDate.setHours(hours, minutes, 0, 0);

        const selectedOption = selectedServiceData?.options.find(
            opt => opt.time.toString() === values.duration
        );
        const finalAmount = selectedOption ? selectedOption.cost : 0;

        try {
            // Send the combined date to the Payment Intent metadata
            const { clientSecret } = await createPaymentIntent(finalAmount, {
                ...values,
                appointmentDate: appointmentFullDate.toISOString() // Pass the one with the time!
            });
            setClientSecret(clientSecret);
            setIsCheckoutOpen(true);
        } catch (err) {
            alert("Payment system error. Please try again.");
        }
    }

    return (
        <section
            id={"booking"}
            className="flex items-center justify-center py-12 px-4">
            <div className="grid md:grid-cols-2 md:gap-10 lg:gap-20 max-w-7xl w-full items-center">
                <div className="p-5">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">Book Your Session</h1>
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

                            <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem><FormLabel>Phone Number<span className="text-destructive">*</span></FormLabel><FormControl><Input required placeholder="e.g 07463883217" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                            )} />

                            <FormField control={form.control} name="service" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service<span className="text-destructive">*</span></FormLabel>
                                    <Select onValueChange={(val) => {
                                        field.onChange(val);
                                        form.setValue("duration", "");
                                    }} defaultValue={field.value}>
                                        <FormControl><SelectTrigger className="h-12"><SelectValue placeholder="Select a massage" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            {services.map((s) => (
                                                <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="duration" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration<span className="text-destructive">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedServiceTitle}>
                                        <FormControl><SelectTrigger className="h-12"><SelectValue placeholder={selectedServiceTitle ? "Pick a time" : "Select service first"} /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            {selectedServiceData?.options.map((opt) => (
                                                <SelectItem key={opt.time} value={opt.time.toString()}>{opt.time} Minutes — £{opt.cost}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="appointmentDate" render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Appointment Date<span className="text-destructive">*</span></FormLabel>
                                        <FormControl><DatePicker value={field.value} onChange={field.onChange} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="time" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Time Slot<span className="text-destructive">*</span></FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDate || isLoadingSlots}>
                                            <FormControl>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue placeholder={selectedDate ? (isLoadingSlots ? "Loading..." : "Pick a time") : "Pick date first"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent
                                                position="popper"
                                                className="max-h-[200px] w-[var(--radix-select-trigger-width)] overflow-y-auto shadow-md"
                                            >
                                                {timeSlots.map((slot) => {
                                                    const isBooked = bookedSlots.includes(slot);
                                                    return (
                                                        <SelectItem key={slot} value={slot} disabled={isBooked}>
                                                            {slot} {isBooked ? "(Booked)" : ""}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            <FormField control={form.control} name="message" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl><Textarea placeholder="Any specific requirements..." {...field} rows={4} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="agree" render={({ field }) => (
                                <FormItem><div className="flex flex-row items-start space-x-3 py-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><FormLabel className="text-sm text-gray-500">Agree to <span className="underline cursor-pointer hover:text-emerald-700" onClick={() => setIsTermsOpen(true)}>terms & conditions</span><span className="text-destructive">*</span></FormLabel></div><FormMessage /></FormItem>
                            )} />

                            <FormField control={form.control} name="healthConsent" render={({ field }) => (
                                <FormItem><div className="flex flex-row items-start space-x-3 pt-2 pb-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><FormLabel className="text-sm text-gray-500">I explicitly consent to Rungtawan Thai Massage processing my <strong>health-related data</strong> for the purpose of providing a safe massage treatment. I understand I can withdraw this consent at any time.<span className="text-destructive">*</span></FormLabel></div><FormMessage /></FormItem>
                            )} />

                            <Button type="submit" className="w-full py-6 bg-emerald-900 hover:bg-emerald-800 text-white font-medium">
                                {currentPrice ? `Next: Pay £${currentPrice}` : "Next: Proceed to Payment"}
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="rounded-3xl p-10 relative min-h-175.5 w-full max-w-[520px] hidden md:flex flex-col justify-end overflow-hidden">
                    <Image src="/photos/booking/kung-woman.jpeg" alt="Background" fill priority className="object-cover" />
                    <div className="absolute inset-0 bg-black/10 z-0" />
                    <div className="relative z-10"><p className="text-sm text-white mb-5"></p></div>
                </div>
            </div>

            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Complete Your Booking</DialogTitle>
                        <DialogDescription>Enter your card details to finalize the £{currentPrice} payment.</DialogDescription>
                    </DialogHeader>
                    {clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm amount={currentPrice || 0} />
                        </Elements>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Terms & Conditions</DialogTitle>
                        <DialogDescription>Agree to our terms and conditions to proceed</DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm text-gray-600 leading-relaxed">
                        <section>
                            <p className="font-semibold text-gray-900 mb-2">Last Updated: February 2026</p>
                            <p>
                                By booking a treatment with <strong>Rungtawan Thai Massage</strong>, you agree to be bound by the following terms and conditions.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-2">1. Bookings & Cancellations</h3>
                            <ul className="list-disc pl-4 space-y-2">
                                <li><strong>24-Hour Policy:</strong> We require at least 24 hours' notice for cancellations or rescheduling.</li>
                                <li><strong>Late Cancellations:</strong> Cancellations made with less than 24 hours' notice may incur a charge of 50% of the treatment fee.</li>
                                <li><strong>No-Shows:</strong> Failure to attend without notice will be charged at 100% of the service price.</li>
                                <li><strong>Late Arrival:</strong> Your session may be shortened to avoid delaying the next client, but the full fee will apply.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-2">2. Health & Safety</h3>
                            <ul className="list-disc pl-4 space-y-2">
                                <li><strong>Medical Disclosure:</strong> You must inform your therapist of any medical conditions, allergies, or injuries before treatment.</li>
                                <li><strong>Right to Refuse:</strong> We reserve the right to refuse treatment if we believe it is medically unsafe for the client.</li>
                                <li><strong>Pregnancy:</strong> Please notify us upon booking if you are pregnant, as specific protocols apply.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-2">3. Professional Conduct</h3>
                            <p className="mb-2">
                                We maintain a strictly professional environment.
                            </p>
                            <div className="bg-red-50 border-l-4 border-red-400 p-3 italic text-red-700">
                                Any illicit remarks, advances, or inappropriate behavior will result in the immediate termination of the session and a permanent ban without a refund.
                            </div>
                        </section>

                        <section>
                            <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-2">4. Privacy (GDPR)</h3>
                            <p>
                                Your personal and health data is stored securely in accordance with UK Data Protection laws. We only use this information to ensure your treatment is safe and effective.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-2">5. Liability</h3>
                            <p>
                                Rungtawan Thai Massage is not responsible for the loss or damage of personal belongings brought onto the premises. Please keep valuables with you or at home.
                            </p>
                        </section>

                        <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
                            Governed by the laws of England and Wales.
                            rungtawanthaimassage.co.uk
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}

export default Booking;
