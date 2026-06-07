import { useRef, useState } from "react";
import { SessionState } from "./types";

export function useSessionEngine() {
  const [state, setState] = useState<SessionState>("IDLE");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const preBpmRef = useRef<number>(0);
  const postBpmRef = useRef<number>(0);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // START SESSION
  const startSession = () => {
    setState("PRE_MEASURE");

    clearTimer();

    timerRef.current = setTimeout(() => {
      setState("EXERCISE");
    }, 60000);
  };

  // END EXERCISE → POST
  const endExercise = () => {
    setState("POST_MEASURE");

    clearTimer();

    timerRef.current = setTimeout(() => {
      setState("RESULT");
    }, 15000);
  };

  // BPM SETTERS
  const setPreBpm = (value: number) => {
    preBpmRef.current = value;
  };

  const setPostBpm = (value: number) => {
    postBpmRef.current = value;
  };

  // FINAL RESULT
  const getResult = () => ({
    preBpm: preBpmRef.current,
    postBpm: postBpmRef.current,
  });

  return {
    state,
    startSession,
    endExercise,
    setPreBpm,
    setPostBpm,
    getResult,
  };
}