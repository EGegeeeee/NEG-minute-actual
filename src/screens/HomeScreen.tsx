import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { exercises } from '../constants/exercises';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const completedDays =
    useQuery(api.progress.getCompletedDays) ?? [];

  const completedSet = new Set(
    completedDays.map((d: any) => d.day),
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
      contentContainerStyle={{
        padding: 24,
        paddingTop: 70,
        paddingBottom: 40,
      }}
    >
      {/* Header */}

      <Text
        style={{
          color: '#F5B800',
          fontSize: 42,
          fontWeight: '900',
          textAlign: 'center',
        }}
      >
        NEG MИНУТ
      </Text>

      <Text
        style={{
          color: '#FFF',
          textAlign: 'center',
          marginTop: 12,
          marginBottom: 40,
          fontSize: 16,
          lineHeight: 24,
        }}
      >
        Дасгалынхаа явцыг хянаж, илүү хүчтэй бие бялдартай болоорой. Зөвхөн өдөрт нэг минут зарцуулна.
      </Text>

      {/* Progress */}

      <View
        style={{
          backgroundColor: '#111',
          borderRadius: 24,
          padding: 20,
          borderWidth: 1,
          borderColor: '#222',
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color: '#666',
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 2,
            marginBottom: 10,
          }}
        >
          PROGRESS
        </Text>

        <Text
          style={{
            color: '#F5B800',
            fontSize: 40,
            fontWeight: '900',
          }}
        >
          {completedDays.length}
        </Text>

        <Text
          style={{
            color: '#FFF',
          }}
        >
          Өдөр Дуусгагдсан
        </Text>
      </View>

      {/* Days */}

      {exercises.map((exercise) => {
        const isCompleted = completedSet.has(
          exercise.day,
        );

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
              backgroundColor: '#111',
              borderRadius: 20,
              padding: 20,
              marginBottom: 14,
              borderWidth: 1,
              borderColor: '#222',
              opacity: isUnlocked ? 1 : 0.45,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent:
                  'space-between',
                alignItems: 'center',
              }}
            >
<View>
  <Text
    style={{
      color: '#F5B800',
      fontSize: 22,
      fontWeight: '800',
    }}
  >
    {exercise.day}-Р ӨДӨР
  </Text>

  <Text
    style={{
      color: '#FFF',
      marginTop: 4,
      fontWeight: '600',
    }}
  >
    {exercise.title}
  </Text>

  <Text
    style={{
      color: '#888',
      marginTop: 4,
      fontSize: 13,
    }}
    numberOfLines={2}
  >
    {exercise.description}
  </Text>
</View>

              <Text
                style={{
                  fontSize: 26,
                }}
              >
                {!isUnlocked
                  ? '🔒'
                  : isCompleted
                  ? '✅'
                  : '▶️'}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}