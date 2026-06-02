import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { exercises } from '../constants/exercises';

export default function ResultScreen({
  route,
  navigation,
}: any) {
  const {
    day,
    preBpm,
    postBpm,
  } = route.params;

  const markCompleted =
    useMutation(api.progress.markCompleted);

  const saveSession =
    useMutation(api.sessions.saveSession);


  const exercise =
    exercises.find(
      e => e.day === Number(day)
    );

  const difference =
    postBpm - preBpm;

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
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 30,
        }}
      >
        Day {day} Complete
      </Text>

      <Text
        style={{
          fontSize: 24,
          marginBottom: 10,
        }}
      >
        Pre BPM: {preBpm}
      </Text>

      <Text
        style={{
          fontSize: 24,
          marginBottom: 10,
        }}
      >
        Post BPM: {postBpm}
      </Text>

      <Text
        style={{
          fontSize: 24,
          marginBottom: 30,
          fontWeight: 'bold',
        }}
      >
        Difference: +{difference}
      </Text>

      <Pressable
        onPress={async () => {
          await saveSession({
            username: 'Setsen',
            day,
            exercise:
              exercise?.title ??
              'Unknown Exercise',
            preBpm,
            postBpm,
            completedAt:
                new Date().toISOString(),
          });

          await markCompleted({
            username: 'Setsen',
            day,
          });

          navigation.navigate('Home');
        }}
        style={{
          padding: 16,
          borderWidth: 1,
        }}
      >
        <Text>Save & Return Home</Text>
      </Pressable>
    </View>
  );
}