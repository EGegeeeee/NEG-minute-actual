import React from 'react';
import {
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { exercises } from '../constants/exercises';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  // ✅ Get completed days for current logged-in user (via backend auth)
  const completedDays =
    useQuery(api.progress.getCompletedDays) ?? [];

  const completedSet = new Set(
    completedDays.map((d: any) => d.day),
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        NEG MINUTE
      </Text>

      {exercises.map((exercise) => {
        const isCompleted = completedSet.has(exercise.day);

        const isUnlocked =
          exercise.day === 1 ||
          completedSet.has(exercise.day - 1);

        return (
          <Pressable
            key={exercise.day}
            onPress={() =>
              navigation.navigate('Day', {
                day: exercise.day,
              })
            }
            style={{
              padding: 16,
              marginBottom: 10,
              borderWidth: 1,
              opacity: isUnlocked ? 1 : 0.5,
            }}
          >
            <Text>
              Day {exercise.day}
              {!isUnlocked
                ? ' 🔒'
                : isCompleted
                ? ' ✅'
                : ' 🔓'}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}