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
    birthDate: z.date({ required_error: "Please select an appointment date" }),
    time: z.string().min(1, "Please select a time slot"), // New field
    service: z.string().min(1, "Please select a service"),
    duration: z.string().min(1, "Please select a duration"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    agree: z.literal(true, {
        error_map: () => ({ message: "You must agree to the terms" }),
    }),
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function Booking() {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '', lastName: '', email: '',
            service: '', duration: '', time: '', message: '', agree: false
        },
    });

    // Watchers
    const selectedServiceTitle = form.watch("service");
    const selectedDuration = form.watch("duration");
    const selectedDate = form.watch("birthDate");

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
        const appointmentFullDate = new Date(values.birthDate);
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
                                <FormField control={form.control} name="birthDate" render={({ field }) => (
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
                                    <FormLabel>Message<span className="text-destructive">*</span></FormLabel>
                                    <FormControl><Textarea required placeholder="Any specific requirements..." {...field} rows={4} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="agree" render={({ field }) => (
                                <FormItem><div className="flex flex-row items-start space-x-3 py-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><FormLabel className="text-sm text-gray-500">Agree to terms & conditions<span className="text-destructive">*</span></FormLabel></div><FormMessage /></FormItem>
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
                <DialogContent className="sm:max-w-[425px]">
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
        </section>
    );
}

export default Booking;