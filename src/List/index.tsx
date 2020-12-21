import React from 'react';
import { useQuery } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, Keyboard } from 'react-native';
import { get } from 'lodash';
import List from './list';
import SearchBox from './search-box';
import { NavigationProp, Variables, Response } from './types';
import { CHARACTERS_QUERY } from './queries';
import { styles } from './styles';

type Props = NavigationProp;

export const ListContainer = (props: Props): JSX.Element => {
    const [name, setName] = React.useState<string>('');
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
    const { data, fetchMore } = useQuery<Response, Variables>(CHARACTERS_QUERY, {
        variables: {
            filter: { name: '' },
            page: 1,
        },
    });

    const info = get(data, 'characters.info', null);
    const characters = get(data, 'characters.results', []);

    const navigate = (id: string) => props.navigation.navigate('Details', { id });

    const onEndReached = React.useCallback(async () => {
        Keyboard.dismiss();
        if (info && info.next) {
            try {
                await fetchMore({
                    variables: { page: info.next, filter: { name } },
                });
            } catch (error) {
                /* eslint-disable no-console*/
                //console.info('Error Fetch more', { error });
                setErrorMessages(Array(error));
            }
        }
    }, [info, name, setErrorMessages]);

    const newSearch = React.useCallback(
        async (name: string) => {
            setName(name);
            setErrorMessages([]);
            try {
                await fetchMore({
                    variables: { page: 1, filter: { name: name ? name : '' } },
                });
            } catch (e) {
                setErrorMessages(Array(e));
            }
        },
        [setName, setErrorMessages],
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={{ flex: 1 }}>
                <SearchBox newSearch={newSearch} name={name} />
                <View style={styles.list}>
                    <List
                        navigate={navigate}
                        characters={characters}
                        onEndReached={onEndReached}
                        info={info}
                        errorMessages={errorMessages}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ListContainer;
