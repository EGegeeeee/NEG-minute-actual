import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import PPGCamera from '../components/PPGCamera';

export default function MeasureScreen({
  route,
  navigation,
}: any) {
  const { day } = route.params;

  const [measuring, setMeasuring] =
    useState(false);

  const [secondsLeft, setSecondsLeft] =
    useState(15);

  useEffect(() => {
    if (!measuring) return;

    if (secondsLeft <= 0) {
      navigation.navigate('Result', {
        day,
      });
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    measuring,
    secondsLeft,
    navigation,
    day,
  ]);

  return (
    <View style={{ flex: 1 }}>
      <PPGCamera />

      <View
        style={{
          position: 'absolute',
          top: 80,
          left: 20,
          right: 20,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Place your finger over the camera and flash
        </Text>
      </View>

      {!measuring ? (
        <Pressable
          onPress={() => {
            setSecondsLeft(15);
            setMeasuring(true);
          }}
          style={{
            position: 'absolute',
            bottom: 60,
            left: 40,
            right: 40,
            padding: 16,
            backgroundColor: 'white',
            alignItems: 'center',
            borderRadius: 12,
          }}
        >
          <Text>Start Measurement</Text>
        </Pressable>
      ) : (
        <View
          style={{
            position: 'absolute',
            bottom: 60,
            left: 40,
            right: 40,
            padding: 16,
            backgroundColor: 'white',
            alignItems: 'center',
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
            }}
          >
            {secondsLeft}
          </Text>
        </View>
      )}
    </View>
  );
}