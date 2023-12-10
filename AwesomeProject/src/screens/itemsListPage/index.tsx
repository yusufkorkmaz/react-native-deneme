import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ItemProps } from '../../types';
import Item from '../../components/item';
import { Searchbar } from 'react-native-paper';

const ItemsListPage = () => {
    const [products, setProducts] = useState<ItemProps[]>([{
        "createdAt": "2023-07-16T17:26:39.774Z",
        "name": "iPhone 15 asdasd asd asda asdsasd",
        "image": "https://loremflickr.com/640/480/nightlife",
        "price": "1.00",
        "description": "Architecto maiores culpa similique numquam veniam delectus sequi sint illum. Aliquam sunt magnam sunt dolore sint iste tempore facilis explicabo. Eius totam eius corporis earum expedita ad nihil voluptatibus sint. Quae at quibusdam nostrum. Omnis voluptatum tenetur praesentium quibusdam accusamus. Iusto quod blanditiis.\nItaque aspernatur provident. Aliquam sint dolorum adipisci odio. Soluta hic fugit magnam quo. Omnis cum culpa et magni autem qui tenetur.\nEius soluta aliquam quo odio inventore et. In assumenda molestias recusandae excepturi voluptate ut pariatur. Nobis fugit omnis quidem nesciunt. Molestias odio dignissimos esse rem eveniet tempora distinctio autem ipsa. Laboriosam ex nostrum rerum maxime. Debitis perferendis rem officia alias commodi et.",
        "model": "1",
        "brand": "Cadillac",
        "id": "1"
    }, {
        "createdAt": "2023-07-16T17:26:39.774Z",
        "name": "iPhone 15 Pro",
        "image": "https://loremflickr.com/640/480/nightlife",
        "price": "2.00",
        "description": "Architecto maiores culpa similique numquam veniam delectus sequi sint illum. Aliquam sunt magnam sunt dolore sint iste tempore facilis explicabo. Eius totam eius corporis earum expedita ad nihil voluptatibus sint. Quae at quibusdam nostrum. Omnis voluptatum tenetur praesentium quibusdam accusamus. Iusto quod blanditiis.\nItaque aspernatur provident. Aliquam sint dolorum adipisci odio. Soluta hic fugit magnam quo. Omnis cum culpa et magni autem qui tenetur.\nEius soluta aliquam quo odio inventore et. In assumenda molestias recusandae excepturi voluptate ut pariatur. Nobis fugit omnis quidem nesciunt. Molestias odio dignissimos esse rem eveniet tempora distinctio autem ipsa. Laboriosam ex nostrum rerum maxime. Debitis perferendis rem officia alias commodi et.",
        "model": "2",
        "brand": "Cadillac",
        "id": "2"
    }, {
        "createdAt": "2023-07-16T17:26:39.774Z",
        "name": "Samsung Galaxy S20",
        "image": "https://loremflickr.com/640/480/nightlife",
        "price": "3.00",
        "description": "Architecto maiores culpa similique numquam veniam delectus sequi sint illum. Aliquam sunt magnam sunt dolore sint iste tempore facilis explicabo. Eius totam eius corporis earum expedita ad nihil voluptatibus sint. Quae at quibusdam nostrum. Omnis voluptatum tenetur praesentium quibusdam accusamus. Iusto quod blanditiis.\nItaque aspernatur provident. Aliquam sint dolorum adipisci odio. Soluta hic fugit magnam quo. Omnis cum culpa et magni autem qui tenetur.\nEius soluta aliquam quo odio inventore et. In assumenda molestias recusandae excepturi voluptate ut pariatur. Nobis fugit omnis quidem nesciunt. Molestias odio dignissimos esse rem eveniet tempora distinctio autem ipsa. Laboriosam ex nostrum rerum maxime. Debitis perferendis rem officia alias commodi et.",
        "model": "3",
        "brand": "Cadillac",
        "id": "3"
    }, {
        "createdAt": "2023-07-16T17:26:39.774Z",
        "name": "General Mobile",
        "image": "https://loremflickr.com/640/480/nightlife",
        "price": "4.00",
        "description": "Architecto maiores culpa similique numquam veniam delectus sequi sint illum. Aliquam sunt magnam sunt dolore sint iste tempore facilis explicabo. Eius totam eius corporis earum expedita ad nihil voluptatibus sint. Quae at quibusdam nostrum. Omnis voluptatum tenetur praesentium quibusdam accusamus. Iusto quod blanditiis.\nItaque aspernatur provident. Aliquam sint dolorum adipisci odio. Soluta hic fugit magnam quo. Omnis cum culpa et magni autem qui tenetur.\nEius soluta aliquam quo odio inventore et. In assumenda molestias recusandae excepturi voluptate ut pariatur. Nobis fugit omnis quidem nesciunt. Molestias odio dignissimos esse rem eveniet tempora distinctio autem ipsa. Laboriosam ex nostrum rerum maxime. Debitis perferendis rem officia alias commodi et.",
        "model": "4",
        "brand": "Cadillac",
        "id": "4"
    },]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const onChangeSearch = (query: string) => setSearchQuery(query);
    const filteredProducts = products.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchProducts = () => {
        if (isLoading) return;

        setIsLoading(true);
        /*axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}&limit=12`)
            .then(response => {
                setProducts(prev => [...prev, ...response.data]);
                setPage(page + 1);
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));*/
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const renderItem = ({ item }: { item: ItemProps }) => (
        <Item item={item} />
    );

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const renderFooter = () => {
        if (!isLoading) return null;
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    };

    return (
        <>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
            />
            <FlatList
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                initialNumToRender={12}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </>
    );
};

const styles = StyleSheet.create({
    loader: {
        marginVertical: 20,
    },
    searchBar: {
        margin: 10,
        borderRadius: 5,
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
