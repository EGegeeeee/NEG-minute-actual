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
        backgroundColor: '#000',
        justifyContent: 'center',
        padding: 24,
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
        STEP 4 OF 4
      </Text>

      <Text
        style={{
          color: '#F5B800',
          fontSize: 36,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        RESULTS
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#111',
            borderRadius: 24,
            padding: 24,
            borderWidth: 1,
            borderColor: '#222',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#666',
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 1,
            }}
          >
            PRE BPM
          </Text>

          <Text
            style={{
              color: '#F5B800',
              fontSize: 48,
              fontWeight: '900',
              marginTop: 12,
            }}
          >
            {preBpm}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: '#111',
            borderRadius: 24,
            padding: 24,
            borderWidth: 1,
            borderColor: '#222',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#666',
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 1,
            }}
          >
            POST BPM
          </Text>

          <Text
            style={{
              color: '#F5B800',
              fontSize: 48,
              fontWeight: '900',
              marginTop: 12,
            }}
          >
            {postBpm}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#111',
          borderRadius: 24,
          padding: 28,
          borderWidth: 1,
          borderColor: '#222',
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Text
          style={{
            color: '#666',
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 2,
          }}
        >
          RECOVERY CHANGE
        </Text>

        <Text
          style={{
            color: '#F5B800',
            fontSize: 64,
            fontWeight: '900',
            marginTop: 12,
          }}
        >
          +{difference}
        </Text>

        <Text
          style={{
            color: '#FFF',
            marginTop: 8,
          }}
        >
          BPM Difference
        </Text>
      </View>

      <Pressable
        onPress={handleSave}
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
            fontSize: 16,
            fontWeight: '900',
          }}
        >
          SAVE SESSION
        </Text>
      </Pressable>
    </View>
  );
}