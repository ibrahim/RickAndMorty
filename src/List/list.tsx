import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SearchBox } from './search-box'
import { ChildDataProps, Character, NavigationProp } from './';
import { IContext, useSharedState } from '../shared-state';

type Props = NavigationProp;

interface RenderItemProps {
    items: Character;
    index: number;
}

const renderItem = (props: RenderItemProps & NavigationProp) => {
    const { item, navigation } = props;
    return (
        <ListItem bottomDivider onPress={() => navigation.navigate('Details', { id: '1' })}>
            <Avatar title={item.name} source={item.image && { uri: item.image }} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );
};

const keyExtractor = (item, index) => index.toString();

const List = (props: Props): JSX.Element => {
    const { navigation, characters, info, loading } = props;
    const [items, setItems] = React.useState<[Character]>([]);
    const [refreshing, setRefreshing] = React.useState<Boolean>(false);
    const { page, setPage } = useSharedState();

    React.useEffect(() => {
        if (characters) {
            setItems((state) => [...state, ...characters]);
            setRefreshing(false);
        }
    }, [characters]);

    const nextPage = React.useCallback(
        (page: number) => {
            if (refreshing) return;
            if (info && info.next) {
                setPage(info.next);
                setRefreshing(true);
            }
        },
        [info, setPage, refreshing],
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                style={styles.list}
                keyExtractor={keyExtractor}
                data={items}
                renderItem={(character) => renderItem({ ...character, navigation })}
                ListFooterComponent={() => {
                    if (!refreshing) return null;
                    return <ActivityIndicator />;
								}}
								ListFooterComponentStyle={{ padding: 30 }}
								ListHeaderComponent={ SearchBox }
                onEndReached={nextPage}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '100%',
    },
});

export default List;
