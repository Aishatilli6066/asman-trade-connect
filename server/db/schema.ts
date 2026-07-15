import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  excerpt: text().notNull(),
  content: text().notNull(),
  featuredImage: text().notNull(),
  featuredImageAlt: text().notNull(),
  status: text().notNull().default("draft"),
  publishedAt: timestamp(),
  seoTitle: text().notNull(),
  seoDescription: text().notNull(),
  ogImage: text(),
  canonicalUrl: text(),
  readingTimeMinutes: integer(),
  views: integer().default(0),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().notNull().defaultNow(),
});

export const adminSessions = pgTable("admin_sessions", {
  id: text().primaryKey(),
  userId: integer().notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
