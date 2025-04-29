import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


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

export const createDiscussion = mutation({
  args: {
    PreTitle: v.string(),
    Title: v.string(),
    // Make conversation optional and allow null
    conversation: v.optional(v.union(
      v.null(),
      v.array(v.object({
        text: v.string(),
        isUser: v.boolean(),
        timestamp: v.number()
      }))
    )),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    let userId = null;
    
    if (identity) {
      userId = identity.subject;
    } else {
      userId = "guest-user";
    }
    
    // Always use an empty array for conversation, never null
    const discussionId = await ctx.db.insert("discussions", {
      PreTitle: args.PreTitle,
      Title: args.Title,
      conversation: [], // Always use empty array, never null
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    
    return discussionId;
  },
});

export const getAllDiscussions = query({
  handler: async (ctx) => {
    return await ctx.db.query("discussions").collect();
  },
});
 
// Add this new mutation for updating conversations
export const updateConversation = mutation({
  args: {
    id: v.id("discussions"),
    conversation: v.array(v.object({
      text: v.string(),
      isUser: v.boolean(),
      timestamp: v.number()
    })),
    feedback: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { id, conversation, feedback } = args;
    
    // Update the discussion with the conversation and feedback
    await ctx.db.patch(id, {
      conversation: conversation,
      ...(feedback && { feedback }),
      updatedAt: Date.now()
    });
    
    return id;
  }
});