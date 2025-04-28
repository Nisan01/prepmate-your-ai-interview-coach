import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Query to get a discussion by ID
export const getDiscussion = query({
  args: { id: v.id("discussions") },
  handler: async (ctx, args) => {
    const discussion = await ctx.db.get(args.id);
    if (!discussion) {
      throw new Error("Discussion not found");
    }
    return discussion;
  },
});

// Modified createDiscussion mutation to match the schema
export const createDiscussion = mutation({
  args: {
    PreTitle: v.string(),
    Title: v.string(),
    conversation: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    // Try to get user identity, but don't require it
    const identity = await ctx.auth.getUserIdentity();
    let userId = null;
    
    if (identity) {
      userId = identity.subject;
    } else {
      // For unauthenticated users, create a temporary ID or use a guest ID
      userId = "guest-user";
    }
    
    // If you don't want to update the schema, modify just this part
    // Fix the insert operation to match your schema
    const discussionId = await ctx.db.insert("discussions", {
      PreTitle: args.PreTitle,
      Title: args.Title,
      conversation: args.conversation || null,
      createdAt: Date.now(),
      // Add any other required fields from your schema
      updatedAt: Date.now() // If this is required in your schema
    });
    
    return discussionId;
  },
});

export const getAllDiscussions = query({
  handler: async (ctx) => {
    return await ctx.db.query("discussions").collect();
  },
});
