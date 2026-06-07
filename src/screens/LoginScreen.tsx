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
        backgroundColor: '#000',
        justifyContent: 'center',
        padding: 24,
      }}
    >
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
            fontSize: 40,
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          NEG MINUTE
        </Text>

        <Text
          style={{
            color: '#FFF',
            textAlign: 'center',
            marginBottom: 32,
            fontSize: 16,
          }}
        >
          Welcome back
        </Text>

        <Text
          style={{
            color: '#666',
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          EMAIL
        </Text>

        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{
            backgroundColor: '#1A1A1A',
            color: '#FFF',
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderWidth: 1,
            borderColor: '#222',
            marginBottom: 20,
          }}
        />

        <Text
          style={{
            color: '#666',
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          PASSWORD
        </Text>

        <TextInput
          placeholder="Enter password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: '#1A1A1A',
            color: '#FFF',
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderWidth: 1,
            borderColor: '#222',
            marginBottom: 28,
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
            backgroundColor: '#F5B800',
            borderRadius: 18,
            paddingVertical: 18,
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
            LOGIN
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate('Signup')
          }
          style={{
            marginTop: 20,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#F5B800',
              fontWeight: '700',
            }}
          >
            Don't have an account? Create one
          </Text>
        </Pressable>
      </View>
    </View>
  );
}