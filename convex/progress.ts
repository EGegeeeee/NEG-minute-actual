import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const markCompleted = mutation({
  args: {
    username: v.string(),
    day: v.number(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("progress", {
      username: args.username,
      day: args.day,
      completed: true,
    });
  },
});

export const getCompletedDays = query({
  args: {
    username: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("progress")
      .filter((q) =>
        q.eq(q.field("username"), args.username)
      )
      .collect();
  },
});