import React from 'react';
import { useQuery } from '@apollo/client';
import { get } from 'lodash';
import List from './list';
import { NavigationProp, Variables, Response } from './types';
import { CHARACTERS_QUERY } from './queries';
import { Keyboard } from 'react-native';

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
    const onEndReached = async () => {
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
    };

    const listProps = {
        navigate,
        fetchMore,
        info,
        characters,
        onEndReached,
        name,
        setName,
        errorMessages,
        setErrorMessages,
    };

    return <List {...listProps} />;
};

export default ListContainer;
