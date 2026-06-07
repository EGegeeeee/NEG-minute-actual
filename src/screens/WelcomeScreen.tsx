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
          NEG MИНУТ
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#FFF',
            textAlign: 'center',
            lineHeight: 28,
            maxWidth: 320,
          }}
        >
          MИНУТ MИНУТААР ХӨГЖИХЭД БЭЛЭН ҮҮ?
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
            БҮРТГЭЛ ҮҮСГЭХ
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
            НЭВТРЭХ
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
        ӨДӨР БҮТ • 1 MИНУТ • 30 ӨДӨР
      </Text>
    </View>
  );
}