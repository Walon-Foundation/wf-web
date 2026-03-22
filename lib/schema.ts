import { integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const projectQuotes = pgTable("project_quotes", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  projectType: text("project_type").notNull(),
  timeline: text("timeline").notNull(),
  summary: text("summary").notNull(),
  extraContext: text("extra_context"),
  tierId: text("tier_id").notNull(),
  tierLabel: text("tier_label").notNull(),
  tierRange: text("tier_range").notNull(),
  addons: jsonb("addons").$type<string[]>().default([]),
  total: integer("total").notNull(),
});

export type ProjectQuote = typeof projectQuotes.$inferSelect;
