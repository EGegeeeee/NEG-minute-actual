import React from 'react';
import {
  ConvexProvider,
  ConvexReactClient,
} from 'convex/react';

import AppNavigator from './src/navigation/AppNavigator';

const convex = new ConvexReactClient(
  'https://sincere-clownfish-832.convex.cloud'
);

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <AppNavigator />
    </ConvexProvider>
  );
}