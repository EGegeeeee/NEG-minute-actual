import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function ResultScreen({
  route,
  navigation,
}: any) {
  const { day } = route.params;

  const markCompleted =
    useMutation(api.progress.markCompleted);

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
          marginBottom: 20,
        }}
      >
        Day {day} Complete
      </Text>

      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        Pre BPM: --
      </Text>

      <Text
        style={{
          fontSize: 20,
          marginBottom: 30,
        }}
      >
        Post BPM: --
      </Text>

      <Pressable
        onPress={async () => {
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