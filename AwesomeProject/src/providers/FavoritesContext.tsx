// FavoritesContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ItemProps } from '../types';

export type FavoritesContextType = {
    favoriteItems: ItemProps[];
    addToFavorites: (product: ItemProps) => void;
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

    const addToFavorites = (item: ItemProps) => {
        setFavoriteItems([...favoriteItems, item]);
        saveFavoriteData();
    };

    const removeFromFavorites = (itemId: string) => {
        const updatedFavorites = favoriteItems.filter(item => item.id !== itemId);
        setFavoriteItems(updatedFavorites);
        saveFavoriteData();
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
