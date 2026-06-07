import React, { useEffect, useState } from 'react';
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



  //ene suuld nemsen
  const measurementComplete =
  route.params?.measurementComplete;

  const {
    state,
    startSession,
    endExercise,
    setPreBpm,
    setPostBpm,
  } = useSessionEngine();

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
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#FFF' }}>
          Exercise not found
        </Text>
      </View>
    );
  }

  const getStep = () => {
    switch (state) {
      case 'IDLE':
        return 'STEP 1 OF 4';

      case 'PRE_MEASURE':
        return 'STEP 2 OF 4';

      case 'EXERCISE':
        return 'STEP 2 OF 4';

      case 'POST_MEASURE':
        return 'STEP 3 OF 4';

      case 'RESULT':
        return 'STEP 4 OF 4';

      default:
        return '';
    }
  };

  const [secondsLeft, setWorkoutSeconds] =
    useState(exercise.duration);
    useEffect(() => {
  if (state !== "PRE_MEASURE") return;

  const interval = setInterval(() => {
    setWorkoutSeconds(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [state]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        padding: 24,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: '#111',
          borderRadius: 24,
          padding: 28,
          borderWidth: 1,
          borderColor: '#222',
        }}
      >
        <Text
          style={{
            color: '#666',
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 2,
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          {getStep()}
        </Text>

        <Text
          style={{
            color: '#F5B800',
            fontSize: 32,
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          {exercise.title}
        </Text>

        <Text
          style={{
            color: '#FFF',
            textAlign: 'center',
            lineHeight: 24,
            marginBottom: 32,
          }}
        >
          {exercise.description}
        </Text>

        {/* IDLE */}
        {state === "IDLE" && measurementComplete && (
  <>
    <Text
      style={{
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 24,
        fontSize: 16,
      }}
    >
      Pre-measurement complete.
    </Text>

    <Pressable
      onPress={startSession}
      style={{
        backgroundColor: '#F5B800',
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: '#000',
          fontWeight: '900',
          fontSize: 16,
        }}
      >
        START WORKOUT
      </Text>
    </Pressable>
  </>
)}


        

{/* WORKOUT TIMER */}
{state === "PRE_MEASURE" && (
  <>
    <Text
      style={{
        fontSize: 56,
        marginBottom: 16,
        textAlign: 'center',
      }}
    >
      💪
    </Text>

    <Text
      style={{
        color: '#F5B800',
        fontSize: 96,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 16,
      }}
    >
      {secondsLeft}
    </Text>

    <Text
      style={{
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 24,
        fontSize: 16,
      }}
    >
      Seconds Remaining
    </Text>

    <Text
      style={{
        color: '#AAA',
        textAlign: 'center',
        fontSize: 15,
      }}
    >
      Complete your workout.
    </Text>
  </>
)}

        {/* EXERCISE */}
        {state === "EXERCISE" && (
          <>
            <Text
              style={{
                color: '#F5B800',
                fontSize: 96,
                fontWeight: '900',
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              💪
            </Text>

            <Text
              style={{
                color: '#FFF',
                textAlign: 'center',
                marginBottom: 24,
                fontSize: 16,
              }}
            >
              Complete your workout, then continue to the
              post-workout measurement.
            </Text>

            <Pressable
              onPress={() =>
                navigation.navigate("Measure", {
                  day,
                  phase: "post",
                })
              }
              style={{
                backgroundColor: '#F5B800',
                paddingVertical: 18,
                borderRadius: 18,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#000',
                  fontWeight: '900',
                  fontSize: 16,
                }}
              >
                START POST MEASUREMENT
              </Text>
            </Pressable>
          </>
        )}

        {/* POST */}
        {state === "POST_MEASURE" && (
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 56,
                marginBottom: 16,
              }}
            >
              ❤️
            </Text>

            <Text
              style={{
                color: '#FFF',
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              Measuring recovery...
            </Text>
          </View>
        )}

        {/* RESULT */}
        {state === "RESULT" && (
          <>
            <Text
              style={{
                color: '#FFF',
                textAlign: 'center',
                marginBottom: 24,
                fontSize: 16,
              }}
            >
              Your session is complete.
            </Text>

            <Pressable
              onPress={() =>
                navigation.navigate("Result", { day })
              }
              style={{
                backgroundColor: '#F5B800',
                paddingVertical: 18,
                borderRadius: 18,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#000',
                  fontWeight: '900',
                  fontSize: 16,
                }}
              >
                VIEW RESULTS
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}