import { pgTable, uuid, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const appRoleEnum = pgEnum("app_role", ["admin", "user"]);

export const tradeInquiries = pgTable("trade_inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  full_name: text("full_name").notNull(),
  company_name: text("company_name"),
  country: text("country").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp").notNull(),
  service_interest: text("service_interest").notNull(),
  message: text("message").notNull(),
  business_type: text("business_type"),
  product_required: text("product_required"),
  quantity: text("quantity"),
  budget_range: text("budget_range"),
  timeline: text("timeline"),
  target_market: text("target_market"),
  shipping_method: text("shipping_method"),
  consent: boolean("consent").default(false),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const consultationRequests = pgTable("consultation_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  full_name: text("full_name").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp").notNull(),
  company: text("company"),
  country: text("country").notNull(),
  trade_interest: text("trade_interest").notNull(),
  budget_range: text("budget_range"),
  timeline: text("timeline"),
  notes: text("notes"),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const exportInquiries = pgTable("export_inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  full_name: text("full_name").notNull(),
  company_name: text("company_name").notNull(),
  country: text("country").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp").notNull(),
  commodity: text("commodity").notNull(),
  quantity: text("quantity").notNull(),
  shipping_destination: text("shipping_destination").notNull(),
  shipping_method: text("shipping_method"),
  requirements: text("requirements"),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const userRoles = pgTable("user_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull(),
  role: appRoleEnum("role").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
