import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { isEmpty } from 'lodash';
import SearchBox from './search-box';
import CharactersFlatList from './characters-list';
import { Character, Info } from './types';
import { getFooter, renderItem, keyExtractor, ErrorMessage } from './helpers';
import { styles } from './styles';

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

export default CharactersList;
