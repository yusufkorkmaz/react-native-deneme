import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { ItemProps, RootStackParamList } from '../../types';
import { CartContext, CartContextType } from '../../providers/CartContext';
import { FavoritesContext, FavoritesContextType } from '../../providers/FavoritesContext';

const ItemsListPage = () => {
    const [products, setProducts] = useState<ItemProps[]>([{
        "createdAt": "2023-07-16T17:26:39.774Z",
        "name": "Smart Golf 1",
        "image": "https://loremflickr.com/640/480/nightlife",
        "price": "1.00",
        "description": "Architecto maiores culpa similique numquam veniam delectus sequi sint illum. Aliquam sunt magnam sunt dolore sint iste tempore facilis explicabo. Eius totam eius corporis earum expedita ad nihil voluptatibus sint. Quae at quibusdam nostrum. Omnis voluptatum tenetur praesentium quibusdam accusamus. Iusto quod blanditiis.\nItaque aspernatur provident. Aliquam sint dolorum adipisci odio. Soluta hic fugit magnam quo. Omnis cum culpa et magni autem qui tenetur.\nEius soluta aliquam quo odio inventore et. In assumenda molestias recusandae excepturi voluptate ut pariatur. Nobis fugit omnis quidem nesciunt. Molestias odio dignissimos esse rem eveniet tempora distinctio autem ipsa. Laboriosam ex nostrum rerum maxime. Debitis perferendis rem officia alias commodi et.",
        "model": "1",
        "brand": "Cadillac",
        "id": "1"
    }, {
        "createdAt": "2023-07-16T17:26:39.774Z",
        "name": "Smart Golf 2",
        "image": "https://loremflickr.com/640/480/nightlife",
        "price": "2.00",
        "description": "Architecto maiores culpa similique numquam veniam delectus sequi sint illum. Aliquam sunt magnam sunt dolore sint iste tempore facilis explicabo. Eius totam eius corporis earum expedita ad nihil voluptatibus sint. Quae at quibusdam nostrum. Omnis voluptatum tenetur praesentium quibusdam accusamus. Iusto quod blanditiis.\nItaque aspernatur provident. Aliquam sint dolorum adipisci odio. Soluta hic fugit magnam quo. Omnis cum culpa et magni autem qui tenetur.\nEius soluta aliquam quo odio inventore et. In assumenda molestias recusandae excepturi voluptate ut pariatur. Nobis fugit omnis quidem nesciunt. Molestias odio dignissimos esse rem eveniet tempora distinctio autem ipsa. Laboriosam ex nostrum rerum maxime. Debitis perferendis rem officia alias commodi et.",
        "model": "2",
        "brand": "Cadillac",
        "id": "2"
    }, {
        "createdAt": "2023-07-16T17:26:39.774Z",
        "name": "Smart Golf 3",
        "image": "https://loremflickr.com/640/480/nightlife",
        "price": "3.00",
        "description": "Architecto maiores culpa similique numquam veniam delectus sequi sint illum. Aliquam sunt magnam sunt dolore sint iste tempore facilis explicabo. Eius totam eius corporis earum expedita ad nihil voluptatibus sint. Quae at quibusdam nostrum. Omnis voluptatum tenetur praesentium quibusdam accusamus. Iusto quod blanditiis.\nItaque aspernatur provident. Aliquam sint dolorum adipisci odio. Soluta hic fugit magnam quo. Omnis cum culpa et magni autem qui tenetur.\nEius soluta aliquam quo odio inventore et. In assumenda molestias recusandae excepturi voluptate ut pariatur. Nobis fugit omnis quidem nesciunt. Molestias odio dignissimos esse rem eveniet tempora distinctio autem ipsa. Laboriosam ex nostrum rerum maxime. Debitis perferendis rem officia alias commodi et.",
        "model": "3",
        "brand": "Cadillac",
        "id": "3"
    },]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const fetchProducts = () => {
        if (isLoading) return;

        setIsLoading(true);
        /*axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}&limit=12`)
            .then(response => {
                setProducts(prev => [...prev, ...response.data]);
                setPage(page + 1);
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));*/
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const cartContext = useContext<CartContextType | undefined>(CartContext);
    const favoritesContext = useContext<FavoritesContextType | undefined>(FavoritesContext);

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

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const renderFooter = () => {
        if (!isLoading) return null;
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    };

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            initialNumToRender={12}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
        />
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
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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

export default ItemsListPage;
