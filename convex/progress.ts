import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const markCompleted = mutation({
  args: {
    day: v.number(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    return await ctx.db.insert("progress", {
      userId,
      day: args.day,
      completed: true,
    });
  },
});

export const getCompletedDays = query({
  args: {},

  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const userId = identity.subject;

    return await ctx.db
      .query("progress")
      .withIndex("by_user", (q) =>
        q.eq("userId", userId)
      )
      .collect();
  },
});