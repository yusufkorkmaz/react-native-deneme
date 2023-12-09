import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ItemDetailsPage from './screens/itemDetailsPage';
import ItemsListPage from './screens/itemsListPage';
import CartPage from './screens/cartPage';
import FavoritesPage from './screens/favoritesPage';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackPage() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        options={{
          headerTitle: 'E-Market',
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
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" options={() => ({ headerShown: false })} component={HomeStackPage} />
      <Tab.Screen name="Cart" component={CartPage} />
      <Tab.Screen name="Favorites" component={FavoritesPage} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
