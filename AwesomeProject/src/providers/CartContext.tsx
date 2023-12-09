import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ItemProps } from '../types';

export type CartContextType = {
    cartItems: ItemProps[];
    increaseItemCount: (productId: string) => void;
    decreaseItemCount: (productId: string) => void;
    addToCart: (item: ItemProps) => void;
    removeFromCart: (productId: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<ItemProps[]>([]);

    const saveCartData = async () => {
        try {
            await AsyncStorage.setItem('@cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart data:', error);
        }
    };

    const loadCartData = async () => {
        try {
            const cartData = await AsyncStorage.getItem('@cartItems');
            if (cartData !== null) {
                setCartItems(JSON.parse(cartData));
            }
        } catch (error) {
            console.error('Error loading cart data:', error);
        }
    };

    useEffect(() => {
        loadCartData();
    }, []);


    const addToCart = (product: ItemProps) => {
        const updatedCart = [...cartItems];
        const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].itemCountInCart = (updatedCart[existingItemIndex].itemCountInCart || 1) + 1;
        } else {
            updatedCart.push({ ...product, itemCountInCart: 1 });
        }

        setCartItems(updatedCart);
        saveCartData();
    };

    const increaseItemCount = (itemId: string) => {
        const updatedCart = cartItems.map(item =>
            item.id === itemId ? { ...item, itemCountInCart: (item.itemCountInCart || 0) + 1 } : item
        );
        setCartItems(updatedCart);
        saveCartData();
    };

    const decreaseItemCount = (itemId: string) => {
        let isItemRemoved = false;
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                const updatedCount = (item.itemCountInCart || 0) - 1;
                if (updatedCount <= 0) {
                    isItemRemoved = true;
                    return null;
                }
                return { ...item, itemCountInCart: updatedCount };
            }
            return item;
        }).filter(item => item !== null);

        setCartItems(updatedCart as ItemProps[]);
        saveCartData();

        if (isItemRemoved) {
            removeFromCart(itemId);
        }
    };

    const removeFromCart = async (itemId: string) => {
        try {
            const cartData = await AsyncStorage.getItem('@cartItems');
            if (cartData !== null) {
                const cartItems = JSON.parse(cartData);
                const updatedCartItems = cartItems.filter((item: ItemProps) => item.id !== itemId);
                await AsyncStorage.setItem('@cartItems', JSON.stringify(updatedCartItems));
            }
        } catch (error) {
            console.error('Error updating cart in AsyncStorage:', error);
        }
    };

    const cartContextValue: CartContextType = {
        cartItems,
        addToCart,
        increaseItemCount,
        decreaseItemCount,
        removeFromCart,
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};
