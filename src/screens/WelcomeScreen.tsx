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
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 42,
          fontWeight: 'bold',
          marginBottom: 16,
        }}
      >
        NEG MINUTE
      </Text>

      <Text
        style={{
          fontSize: 18,
          marginBottom: 40,
        }}
      >
        Build a daily exercise habit in one minute.
      </Text>

      <Pressable
        onPress={() =>
          navigation.navigate('Signup')
        }
        style={{
          padding: 16,
          borderWidth: 1,
          marginBottom: 16,
          alignItems: 'center',
        }}
      >
        <Text>Create Account</Text>
      </Pressable>

      <Pressable
        onPress={() =>
          navigation.navigate('Login')
        }
        style={{
          padding: 16,
          borderWidth: 1,
          alignItems: 'center',
        }}
      >
        <Text>Log In</Text>
      </Pressable>
    </View>
  );
}