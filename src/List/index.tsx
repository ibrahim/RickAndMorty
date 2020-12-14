import React from 'react';
import { useQuery } from '@apollo/client';
import { get } from 'lodash';
import List from './list';
import { NavigationProp, Variables, Response } from './types';
import { useSharedState } from '../shared-state';
import { CHARACTERS_QUERY } from './queries';

//characters(page: 2, filter: { name: "rick" }) {

export const ListContainer = (props: NavigationProp) => {
    const { name, page, setErrorMessages } = useSharedState();
    const { error, data } = useQuery<Response, Variables>(CHARACTERS_QUERY, {
        variables: {
            filter: { name },
            page,
        },
    });
		console.log({current_name: name})
    React.useEffect(() => {
        if (error) {
            const messages = error.graphQLErrors.map((i) => i.message);
            setErrorMessages(messages);
            console.log({ messages, name, page });
        }
    }, [error]);

    return (
        <List
            {...props}
            info={get(data, 'characters.info', null)}
            characters={get(data, 'characters.results', [])}
        />
    );
};

export default ListContainer;
