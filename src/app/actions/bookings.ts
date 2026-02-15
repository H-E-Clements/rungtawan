"use server"

import { db } from "@/db";
import { bookings } from "@/db/schema";
import { and, gte, lte } from "drizzle-orm";
import { startOfDay, endOfDay, addMinutes } from "date-fns";
import { google } from "googleapis";
import {calendar} from "@/lib/googleCalendar";

export async function getBookedSlots(date: Date) {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  // 1. Fetch from your local Database
  const existingDbBookings = await db.select({
    time: bookings.appointmentDate,
    duration: bookings.duration,
  })
  .from(bookings)
  .where(
    and(
      gte(bookings.appointmentDate, dayStart),
      lte(bookings.appointmentDate, dayEnd)
    )
  );

  // 2. Fetch from Google Calendar (Treatwell, etc.)
  let googleEvents = [];
  try {
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID, // Your client's calendar ID
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      singleEvents: true,
    });
    googleEvents = response.data.items || [];
  } catch (error) {
    console.error("Google Calendar API Error:", error);
  }

  const allBookedIntervals = new Set<string>();

  // Process Database Bookings
  existingDbBookings.forEach((b) => {
    const startTime = new Date(b.time);
    const durationMinutes = parseInt(b.duration);
    addSlotsToSet(startTime, durationMinutes, allBookedIntervals);
  });

  // Process Google Calendar Events
  googleEvents.forEach((event) => {
    if (event.start?.dateTime && event.end?.dateTime) {
      const start = new Date(event.start.dateTime);
      const end = new Date(event.end.dateTime);
      // Calculate duration in minutes
      const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
      addSlotsToSet(start, durationMinutes, allBookedIntervals);
    }
  });

  return Array.from(allBookedIntervals);
}

// Helper to handle the 30-min interval logic
function addSlotsToSet(startTime: Date, duration: number, set: Set<string>) {
  for (let i = 0; i < duration; i += 30) {
    const blockedTime = addMinutes(startTime, i);
    const timeString = blockedTime.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/London'
    });
    set.add(timeString);
  }
}
