import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useQuery } from '@apollo/client';
import List from './list';
import { Character, NavigationProp, InputProps, Variables, Response } from './types';
import { CHARACTERS_QUERY } from './queries';

//characters(page: 2, filter: { name: "rick" }) {

const Loading = () => <Text>Loading...</Text>;
const Error = () => <Text>Error!</Text>;

export const ListContainer = (props: InputProps & NavigationProp) => {
    const { loading, error, data, refetch } = useQuery<Response, Variables>(CHARACTERS_QUERY, {
        variables: { name: props.name },
    });
    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <Error />;
    }
    return <List {...props} characters={data && data.characters && data.characters.results} />;
};

export default ListContainer;
