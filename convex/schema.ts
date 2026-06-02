import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessions: defineTable({
    username: v.string(),
    day: v.number(),
    exercise: v.string(),
    preBpm: v.number(),
    postBpm: v.number(),
    completedAt: v.string(),
  }),

  progress: defineTable({
    username: v.string(),
    day: v.number(),
    completed: v.boolean(),
  }),
});