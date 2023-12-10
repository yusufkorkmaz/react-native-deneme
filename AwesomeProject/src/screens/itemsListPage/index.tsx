import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Modal, View, Button } from 'react-native';
import { ItemProps } from '../../types';
import Item from '../../components/item';
import { IconButton, RadioButton, Searchbar, Text } from 'react-native-paper';

const ItemsListPage = () => {
    const [products, setProducts] = useState<ItemProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [value, setValue] = useState('');

    const onChangeSearch = (query: string) => setSearchQuery(query);
    const toggleFilterModal = () => setFilterModalVisible(!filterModalVisible);

    const filteredProducts = products.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        if (searchQuery) {
            searchProducts();
        } else {
            fetchProducts();
        }
    }, [searchQuery, page]);

    const searchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://5fc9346b2af77700165ae514.mockapi.io/products?search=${searchQuery}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(prevProducts => [...prevProducts, ...data]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const renderItem = ({ item }: { item: ItemProps }) => (
        <Item item={item} />
    );

    const renderFooter = () => {
        if (!isLoading) return null;
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    };

    const sortByPrice = (ascending: boolean) => {
        const sortedProducts = [...products].sort((a: ItemProps, b: ItemProps) => {
            if (ascending) {
                return parseFloat(a.price) - parseFloat(b.price);
            } else {
                return parseFloat(b.price) - parseFloat(a.price);
            }
        });
        setProducts(sortedProducts);
        setFilterModalVisible(false);
    };

    const sortByDate = (newestFirst: boolean) => {
        const sortedProducts = [...products].sort((a: ItemProps, b: ItemProps) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            if (newestFirst) {
                return dateB.getTime() - dateA.getTime();
            } else {
                return dateA.getTime() - dateB.getTime();
            }
        });
        setProducts(sortedProducts);
        setFilterModalVisible(false);
    };

    const handlePress = (newValue: string) => {
        setValue(newValue);
        switch (newValue) {
            case 'lowToHigh':
                sortByPrice(true);
                break;
            case 'highToLow':
                sortByPrice(false);
                break;
            case 'newToOld':
                sortByDate(true);
                break;
            case 'oldToNew':
                sortByDate(false);
                break;
            default:
                break;
        }
        setFilterModalVisible(false);
    };

    const renderFilterModal = () => (
        <Modal visible={filterModalVisible} onRequestClose={() => setFilterModalVisible(false)}>
            <View style={{ padding: 20 }}>
                <RadioButton.Group onValueChange={newValue => handlePress(newValue)} value={value}>
                    <RadioButton.Item label="Price low to high" value="lowToHigh" />
                    <RadioButton.Item label="Price high to low" value="highToLow" />
                    <RadioButton.Item label="New to old" value="newToOld" />
                    <RadioButton.Item label="Old to new" value="oldToNew" />
                </RadioButton.Group>
                <Button title="Close" onPress={() => setFilterModalVisible(false)} />
            </View>
        </Modal>
    );

    const selectSortedCategory = () => {
        switch (value) {
            case 'lowToHigh':
                return 'Price low to high';
            case 'highToLow':
                return 'Price high to low';
            case 'newToOld':
                return 'New to old';
            case 'oldToNew':
                return 'Old to new';
            default:
                return 'No sort selected';
        }
    }

    return (
        <>
            <View style={styles.searchBarAndFilterButtonSection}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchBar}
                />
                <IconButton iconColor='grey' icon="filter-outline" size={40} onPress={toggleFilterModal} />
            </View>
            {
                value != '' ? <Text>Sorted By: {selectSortedCategory()}</Text> : null
            }
            <FlatList
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                initialNumToRender={12}
                onEndReachedThreshold={0.1}
                onEndReached={searchQuery ? null : handleLoadMore}
                ListFooterComponent={renderFooter}
            />
            {renderFilterModal()}
        </>
    );
};

const styles = StyleSheet.create({
    loader: {
        marginVertical: 20,
    },
    searchBar: {
        margin: 10,
        flex: 1,
        height: 55,
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
    searchBarAndFilterButtonSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterButton: {
        margin: 10,
        borderRadius: 5,
        height: 55,

        backgroundColor: '#ffffff',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
