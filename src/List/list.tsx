import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { isEmpty } from 'lodash';
import SearchBox from './search-box';
import { Character, NavigationProp, Info } from './types';
import { useAppContext, withHooks } from '../context';

interface ComponentProps {
    characters: Character[];
    info: Info;
}
interface HooksProps {
    page: number;
    errorMessages: string[];
    refreshing: boolean;
    setErrorMessages: (s: string[]) => void;
    setRefreshing: (s: boolean) => void;
    nextPage: (s: number) => void;
}
type Props = NavigationProp & ComponentProps & HooksProps;

interface RenderItemProps {
    item: Character;
}

const NOT_FOUND = '404: Not Found';
const ITEM_HEIGHT = 64;
const human = (message: string) => {
    switch (message) {
        case NOT_FOUND:
            return 'No matching name was found.';
    }
    return '';
};

const keyExtractor = (item: Character) => `${item.id}-${item.name}`;

const ErrorMessage = ({ errorMessages }: { errorMessages: string[] }) => {
    if (isEmpty(errorMessages)) return null;
    return (
        <View style={styles.errorMessages}>
            {errorMessages &&
                errorMessages.map((msg, i) => (
                    <Text style={{ fontSize: 20 }} key={i}>
                        {human(msg)}
                    </Text>
                ))}
        </View>
    );
};

//eslint-disable-next-line
const getItemLayout = (data: any, index: number) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index });

const renderItem = ({ navigation }: NavigationProp) => ({ item }: RenderItemProps) => {
    return (
        <ListItem bottomDivider onPress={() => navigation.navigate('Details', { id: '1' })}>
            {item.image && <Avatar title={item.name} source={{ uri: item.image }} />}
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );
};
const List = (props: Props): JSX.Element => {
    const { navigation, characters, info, page, nextPage, refreshing, errorMessages, setRefreshing } = props;
    const [items, setItems] = React.useState<Character[]>([]);

    React.useEffect(() => {
        if (characters) {
            setItems((state) => (page === 1 ? characters : [...state, ...characters]));
            setRefreshing(false);
        }
    }, [characters]);

    const onEndReached = React.useCallback(() => {
        if (info && info.next) {
            nextPage(info.next);
        }
    }, [info, nextPage]);

    const Footer = React.useMemo(() => {
        if (!refreshing) return null;
        console.log({ refreshing });
        return <ActivityIndicator size="large" />;
    }, [refreshing]);

    const renderItemWithNavigation = React.useCallback(renderItem({ navigation }), [navigation]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                style={styles.list}
                keyExtractor={keyExtractor}
                data={items}
                renderItem={renderItemWithNavigation}
                ListFooterComponent={Footer}
                ListFooterComponentStyle={{ padding: 60 }}
                ListHeaderComponent={SearchBox}
                ListEmptyComponent={<ErrorMessage errorMessages={errorMessages} />}
                stickyHeaderIndices={[0]}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                updateCellsBatchingPeriod={50}
                getItemLayout={getItemLayout}
                maxToRenderPerBatch={30}
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
    errorMessages: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    list: {
        width: '100%',
    },
});

const useHooksToProps = (): HooksProps => {
    const { getPage, nextPage, getRefreshing, getErrorMessages, setRefreshing, setErrorMessages } = useAppContext();

    return {
        page: getPage(),
        nextPage,
        errorMessages: getErrorMessages(),
        refreshing: getRefreshing(),
        setErrorMessages,
        setRefreshing,
    };
};

export default withHooks(useHooksToProps)(List);
