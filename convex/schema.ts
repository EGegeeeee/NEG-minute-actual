import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  users: defineTable({
    email: v.string(),
    username: v.optional(v.string()),
  }).index("by_email", ["email"]),

  sessions: defineTable({
    userId: v.string(),
    day: v.number(),
    exercise: v.string(),
    preBpm: v.number(),
    postBpm: v.number(),
    completedAt: v.string(),
  }).index("by_user", ["userId"]),

  progress: defineTable({
    userId: v.string(),
    day: v.number(),
    completed: v.boolean(),
  }).index("by_user", ["userId"]),
});