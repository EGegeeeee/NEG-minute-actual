import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { exercises } from '../constants/exercises';

export default function DayScreen({
  route,
  navigation,
}: any) {
  const { day } = route.params;

  const exercise = exercises.find(
    e => e.day === Number(day)
  );

  if (!exercise) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Exercise not found</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        DAY {day}
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 16,
        }}
      >
        {exercise.title}
      </Text>

      <Text
        style={{
          fontSize: 18,
          marginBottom: 20,
        }}
      >
        {exercise.description}
      </Text>

      <Text
        style={{
          marginBottom: 30,
        }}
      >
        Duration: {exercise.duration}s
      </Text>

      <Pressable
        onPress={() =>
          navigation.navigate('Session', {
            day: exercise.day,
          })
        }
        style={{
          padding: 16,
          borderWidth: 1,
          alignItems: 'center',
        }}
      >
        <Text>Start Session</Text>
      </Pressable>
    </View>
  );
}