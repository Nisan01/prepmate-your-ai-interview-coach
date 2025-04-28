import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();

    if (existing) {
      return await ctx.db.patch(existing._id, {
        name: args.name,
        email: args.email,
        lastSeen: Date.now(),
      });
    }

    // Create new user
    return await ctx.db.insert("users", {
      ...args,
      lastSeen: Date.now(),
    });
  },
})

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();
  },
});