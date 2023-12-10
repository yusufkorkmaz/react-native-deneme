import * as React from 'react';
import { SafeAreaView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/mainNavigation';
import { CartProvider } from './src/providers/CartContext';
import { FavoritesProvider } from './src/providers/FavoritesContext';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <CartProvider>
          <FavoritesProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <NavigationContainer>
                <MainNavigation />
              </NavigationContainer>
            </SafeAreaView>
          </FavoritesProvider>
        </CartProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
