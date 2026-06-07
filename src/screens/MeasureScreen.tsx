import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import PPGCamera from '../components/PPGCamera';

export default function MeasureScreen({
  route,
  navigation,
}: any) {
  const {
    day,
    phase = 'pre',
    preBpm,
  } = route.params || {};

  const [measuring, setMeasuring] =
    useState(false);

  const [secondsLeft, setSecondsLeft] =
    useState(15);

  useEffect(() => {
    if (!measuring) return;

    if (secondsLeft <= 0) {
      const fakeBpm =
        Math.floor(Math.random() * 30) + 70;

      if (phase === 'pre') {
        navigation.navigate('Session', {
          day,
          preBpm: fakeBpm,
          measurementComplete: true,
        });
      } else {
        navigation.navigate('Result', {
          day,
          preBpm,
          postBpm: fakeBpm,
          measurementComplete: true,
        });
      }

      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    measuring,
    secondsLeft,
    navigation,
    day,
    phase,
    preBpm,
  ]);

  return (
    
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
    >
      <PPGCamera />

      {/* Dark overlay */}
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.45)',
        }}
      />

      {/* Content */}
      <View
        style={{
          position: 'absolute',
          top: 80,
          left: 24,
          right: 24,
          bottom: 40,
          justifyContent: 'space-between',
        }}
      >
        {/* Header */}
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#666',
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            {phase === 'pre'
              ? 'ЭХНИЙ АЛХАM'
              : 'ГУРАВДАХ АЛХАM'}
          </Text>

          <Text
            style={{
              color: '#F5B800',
              fontSize: 28,
              fontWeight: '900',
              textAlign: 'center',
            }}
          >
            {phase === 'pre'
              ? 'ДАСГАЛЫН ӨМНӨХ ХЭМЖИЛТ'
              : 'ДАСГАЛЫН ДАРААХ ХЭМЖИЛТ'}
          </Text>

          <Text
            style={{
              color: '#FFF',
              marginTop: 16,
              textAlign: 'center',
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            ХУРУУГААРАА КАMЕР БОЛОН ФЛАШИЙГ БҮРЭН ХААГААРАЙ{'\n'}
            {'\n'}
            Дараа нь START товчийг дарж, 15 секунд хүлээгээрэй
          </Text>
        </View>

        {/* Center Card */}
        <View
          style={{
            backgroundColor: 'rgba(17,17,17,0.92)',
            borderRadius: 24,
            padding: 32,
            borderWidth: 1,
            borderColor: '#222',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 56,
              marginBottom: 16,
            }}
          >
            ❤️
          </Text>

          {measuring ? (
            <>
              <Text
                style={{
                  color: '#F5B800',
                  fontSize: 100,
                  fontWeight: '900',
                  lineHeight: 110,
                }}
              >
                {secondsLeft}
              </Text>

              <Text
                style={{
                  color: '#FFF',
                  marginTop: 12,
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                ХЭМЖИЛТ ХИЙЖ БАЙНА...
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 18,
                  textAlign: 'center',
                  marginBottom: 24,
                }}
              >
                ХЭМЖИЛТ ЭХЛҮҮЛЭХЭД БЭЛЭН
                {'\n'}
                ЭХЛЭХ товчийг дарна уу
             
              </Text>

              <Pressable
                onPress={() => {
                  setSecondsLeft(15);
                  setMeasuring(true);
                }}
                style={{
                  backgroundColor: '#F5B800',
                  paddingVertical: 16,
                  paddingHorizontal: 32,
                  borderRadius: 18,
                  minWidth: 240,
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
                  START {phase === 'pre'
                    ? 'ӨMНӨХ'
                    : 'ДАРААХ'} MEASUREMENT
                </Text>
              </Pressable>
            </>
          )}
        </View>
        {/* Bottom spacer */}
        <View />
      </View>
    </View>
    
  );
}