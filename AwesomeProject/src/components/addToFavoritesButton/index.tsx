import { Animated, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ItemProps } from "../../types";
import { useContext, useRef } from "react";
import { FavoritesContext, FavoritesContextType } from "../../providers/FavoritesContext";

const AddToFavoritesButton = ({ item, iconSize = 24, iconButtonSize = 14 }: { item: ItemProps, iconButtonSize?: number, iconSize?: number }) => {
    const favoritesContext = useContext<FavoritesContextType | undefined>(FavoritesContext);
    const opacityValue = useRef(new Animated.Value(1)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handleFavouritePress = () => {
        if (!isFavourite(item)) {
            Animated.parallel([
                Animated.timing(scaleValue, {
                    toValue: 1.5,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue, {
                    toValue: 0.5,
                    duration: 150,
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

    const isFavourite = (item: ItemProps) => {
        return favoritesContext?.favoriteItems.some((favItem: ItemProps) => favItem.id === item.id);
    };

    return (
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
                            size={iconSize}
                        />
                    )}
                    size={iconButtonSize}
                />
            </Animated.View>
        </TouchableOpacity>
    );
}

export default AddToFavoritesButton;