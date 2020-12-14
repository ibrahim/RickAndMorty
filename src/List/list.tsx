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
    name: string;
    errorMessages: string[];
    refreshing: boolean;
    setErrorMessages: (s: string[]) => void;
    setRefreshing: (s: boolean) => void;
    setPage: (s: number) => void;
}
type Props = NavigationProp & ComponentProps & HooksProps;

interface RenderItemProps {
    item: Character;
    index: number;
}

const NOT_FOUND = '404: Not Found';

const human = (message: string) => {
    switch (message) {
        case NOT_FOUND:
            return 'No matching name was found.';
    }
    return '';
};

const keyExtractor = (item: Character, index: number) => `${item.id}-${index}`;

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

const List = (props: Props): JSX.Element => {
    const { navigation, characters, info, name, setPage, refreshing, errorMessages, setRefreshing } = props;
    const [items, setItems] = React.useState<Character[]>([]);
    const [lastName, setLastName] = React.useState<string>('');

    React.useEffect(() => {
        if (characters) {
            const isSearchResults = lastName !== name;
            setItems((state) => (isSearchResults ? characters : [...state, ...characters]));
            setRefreshing(false);
        }
    }, [characters]);

    React.useEffect(() => {
        if (lastName !== name) setLastName(name);
    }, [name]);

    const nextPage = React.useCallback(() => {
        if (refreshing) return;
        if (info && info.next) {
            setPage(info.next);
            setRefreshing(true);
        }
    }, [info, setPage, refreshing]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                style={styles.list}
                keyExtractor={keyExtractor}
                data={items}
                renderItem={({ item }: RenderItemProps) => {
                    return (
                        <ListItem bottomDivider onPress={() => navigation.navigate('Details', { id: '1' })}>
                            {item.image && <Avatar title={item.name} source={{ uri: item.image }} />}
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    );
                }}
                ListFooterComponent={() => {
                    if (!refreshing) return null;
                    return <ActivityIndicator size="large" />;
                }}
                ListFooterComponentStyle={{ padding: 60 }}
                ListHeaderComponent={SearchBox}
                ListEmptyComponent={<ErrorMessage errorMessages={errorMessages} />}
                stickyHeaderIndices={[0]}
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

const useHooksToProps = () => {
    const { getName, getPage, setPage, setRefreshing, setErrorMessages } = useAppContext();

    return {
        name: getName(),
        page: getPage(),
        setPage,
        setErrorMessages,
        setRefreshing,
    };
};

export default withHooks(useHooksToProps)(List);
