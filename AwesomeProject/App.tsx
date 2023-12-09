import * as React from 'react';
import { SafeAreaView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/mainNavigation';
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}
