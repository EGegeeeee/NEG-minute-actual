import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveSession = mutation({
  args: {
    day: v.number(),
    exercise: v.string(),
    preBpm: v.number(),
    postBpm: v.number(),
    completedAt: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    return await ctx.db.insert("sessions", {
      userId,
      day: args.day,
      exercise: args.exercise,
      preBpm: args.preBpm,
      postBpm: args.postBpm,
      completedAt: args.completedAt,
    });
  },
});