import { pgTable, serial, text, timestamp, integer, varchar } from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    service: varchar("service", { length: 255 }).notNull(),
    duration: varchar("duration", { length: 50 }).notNull(),
    appointmentDate: timestamp("appointment_date").notNull(),
    message: text("message").notNull(),
    stripePaymentId: varchar("stripe_payment_id", { length: 255 }).unique().notNull(),
    amountPaid: integer("amount_paid").notNull(), // stored in pence
    paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});