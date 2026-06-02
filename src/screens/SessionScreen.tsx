import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { exercises } from '../constants/exercises';

export default function SessionScreen({
  route,
  navigation,
}: any) {
  const { day, preBpm } = route.params;

  const exercise = exercises.find(
    e => e.day === Number(day)
  );

  const [started, setStarted] =
    useState(false);

  const [secondsLeft, setSecondsLeft] =
    useState(exercise?.duration ?? 60);

  useEffect(() => {
    if (!started) return;

    if (secondsLeft <= 0) {
      navigation.navigate('Measure', {
        day,
        phase: 'post',
        preBpm,
      });
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    started,
    secondsLeft,
    navigation,
    day,
    preBpm,
  ]);

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
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        {exercise.title}
      </Text>

      <Text
        style={{
          textAlign: 'center',
          marginBottom: 30,
        }}
      >
        {exercise.description}
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Pre BPM: {preBpm}
      </Text>

      {!started ? (
        <Pressable
          onPress={() => setStarted(true)}
          style={{
            padding: 16,
            borderWidth: 1,
          }}
        >
          <Text>Start Exercise</Text>
        </Pressable>
      ) : (
        <Text
          style={{
            fontSize: 72,
            fontWeight: 'bold',
          }}
        >
          {secondsLeft}
        </Text>
      )}
    </View>
  );
}