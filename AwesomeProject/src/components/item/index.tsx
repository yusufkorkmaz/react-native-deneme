import { useNavigation } from "@react-navigation/native";
import { ItemProps, RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { CartContext, CartContextType } from "../../providers/CartContext";
import { FavoritesContext, FavoritesContextType } from "../../providers/FavoritesContext";
import { useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, View, Text, StyleSheet } from "react-native";

type ItemComponentProps = {
    item: ItemProps;
};

const ItemComponent: React.FC<ItemComponentProps> = ({ item }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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

    return (
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
};

const styles = StyleSheet.create({
    loader: {
        marginVertical: 20,
    },
    favouriteButton: {
        padding: 10,
    },
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    image: {
        width: 100,
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
        backgroundColor: '#0000ff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ItemComponent;