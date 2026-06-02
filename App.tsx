import React from 'react';
import { ConvexReactClient } from 'convex/react';

import { ConvexAuthProvider } from '@convex-dev/auth/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigator from './src/navigation/AppNavigator';

const convex = new ConvexReactClient(
  'https://sincere-clownfish-832.convex.cloud'
);

export default function App() {
  return (
    <ConvexAuthProvider
      client={convex}
      storage={{
        getItem: key =>
          AsyncStorage.getItem(key),

        setItem: (key, value) =>
          AsyncStorage.setItem(
            key,
            value
          ),

        removeItem: key =>
          AsyncStorage.removeItem(key),
      }}
    >
      <AppNavigator />
    </ConvexAuthProvider>
  );
}