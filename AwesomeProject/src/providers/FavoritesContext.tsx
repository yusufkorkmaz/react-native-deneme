import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ItemProps } from '../types';

export type FavoritesContextType = {
    favoriteItems: ItemProps[];
    addToFavorites: (item: ItemProps) => void;
    removeFromFavorites: (productId: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

type FavoritesProviderProps = {
    children: ReactNode;
};

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
    const [favoriteItems, setFavoriteItems] = useState<ItemProps[]>([]);

    const saveFavoriteData = async () => {
        try {
            await AsyncStorage.setItem('@favoriteItems', JSON.stringify(favoriteItems));
        } catch (error) {
            console.error('Error saving favorite data:', error);
        }
    };

    const loadFavoriteData = async () => {
        try {
            const favoriteData = await AsyncStorage.getItem('@favoriteItems');
            if (favoriteData !== null) {
                setFavoriteItems(JSON.parse(favoriteData));
            }
        } catch (error) {
            console.error('Error loading favorite data:', error);
        }
    };

    useEffect(() => {
        loadFavoriteData();
    }, []);

    useEffect(() => {
        saveFavoriteData();
    }, [favoriteItems]);

    const addToFavorites = (newItem: ItemProps) => {
        if (!favoriteItems.some(item => item.id === newItem.id)) {
            const updatedFavorites = [...favoriteItems, newItem];
            setFavoriteItems(updatedFavorites);
            saveFavoriteData();
        }
    };

    const removeFromFavorites = async (itemId: string) => {
        try {
            const favouritesData = await AsyncStorage.getItem('@favoriteItems');
            let updatedFavouriteItems = [];

            if (favouritesData !== null) {
                const favouritesArray = JSON.parse(favouritesData);
                updatedFavouriteItems = favouritesArray.filter((item: ItemProps) => item.id !== itemId);
                await AsyncStorage.setItem('@favoriteItems', JSON.stringify(updatedFavouriteItems));
            }
            setFavoriteItems(updatedFavouriteItems);
        } catch (error) {
            console.error('Error updating favourites in AsyncStorage:', error);
        }
    };

    const favoritesContextValue: FavoritesContextType = {
        favoriteItems,
        addToFavorites,
        removeFromFavorites,
    };

    return (
        <FavoritesContext.Provider value={favoritesContextValue}>
            {children}
        </FavoritesContext.Provider>
    );
};
