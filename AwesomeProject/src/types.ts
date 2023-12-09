import { RouteProp } from "@react-navigation/native";

export type ItemDetailsPageProps = {
    route?: RouteProp<{ ItemDetailsPage: { item: ItemProps }; }, 'ItemDetailsPage'>;
};

export type ItemProps = {
    createdAt: string;
    name: string;
    image: string;
    price: string;
    description: string;
    model: string;
    brand: string;
    id: string;
    itemCountInCart?: number;
};

export type RootStackParamList = {
    ItemDetailsPage: { item: ItemProps } | undefined;
};