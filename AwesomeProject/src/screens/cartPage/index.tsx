import React, { useContext, useEffect } from 'react';
import { Text, FlatList, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { CartContext, CartContextType } from '../../providers/CartContext';
import { ItemProps, RootStackParamList } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
                <View style={styles.itemNameAndPriceSection}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{`${item.price} ₺`}</Text>
                </View>
                <View style={styles.countSection}>
                    <TouchableOpacity onPress={() => increaseItemCount(item.id)}>
                        <IconButton style={styles.iconButton} iconColor='white' icon="plus" size={14} />
                    </TouchableOpacity>
                    <Text style={styles.count}>{item.itemCountInCart}</Text>
                    <TouchableOpacity onPress={() => decreaseItemCount(item.id)}>
                        {
                            item.itemCountInCart && item.itemCountInCart > 1
                                ? <IconButton style={styles.iconButton} icon="minus" iconColor='white' size={14} />
                                : <IconButton style={styles.deleteIconButton} icon="delete" iconColor='white' size={14} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            {
                cartContext?.cartItems.length === 0 && <Text style={styles.noItemText}>No Item</Text>
            }
            <FlatList
                data={cartContext?.cartItems}
                renderItem={renderItem}
                keyExtractor={(item: ItemProps) => item.id}
            />
            {
                cartContext && cartContext.cartItems.length > 0 &&
                <TouchableOpacity onPress={() => { }} style={styles.completeButton}>
                    <View></View>
                    <Text style={styles.completeButtonText}>Complete</Text>
                    <MaterialCommunityIcons name="arrow-right" size={32} color="white" />
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
    },
    iconButton: {
        backgroundColor: '#FF6000',
        borderRadius: 6,
    },
    deleteIconButton: {
        backgroundColor: '#FF0022',
        borderRadius: 6,
    },
    countSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader: {
        marginVertical: 20,
    },
    noItemText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 24,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        paddingHorizontal: 20,
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
    itemNameAndPriceSection: {
        flex: 1,
        marginLeft: 10,
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
    count: {
        fontSize: 24,
        color: '#000',
    },
    button: {
        backgroundColor: '#FF6000',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    completeButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#FF6000',
        textAlign: 'center',
        marginRight: 10,
        borderRadius: 12,
        marginBottom: 20,
    },
    completeButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 24,
    },
});
export default CartPage;
