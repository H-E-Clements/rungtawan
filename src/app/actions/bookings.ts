"use server"

import { db } from "@/db";
import { bookings } from "@/db/schema";
import { and, gte, lte } from "drizzle-orm";
import { addMinutes } from "date-fns";
import { calendar } from "@/lib/googleCalendar";
import { format, fromZonedTime } from 'date-fns-tz';

export async function getBookedSlots(date: Date) {
  const timeZone = 'Europe/London';
  const dateString = format(date, 'yyyy-MM-dd', { timeZone });
  const dayStart = fromZonedTime(`${dateString}T00:00:00`, timeZone);
  const dayEnd = fromZonedTime(`${dateString}T23:59:59`, timeZone);
  const allBookedIntervals = new Set<string>();

  // 1. Fetch & Process Database Bookings
  const dbBookings = await db.select({
    time: bookings.appointmentDate,
    duration: bookings.duration,
  })
      .from(bookings)
      .where(and(gte(bookings.appointmentDate, dayStart), lte(bookings.appointmentDate, dayEnd)));

  dbBookings.forEach((b) => {
    const start = new Date(b.time);
    const end = addMinutes(start, parseInt(b.duration));
    normalizeAndAddSlots(start, end, allBookedIntervals);
  });

  // 2. Fetch & Process Google Calendar
  let googleEvents = [];
  try {
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      singleEvents: true,
    });
    googleEvents = response.data.items || [];
  } catch (error) {
    console.error("Google Calendar API Error:", error);
    throw new Error("CALENDAR_UNAVAILABLE");
  }

  googleEvents.forEach((event) => {
    if (event.transparency === 'transparent') return;

    if (event.start?.dateTime && event.end?.dateTime) {
      const start = new Date(event.start.dateTime);
      const end = new Date(event.end.dateTime);
      normalizeAndAddSlots(start, end, allBookedIntervals);
    } else if (event.start?.date) {
      for (let i = 10; i < 20; i++) {
        allBookedIntervals.add(`${String(i).padStart(2, '0')}:00`);
        allBookedIntervals.add(`${String(i).padStart(2, '0')}:30`);
      }
    }
  });

  return Array.from(allBookedIntervals);
}

function normalizeAndAddSlots(start: Date, end: Date, set: Set<string>) {
  const current = new Date(start);
  current.setMinutes(Math.floor(current.getMinutes() / 30) * 30, 0, 0);

  while (current < end) {
    const timeString = current.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/London'
    });
    set.add(timeString);
    current.setMinutes(current.getMinutes() + 30);
  }
}