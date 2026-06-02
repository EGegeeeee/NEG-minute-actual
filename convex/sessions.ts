import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveSession = mutation({
  args: {
    username: v.string(),
    day: v.number(),
    exercise: v.string(),
    preBpm: v.number(),
    postBpm: v.number(),
    completedAt: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("sessions", args);
  },
});