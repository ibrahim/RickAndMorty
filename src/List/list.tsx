import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Platform, Keyboard, ActivityIndicator, SafeAreaView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isEmpty } from 'lodash';
import SearchBox from './search-box';
import { Character, Info } from './types';

export interface ComponentProps {
    characters: Character[];
    info: Info;
    fetchMore: any;
    onEndReached: any;
    navigate: (s: string) => void;
    name: string;
    errorMessages: string[];
    setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
}

export type Props = ComponentProps;

interface RenderItemProps {
    item: Character;
}

const NOT_FOUND = 'Error: 404: Not Found';
const human = (message: string) => {
    switch (message) {
        case NOT_FOUND:
            return 'No matching name was found.';
    }
    return message;
};

const keyExtractor = (item: Character) => `${item.id}-${item.name}`;

const ErrorMessage = ({ errorMessages }: { errorMessages: string[] }) => {
    if (isEmpty(errorMessages)) return null;
    return (
        <View style={styles.errorMessages}>
            {errorMessages &&
                errorMessages.map((msg, i) => (
                    <Text style={{ fontSize: 20 }} key={i}>
                        {human(String(msg))}
                    </Text>
                ))}
        </View>
    );
};

/* eslint-disable-next-line */
export const renderItem = (navigate: (s: string) => void) => ({ item }: RenderItemProps) => {
    return (
        <ListItem
            accessible={true}
            accessibilityLabel="character details"
            testID={'character-' + item.id}
            containerStyle={styles.listItem}
            bottomDivider
            onPress={() => navigate(item.id)}
        >
            {item.image && <Avatar title={item.name} source={{ uri: item.image }} />}
            <ListItem.Content style={{ flexGrow: 1, flex: 1 }}>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );
};
/* eslint-disable-next-line */
export const getFooter = (info: Info) => () => {
    if (!info) return null;
    const noMoreItems = info && !info.next;
    if (noMoreItems) return null;
    return <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 50} color="#555" />;
};
const CharactersList = (props: Props): JSX.Element => {
    const {
        navigate,
        characters,
        info,
        fetchMore,
        onEndReached,
        name,
        setName,
        errorMessages,
        setErrorMessages,
    } = props;

    const Footer = React.useCallback(getFooter(info), [info]);
    const renderItemWithNavigation = React.useCallback(renderItem(navigate), [navigate]);
    const newSearch = async (name: string) => {
        setName(name);
        setErrorMessages([]);
        try {
            await fetchMore({
                variables: { page: 1, filter: { name: name ? name : '' } },
            });
        } catch (e) {
            /* eslint-disable no-console*/
            console.log('SearchBox fetchMore', { e });
            setErrorMessages(Array(e));
        }
    };
    const hasError = !isEmpty(errorMessages);
    const passprops = {
        keyExtractor,
        hasError,
        characters,
        renderItemWithNavigation,
        Footer,
        ErrorMessage,
        errorMessages,
        onEndReached,
        styles,
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={{ flex: 1 }}>
                <SearchBox newSearch={newSearch} name={name} />
                <View style={styles.list}>
                    <CharactersFlatList {...passprops} />
                </View>
            </View>
        </SafeAreaView>
    );
};
export interface CharactersFlatListProps {
    keyExtractor: (s: Character) => string;
    hasError: boolean;
    characters: Character[];
    renderItemWithNavigation: (s: RenderItemProps) => JSX.Element;
    Footer: () => JSX.Element | null;
    ErrorMessage: ({ errorMessages }: { errorMessages: string[] }) => JSX.Element | null;
    errorMessages: string[];
    onEndReached: any;
    styles: any;
}
export const CharactersFlatList = ({
    keyExtractor,
    hasError,
    characters,
    renderItemWithNavigation,
    Footer,
    ErrorMessage,
    errorMessages,
    onEndReached,
    styles,
}: CharactersFlatListProps): JSX.Element => (
    <FlatList
        testID="flat-list"
        keyExtractor={keyExtractor}
        data={hasError ? [] : characters}
        renderItem={renderItemWithNavigation}
        ListFooterComponent={Footer}
        ListFooterComponentStyle={{ padding: 80 }}
        ListEmptyComponent={<ErrorMessage errorMessages={errorMessages} />}
        onScroll={Keyboard.dismiss}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.content}
        /* updateCellsBatchingPeriod={50} */
        /* getItemLayout={getItemLayout} */
        /* maxToRenderPerBatch={30} */
    />
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ccc',
    },
    errorMessages: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    list: {
        width: wp('100%'),
    },
    content: {},
    listItem: {
        width: wp('100%'),
        flexDirection: 'row',
        flex: 1,
        flexGrow: 1,
    },
});

export default CharactersList;
