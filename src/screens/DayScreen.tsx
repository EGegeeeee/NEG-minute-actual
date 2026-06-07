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
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#FFF',
            fontSize: 18,
          }}
        >
          ДАСГАЛ ОЛДООГҮЙ
        </Text>
      </View>
    );
  }

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
         {day}-Р ӨДӨР
      </Text>

      <View
        style={{
          backgroundColor: '#111',
          borderRadius: 28,
          padding: 28,
          borderWidth: 1,
          borderColor: '#222',
        }}
      >
        <Text
          style={{
            color: '#F5B800',
            fontSize: 36,
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          {exercise.title}
        </Text>

        <Text
          style={{
            fontSize: 64,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          💪
        </Text>

        <Text
          style={{
            color: '#FFF',
            fontSize: 16,
            lineHeight: 26,
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          {exercise.description}
        </Text>

        <View
          style={{
            backgroundColor: '#1A1A1A',
            borderRadius: 18,
            padding: 18,
            marginBottom: 28,
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
            ДАСГАЛЫН ХУГАЦАА
          </Text>

          <Text
            style={{
              color: '#F5B800',
              fontSize: 42,
              fontWeight: '900',
              marginTop: 6,
            }}
          >
            {exercise.duration}
          </Text>

          <Text
            style={{
              color: '#FFF',
            }}
          >
            Секунд
          </Text>
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate('Measure', {
              day: exercise.day,
              phase: 'pre',
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
              fontSize: 16,
              fontWeight: '900',
            }}
          >
            ЭХЛЭХ
          </Text>
        </Pressable>
      </View>
    </View>
  );
}