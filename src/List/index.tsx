import React from 'react';
import { useQuery } from '@apollo/client';
import { get } from 'lodash';
import List from './list';
import { NavigationProp, Variables, Response } from './types';
import { useAppContext, withHooks } from '../context';
import { CHARACTERS_QUERY } from './queries';

//characters(page: 2, filter: { name: "rick" }) {

interface HooksProps {
    name: string;
    page: number;
    errorMessages: string[];
    setErrorMessages: (s: string[]) => void;
}
type Props = NavigationProp & HooksProps;

export const ListContainer = (props: Props) => {
    const { name, page, setErrorMessages, errorMessages } = props;
    const { error, data } = useQuery<Response, Variables>(CHARACTERS_QUERY, {
        variables: {
            filter: { name },
            page,
        },
    });

    React.useEffect(() => {
        if (error) {
            const messages = error.graphQLErrors.map((i) => i.message);
            setErrorMessages(messages);
            console.log({ messages, name, page });
        }
    }, [error]);

    return (
        <List {...props} info={get(data, 'characters.info', null)} characters={get(data, 'characters.results', [])} />
    );
};

const useHooksToProps = () => {
    const { getName, getPage, setErrorMessages, getErrorMessages } = useAppContext();

    return {
        name: getName(),
        page: getPage(),
        errorMessages: getErrorMessages(),
        setErrorMessages,
    };
};

export default withHooks(useHooksToProps)(ListContainer);
