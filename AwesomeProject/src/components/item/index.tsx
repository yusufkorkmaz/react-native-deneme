import { useNavigation } from "@react-navigation/native";
import { ItemProps, RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { CartContext, CartContextType } from "../../providers/CartContext";
import { useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, View, Text, StyleSheet } from "react-native";
import { windowSize } from "../../consts";
import AddToFavoritesButton from "../addToFavoritesButton";

type ItemComponentProps = {
    item: ItemProps;
};

const ItemComponent: React.FC<ItemComponentProps> = ({ item }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const cartContext = useContext<CartContextType | undefined>(CartContext);

    const handleAddToCart = (item: ItemProps) => {
        cartContext?.addToCart(item);
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ItemDetailsPage', { item })}>
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{`${item.price} ₺`}</Text>
                <View style={styles.buttonsSection}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.button}>
                            <Text style={styles.buttonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <AddToFavoritesButton item={item} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    card: {
        width: windowSize.width * 0.45,
        height: windowSize.height < 500 ? windowSize.height * 0.3 : windowSize.height * 0.45,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    buttonsSection: {
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
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
    },
    price: {
        textAlign: 'center',
        fontSize: 18,
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