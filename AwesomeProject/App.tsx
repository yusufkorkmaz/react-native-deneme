import * as React from 'react';
import { SafeAreaView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from './src/components/bottomBar';
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomTabBar />
      </NavigationContainer>
    </SafeAreaView>
  );
}
