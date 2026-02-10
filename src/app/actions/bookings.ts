"use server"
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { and, gte, lte } from "drizzle-orm";
import { startOfDay, endOfDay, addMinutes, format } from "date-fns";

export async function getBookedSlots(date: Date) {
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const existing = await db.select({
        time: bookings.appointmentDate,
        duration: bookings.duration // We need this to calculate the block
    })
        .from(bookings)
        .where(
            and(
                gte(bookings.appointmentDate, dayStart),
                lte(bookings.appointmentDate, dayEnd)
            )
        );

    const allBookedIntervals = new Set<string>();

    existing.forEach(b => {
        const startTime = new Date(b.time);
        const durationMinutes = parseInt(b.duration);

        // Loop through the duration in 30-minute increments
        // If a 60min massage starts at 10:30, it blocks 10:30 and 11:00
        for (let i = 0; i < durationMinutes; i += 30) {
            const blockedTime = addMinutes(startTime, i);

            // Format to "HH:mm" using Europe/London time to match your timeSlots array
            const timeString = blockedTime.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Europe/London'
            });

            allBookedIntervals.add(timeString);
        }
    });

    return Array.from(allBookedIntervals);
}