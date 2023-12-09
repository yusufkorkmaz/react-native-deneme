import * as React from 'react';
import { SafeAreaView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/mainNavigation';
import { CartProvider } from './src/providers/CartContext';
import { FavoritesProvider } from './src/providers/FavoritesContext';
export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </FavoritesProvider>
    </CartProvider>
  );
}
