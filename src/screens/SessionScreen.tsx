import React, { useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { useSessionEngine } from "../session/useSessionEngine";
import { exercises } from '../constants/exercises';

export default function SessionScreen({
  route,
  navigation,
}: any) {
  const { day } = route.params;

  const exercise = exercises.find(
    e => e.day === Number(day)
  );

  const {
    state,
    startSession,
    endExercise,
    setPreBpm,
    setPostBpm,
  } = useSessionEngine();

  // RECEIVE BPM FROM MEASURE SCREEN
  useEffect(() => {
    if (route.params?.measuredBpm) {
      const bpm = route.params.measuredBpm;

      if (route.params.phase === "pre") {
        setPreBpm(bpm);
      }

      if (route.params.phase === "post") {
        setPostBpm(bpm);
      }
    }
  }, [route.params]);

  if (!exercise) {
    return (
      <View>
        <Text>Exercise not found</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        {exercise.title}
      </Text>

      <Text style={{ textAlign: 'center', marginBottom: 30 }}>
        {exercise.description}
      </Text>

      <Text style={{ marginBottom: 20 }}>
        State: {state}
      </Text>

      {/* IDLE */}
      {state === "IDLE" && (
        <Pressable
          onPress={() =>
            navigation.navigate("Measure", {
              day,
              phase: "pre",
            })
          }
          style={{ padding: 16, borderWidth: 1 }}
        >
          <Text>Start Pre Measure</Text>
        </Pressable>
      )}

      {/* PRE_DONE → START SESSION */}
      {state === "PRE_MEASURE" && (
        <Pressable
          onPress={startSession}
          style={{ padding: 16, borderWidth: 1 }}
        >
          <Text>Start Exercise</Text>
        </Pressable>
      )}

      {/* EXERCISE */}
      {state === "EXERCISE" && (
        <Pressable
          onPress={() =>
            navigation.navigate("Measure", {
              day,
              phase: "post",
            })
          }
          style={{ padding: 16, borderWidth: 1 }}
        >
          <Text>Finish → Post Measure</Text>
        </Pressable>
      )}

      {/* POST */}
      {state === "POST_MEASURE" && (
        <Text style={{ fontSize: 20 }}>
          Measuring recovery...
        </Text>
      )}

      {/* RESULT */}
      {state === "RESULT" && (
        <Pressable
          onPress={() =>
            navigation.navigate("Result", { day })
          }
          style={{ padding: 16, borderWidth: 1 }}
        >
          <Text>View Result</Text>
        </Pressable>
      )}
    </View>
  );
}
