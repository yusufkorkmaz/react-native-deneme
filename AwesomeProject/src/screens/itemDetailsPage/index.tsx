import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ItemDetailsPageProps, ItemProps } from '../../types';
import { Button } from 'react-native-paper';
import { CartContext, CartContextType } from '../../providers/CartContext';
import AddToFavoritesButton from '../../components/addToFavoritesButton';

const ItemDetailsPage: React.FC<ItemDetailsPageProps> = ({ route }) => {
    const item = route?.params?.item;
    const cartContext = useContext<CartContextType | undefined>(CartContext);
    const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);

    useEffect(() => {
        if (item) {
            setSelectedItem(item);
        }
    }, [item]);

    if (!selectedItem) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    const addToCard = () => {
        cartContext?.addToCart(selectedItem);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{selectedItem.name}</Text>
            <Image source={{ uri: selectedItem.image }} style={styles.image} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.description}>{selectedItem.description}  asdlkjaslkdjalksdj ajskldlkja slkdjlaksjd lkjasdlkja slkjd</Text>
            </ScrollView>
            <Text style={styles.price}>Price: {selectedItem.price} ₺</Text>
            <View style={styles.buttonsSection}>
                <View style={styles.addToCartButton}>
                    <Button mode="contained" onPress={addToCard} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Add to Cart
                        </Text>
                    </Button>
                </View>
                <AddToFavoritesButton item={selectedItem} iconButtonSize={48} iconSize={40} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    buttonsSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    addToCartButton: {
        flex: 1,
        marginRight: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },

    button: {
        backgroundColor: '#FF6000',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default ItemDetailsPage;
