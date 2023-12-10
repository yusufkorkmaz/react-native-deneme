import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ItemDetailsPage from './screens/itemDetailsPage';
import ItemsListPage from './screens/itemsListPage';
import CartPage from './screens/cartPage';
import FavoritesPage from './screens/favoritesPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { CartContext, CartContextType } from './providers/CartContext';
import { useContext, useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackPage() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="HomeStack"
        options={{
          headerTitle: 'Items',
        }}
        component={ItemsListPage}
      />
      <HomeStack.Screen
        name="ItemDetailsPage"
        options={{
          headerTitle: 'Item Details',
        }}
        component={ItemDetailsPage}
      />
    </HomeStack.Navigator>
  );
}

const MainNavigation = () => {
  const cartContext = useContext<CartContextType | undefined>(CartContext);
  const [cartItemsLength, setCartItemsLength] = useState(cartContext?.cartItems.length ?? 0);

  useEffect(() => {
    if (!cartContext) return;
    setCartItemsLength(cartContext.cartItems.length);
  }, [cartContext?.cartItems]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6000',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#FF6000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartPage}
        options={{
          tabBarIcon: ({ color }) => (
            <>
              {
                (cartItemsLength && cartItemsLength > 0) ?
                  <Text style={styles.itemInCartCountText}>{cartItemsLength ?? ''}</Text> :
                  null
              }
              <MaterialCommunityIcons name="cart" color={color} size={26} />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesPage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>

  );
};

const styles = StyleSheet.create({
  itemInCartCountText: {
    position: 'absolute',
    top: -8,
    right: 45,
    backgroundColor: '#FF6000',
    borderRadius: 50,
    width: 18,
    height: 18,
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default MainNavigation;
