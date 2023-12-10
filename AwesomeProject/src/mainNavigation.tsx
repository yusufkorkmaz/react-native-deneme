import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ItemDetailsPage from './screens/itemDetailsPage';
import ItemsListPage from './screens/itemsListPage';
import CartPage from './screens/cartPage';
import FavoritesPage from './screens/favoritesPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme, } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackPage() {
  return (
    <HomeStack.Navigator>
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
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6000',
        tabBarInactiveTintColor: 'gray',
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
            <MaterialCommunityIcons name="cart" color={color} size={26} />
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

export default MainNavigation;
