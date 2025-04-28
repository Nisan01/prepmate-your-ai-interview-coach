import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    lastSeen: v.number(),
  }),
  discussions: defineTable({
    PreTitle: v.optional(v.string()),
    Title: v.string(),
    conversation: v.optional(v.any()),
    createdAt: v.float64(),
    updatedAt: v.optional(v.float64()),
    userId: v.optional(v.string()), // Add this line to include userId in the schema
  }),
});