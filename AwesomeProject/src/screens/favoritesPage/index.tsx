import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { ItemProps } from '../../types';
import { FavoritesContext, FavoritesContextType } from '../../providers/FavoritesContext';
import Item from '../../components/item';

const FavoritesPage: React.FC = () => {
    const favoritesContext = useContext<FavoritesContextType | undefined>(FavoritesContext);

    const renderItem = ({ item }: { item: ItemProps }) => (
        <Item item={item} />
    );

    return (
        <>
            {
                favoritesContext?.favoriteItems.length === 0 && <Text style={styles.noItemText}>No Item</Text>
            }
            <FlatList
                data={favoritesContext?.favoriteItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                initialNumToRender={12}
                onEndReachedThreshold={0.5}
            />
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
    },
    noItemText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 24,
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
