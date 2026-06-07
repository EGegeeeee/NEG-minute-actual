import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

export default function WelcomeScreen({
  navigation,
}: any) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          marginBottom: 60,
        }}
      >
        <Text
          style={{
            fontSize: 54,
            fontWeight: '900',
            color: '#F5B800',
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          NEG MINUTE
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: '#FFF',
            textAlign: 'center',
            lineHeight: 28,
            maxWidth: 320,
          }}
        >
          Build a stronger body and track
          your heart recovery in just
          one minute a day.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#111',
          borderRadius: 28,
          padding: 24,
          borderWidth: 1,
          borderColor: '#222',
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate('Signup')
          }
          style={{
            backgroundColor: '#F5B800',
            paddingVertical: 18,
            borderRadius: 18,
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              fontWeight: '900',
            }}
          >
            CREATE ACCOUNT
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate('Login')
          }
          style={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#333',
            paddingVertical: 18,
            borderRadius: 18,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#FFF',
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            LOG IN
          </Text>
        </Pressable>
      </View>

      <Text
        style={{
          color: '#666',
          textAlign: 'center',
          marginTop: 30,
          fontSize: 12,
          letterSpacing: 1,
        }}
      >
        DAILY • 1 MINUTE • 30 DAYS
      </Text>
    </View>
  );
}