import { v } from "convex/values";
import {
  mutation,
  query,
} from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    username: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert(
      "users",
      {
        email: args.email,
        username: args.username,
      }
    );
  },
});

export const getUserByEmail = query({
  args: {
    email: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) =>
        q.eq(
          q.field("email"),
          args.email
        )
      )
      .first();
  },
});