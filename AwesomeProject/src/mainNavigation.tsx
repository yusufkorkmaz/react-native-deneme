import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ItemDetailsPage from './screens/itemDetailsPage';
import ItemsListPage from './screens/itemsListPage';
import CartPage from './screens/cartPage';
import FavouritesPage from './screens/favouritesPage';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackPage() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{ headerShown: false }} name="Items" component={ItemsListPage} />
      <HomeStack.Screen name="ItemDetailsPage" component={ItemDetailsPage} />
    </HomeStack.Navigator>
  );
}

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="E-Market" component={HomeStackPage} />
      <Tab.Screen name="Cart" component={CartPage} />
      <Tab.Screen name="Favourites" component={FavouritesPage} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
