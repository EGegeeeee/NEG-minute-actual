import React, { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';

export default function SignupScreen({
  navigation,
}: any) {
  const { signIn } = useAuthActions();

  const [email, setEmail] =
    useState('');

  const [username, setUsername] =
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
        Create Account
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
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
            const result = await signIn(
              'password',
              {
                flow: 'signUp',
                email,
                password,
              }
            );

            console.log(
              'SIGNUP RESULT',
              result
            );

            navigation.replace(
              'Home'
            );
          } catch (error: any) {
            console.log(
              'SIGNUP ERROR',
              error
            );

            Alert.alert(
              'Signup Failed',
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
        <Text>Create Account</Text>
      </Pressable>
    </View>
  );
}