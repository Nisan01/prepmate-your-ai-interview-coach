import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  discussions: defineTable({
    PreTitle: v.string(),
    Title: v.string(),
    // Update to handle both null values and arrays
    conversation: v.optional(v.union(
      v.null(),
      v.array(v.object({
        text: v.string(),
        isUser: v.boolean(),
        timestamp: v.number()
      }))
    )),
    feedback: v.optional(v.string()),
    createdAt: v.float64(),
    // Make updatedAt optional
    updatedAt: v.optional(v.float64())
  }),
});