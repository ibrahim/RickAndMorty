import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { get } from 'lodash'
import List from './list';
import { Character, NavigationProp, InputProps, Variables, Response } from './types';
import { IContext, useSharedState } from '../shared-state';
import { CHARACTERS_QUERY } from './queries';

//characters(page: 2, filter: { name: "rick" }) {

const Loading = () => <Text>Loading...</Text>;
const Error = () => <Text>Error!</Text>;

export const ListContainer = (props: NavigationProp) => {
    const { name, page } = useSharedState();
    const { loading, error, data, refetch } = useQuery<Response, Variables>(CHARACTERS_QUERY, {
        variables: { name, page },
    });
    if (error) {
        return <Error />;
    }
    return (
        <List
            {...props}
            info={data && data.characters && data.characters.info}
            loading={loading}
            characters={ get(data, 'characters.results', []) }
        />
    );
};

export default ListContainer;
