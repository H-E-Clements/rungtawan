import Link from 'next/link';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { CheckCircle2, Calendar, Clock, MapPin, Mail, Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function SuccessPage({
                                              searchParams,
                                          }: {
    // 1. Update the type to wrap searchParams in a Promise
    searchParams: Promise<{ payment_intent: string; redirected?: string }>;
}) {
    // 2. Await the searchParams before accessing properties
    const resolvedParams = await searchParams;
    const paymentIntentId = resolvedParams.payment_intent;

    if (!paymentIntentId) {
        redirect('/');
    }

    // Look for the booking in the DB
    const booking = await db.query.bookings.findFirst({
        where: eq(bookings.stripePaymentId, paymentIntentId),
    });

    // If not found yet, show a loading state and refresh the page once
    if (!booking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4">
                <Loader2 className="w-10 h-10 text-emerald-800 animate-spin mb-4" />
                <h2 className="text-xl font-semibold text-stone-800">Finalising your booking...</h2>
                <p className="text-stone-500 text-sm">We're just confirming your details with our system.</p>

                {/* Simple meta-refresh to try again after 3 seconds */}
                <meta httpEquiv="refresh" content="3" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-stone-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Booking Confirmed!</h1>
                    <p className="text-stone-600 mt-2">
                        Sawadee ka, {booking.firstName}. We’ve reserved your session.
                    </p>
                </div>

                {/* Details Card */}
                <div className="bg-white shadow-xl shadow-stone-200/50 border border-stone-200 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
                        <h2 className="font-semibold text-stone-500 uppercase tracking-widest text-[10px]">
                            Appointment Summary
                        </h2>
                        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            CONFIRMED
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="flex items-start gap-5">
                            <div className="bg-stone-100 p-2 rounded-lg">
                                <Calendar className="w-5 h-5 text-stone-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-stone-900 text-lg">
                                    {new Date(booking.appointmentDate).toLocaleDateString('en-GB', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                    })}
                                </p>
                                <p className="text-xs text-stone-400 uppercase font-medium mt-0.5">Date</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="bg-stone-100 p-2 rounded-lg">
                                <Clock className="w-5 h-5 text-stone-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-stone-900 text-lg">
                                    {new Date(booking.appointmentDate).toLocaleTimeString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                        timeZone: 'Europe/London'
                                    })}
                                </p>
                                <p className="text-xs text-stone-400 uppercase font-medium mt-0.5">
                                    {booking.service} — {booking.duration} mins
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 border-t border-stone-100 pt-8">
                            <div className="bg-stone-100 p-2 rounded-lg">
                                <MapPin className="w-5 h-5 text-stone-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-stone-900">Rungtawan Thai Massage</p>
                                <p className="text-sm text-stone-500">62A Oldham Street, 1st Floor, Manchester, M4 1LE</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 bg-emerald-900 text-emerald-50 text-center">
                        <div className="flex items-center justify-center gap-2 text-sm font-medium">
                            <Mail className="w-4 h-4 text-emerald-300" />
                            <span>Confirmation sent to {booking.email}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center space-y-6">
                    <p className="text-stone-400 text-sm max-w-xs mx-auto">
                        Need to change your appointment? Please contact us at least 24 hours in advance.
                    </p>
                    <Link
                        href="/"
                        className="inline-block text-stone-800 font-semibold text-sm border-b-2 border-emerald-900 pb-1 hover:text-emerald-900 transition-colors"
                    >
                        Go back to homepage
                    </Link>
                </div>
            </div>
        </main>
    );
}