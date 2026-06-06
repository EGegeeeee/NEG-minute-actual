import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

import { useSessionEngine } from "../session/useSessionEngine";

export default function ResultScreen({
  route,
  navigation,
}: any) {
  const { day } = route.params;

  const saveSession = useMutation(api.sessions.saveSession);
  const markCompleted = useMutation(api.progress.markCompleted);

  const { getResult } = useSessionEngine();

  const { preBpm, postBpm } = getResult();

  const difference = postBpm - preBpm;

  const handleSave = async () => {
    await saveSession({
      day,
      exercise: "Exercise",
      preBpm,
      postBpm,
      completedAt: new Date().toISOString(),
    });

    await markCompleted({
      day,
    });

    navigation.replace("Home");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 30 }}>
        Day {day} Complete
      </Text>

      <Text style={{ fontSize: 22 }}>
        Pre BPM: {preBpm}
      </Text>

      <Text style={{ fontSize: 22 }}>
        Post BPM: {postBpm}
      </Text>

      <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 20 }}>
        Difference: +{difference}
      </Text>

      <Pressable
        onPress={handleSave}
        style={{
          marginTop: 30,
          padding: 16,
          borderWidth: 1,
        }}
      >
        <Text>Save Session</Text>
      </Pressable>
    </View>
  );
}