import { useNavigation } from "@react-navigation/native";
import { ItemProps, RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { CartContext, CartContextType } from "../../providers/CartContext";
import { FavoritesContext, FavoritesContextType } from "../../providers/FavoritesContext";
import { useContext, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, View, Text, StyleSheet } from "react-native";
import { IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Animated } from 'react-native';

type ItemComponentProps = {
    item: ItemProps;
};

const ItemComponent: React.FC<ItemComponentProps> = ({ item }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const cartContext = useContext<CartContextType | undefined>(CartContext);
    const favoritesContext = useContext<FavoritesContextType | undefined>(FavoritesContext);
    const opacityValue = useRef(new Animated.Value(1)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;


    const handleFavouritePress = () => {
        if (!isFavourite(item)) {
            Animated.parallel([
                Animated.timing(scaleValue, {
                    toValue: 1.2,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue, {
                    toValue: 0.5,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                handleAddToFavorites(item);
                scaleValue.setValue(1);
                opacityValue.setValue(1);
            });
        } else {
            handleRemoveFromFavorites(item);
        }
    };

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

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ItemDetailsPage', { item })}>
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{`${item.price} ₺`}</Text>
                <View style={styles.buttonsSection}>
                    <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.button}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleFavouritePress}>
                        <Animated.View
                            style={{
                                transform: [{ scale: !isFavourite(item) ? scaleValue : 1.1 }],
                                opacity: isFavourite(item) ? opacityValue : 1,
                            }}
                        >
                            <IconButton
                                icon={() => (
                                    <MaterialCommunityIcons
                                        name={isFavourite(item) ? 'heart' : 'heart-outline'}
                                        color={isFavourite(item) ? 'red' : 'gray'}
                                        size={24}
                                    />
                                )}
                                size={14}
                                style={styles.favouriteButton}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    loader: {
        marginVertical: 20,
    },
    favouriteButton: {
    },
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    buttonsSection:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    price: {
        textAlign: 'center',
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#FF6000',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ItemComponent;