import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

export default function SessionScreen({
  route,
  navigation,
}: any) {
  const { day } = route.params;

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
          marginBottom: 20,
        }}
      >
        Session Day {day}
      </Text>

      <Pressable
        onPress={() =>
          navigation.navigate('Measure', {
            day,
          })
        }
        style={{
          padding: 16,
          borderWidth: 1,
        }}
      >
        <Text>Go To Measure</Text>
      </Pressable>
    </View>
  );
}