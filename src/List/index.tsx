import React from 'react';
import { useQuery } from '@apollo/client';
import { get } from 'lodash';
import List from './list';
import { NavigationProp, Variables, Response } from './types';
import { CHARACTERS_QUERY } from './queries';

type Props = NavigationProp;

export const ListContainer = (props: Props): JSX.Element => {
    const { data, fetchMore } = useQuery<Response, Variables>(CHARACTERS_QUERY, {
        variables: {
            filter: { name: '' },
            page: 1,
        },
    });

    return (
        <List
            {...props}
            fetchMore={fetchMore}
            info={get(data, 'characters.info', null)}
            characters={get(data, 'characters.results', [])}
        />
    );
};

export default ListContainer;
