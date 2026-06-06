import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    email: v.string(),
    username: v.string(),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) =>
        q.eq("email", args.email)
      )
      .unique();

    if (existing) return existing._id;

    return await ctx.db.insert("users", {
      email: args.email,
      username: args.username,
    });
  },
});

export const getUserByEmail = query({
  args: {
    email: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) =>
        q.eq("email", args.email)
      )
      .unique();
  },
});