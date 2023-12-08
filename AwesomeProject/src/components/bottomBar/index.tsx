import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import ItemsListPage from '../../screens/itemsListPage';
import ItemDetailsPage from '../../screens/itemDetailsPage';
import CartPage from '../../screens/cartPage';
import FavouritesPage from '../../screens/favouritesPage';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ItemsListPage} />
            <Tab.Screen name="Cart" component={CartPage} />
            <Tab.Screen name="Favourites" component={FavouritesPage} />
           {/* <Tab.Screen name="ItemDetailsPage" component={ItemDetailsPage} />*/}
        </Tab.Navigator>
    );
};

export default BottomTabBar;
 