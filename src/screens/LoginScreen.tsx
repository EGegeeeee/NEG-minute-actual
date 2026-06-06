import React, { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';

export default function LoginScreen({
  navigation,
}: any) {
  const { signIn } = useAuthActions();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

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
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 24,
        }}
      >
        Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
        }}
      />

      <Pressable
        onPress={async () => {
          try {
            await signIn('password', {
              flow: 'signIn',
              email,
              password,
            });

            navigation.replace(
              'Home'
            );
          } catch (error: any) {
            Alert.alert(
              'Login Failed',
              String(error)
            );
          }
        }}
        style={{
          padding: 16,
          borderWidth: 1,
          alignItems: 'center',
        }}
      >
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}