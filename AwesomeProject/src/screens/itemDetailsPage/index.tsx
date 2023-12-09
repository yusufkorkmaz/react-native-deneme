import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios';
import { ItemDetailsPageProps, ItemProps } from '../../types';

const ItemDetailsPage: React.FC<ItemDetailsPageProps> = ({ route }) => {
    const item = route?.params?.item;

    const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);

    useEffect(() => {
        if (item) {
            setSelectedItem(item);
        }
    }, [item]);

    if (!selectedItem) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>{selectedItem.name}</Text>
            <Image source={{ uri: selectedItem.image }} style={{ width: 200, height: 200 }} />
            <Text>{selectedItem.description}</Text>
            <Text>Price: {selectedItem.price}</Text>
        </View>
    );
}

export default ItemDetailsPage;
