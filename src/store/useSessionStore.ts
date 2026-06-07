import { create } from 'zustand';

export type SessionState =
  | 'IDLE'
  | 'READY_TO_WORKOUT'
  | 'EXERCISE'
  | 'POST_READY'
  | 'RESULT_READY';

interface SessionStore {
  state: SessionState;

  preBpm: number | null;
  postBpm: number | null;

  setPreBpm: (bpm: number) => void;
  setPostBpm: (bpm: number) => void;

  setState: (state: SessionState) => void;

  reset: () => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  state: 'IDLE',

  preBpm: null,
  postBpm: null,

  setPreBpm: (bpm) =>
    set({
      preBpm: bpm,
      state: 'READY_TO_WORKOUT',
    }),

  setPostBpm: (bpm) =>
    set({
      postBpm: bpm,
      state: 'RESULT_READY',
    }),

  setState: (state) =>
    set({
      state,
    }),

  reset: () =>
    set({
      state: 'IDLE',
      preBpm: null,
      postBpm: null,
    }),
}));