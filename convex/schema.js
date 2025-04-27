import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    // Removed stackUserId and image fields
    lastSeen: v.number(),
  }),
  // Add other tables as needed
});