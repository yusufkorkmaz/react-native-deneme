import React, { useContext, useEffect } from 'react';
import { Text, FlatList, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { CartContext, CartContextType } from '../../providers/CartContext';
import { ItemProps, RootStackParamList } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const CartPage: React.FC = () => {
    const cartContext = useContext<CartContextType | undefined>(CartContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const increaseItemCount = (productId: string) => {
        cartContext?.increaseItemCount(productId);
    };

    const decreaseItemCount = (productId: string) => {
        cartContext?.decreaseItemCount(productId);
    };

    const renderItem = ({ item }: { item: ItemProps }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ItemDetailsPage', { item })}>
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{`${item.price} ₺`}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => increaseItemCount(item.id)}>
                        <Text>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.price}>{item.itemCountInCart}</Text>
                    <TouchableOpacity onPress={() => decreaseItemCount(item.id)}>
                        {
                            item.itemCountInCart && item.itemCountInCart > 1
                                ? <Text>-</Text>
                                : <Text>Sil</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <>
            <FlatList
                data={cartContext?.cartItems}
                renderItem={renderItem}
                keyExtractor={(item: ItemProps) => item.id}
            />

            {
                cartContext?.cartItems.length === 0
                    ? <Text style={{ textAlign: 'center' }}>Sepetinizde ürün bulunmamaktadır.</Text>
                    : <TouchableOpacity
                        onPress={() => { }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Complete</Text>
                    </TouchableOpacity>
            }


        </>
    );
};

const styles = StyleSheet.create({
    loader: {
        marginVertical: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
    },
    card: {
        flex: 1,
        flexDirection: 'row',
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
export default CartPage;
