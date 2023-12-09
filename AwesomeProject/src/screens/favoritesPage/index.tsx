import React, { useContext } from 'react';
import { Text, FlatList, TouchableOpacity, Image, View, StyleSheet, Button } from 'react-native';
import { ItemProps, RootStackParamList } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FavoritesContext, FavoritesContextType } from '../../providers/FavoritesContext';
import { CartContext, CartContextType } from '../../providers/CartContext';

const FavoritesPage: React.FC = () => {
    const favoritesContext = useContext<FavoritesContextType | undefined>(FavoritesContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const cartContext = useContext<CartContextType | undefined>(CartContext);
 
    const handleAddToFavorites = (item: ItemProps) => {
        favoritesContext?.addToFavorites(item);
    };

    const handleRemoveFromFavorites = (item: ItemProps) => {
        favoritesContext?.removeFromFavorites(item.id);
    };

    const handleAddToCart = (item: ItemProps) => {
        cartContext?.addToCart(item);
    };

    const isFavourite = (item: ItemProps) => {
        return favoritesContext?.favoriteItems.some(favItem => favItem.id === item.id);
    };

    const renderItem = ({ item }: { item: ItemProps }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ItemDetailsPage', { item })}>
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{`${item.price} ₺`}</Text>
                <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.button}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => isFavourite(item) ? handleRemoveFromFavorites(item) : handleAddToFavorites(item)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>{isFavourite(item) ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <FlatList
                data={favoritesContext?.favoriteItems}
                renderItem={renderItem}
                keyExtractor={(item: ItemProps) => item.id}
            />

            {
                favoritesContext?.favoriteItems.length === 0
                    ? <Text style={{ textAlign: 'center' }}>Favorilerinizde ürün bulunmamaktadır.</Text>
                    : null
            }
        </>
    );
};

const styles = StyleSheet.create({
    loader: {
        marginVertical: 20,
    },
    favouriteButton: {
        padding: 10,
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
    },
    card: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    price: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});
export default FavoritesPage;
