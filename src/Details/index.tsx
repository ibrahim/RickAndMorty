import React from 'react';
import { useQuery } from '@apollo/client';
import { get } from 'lodash';
import { RouteProp } from '@react-navigation/native';
import Details from './details';
import { Variables, Response } from './types';
import { useAppContext, withHooks } from '../context';
import { CHARACTER_DETAIL } from './queries';
import { RootStackParamList } from '../../App';

//characters(page: 2, filter: { name: "rick" }) {


type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface NavigationProp {
  route: DetailsScreenRouteProp;
}

interface HooksProps {
    name: string;
    page: number;
    errorMessages: string[];
    setErrorMessages: (s: string[]) => void;
}
type Props = NavigationProp & HooksProps;

export const ListContainer = (props: Props) => {
		const { route } = props
		const { id } = route.params
    const { data } = useQuery<Response, Variables>(CHARACTER_DETAIL, {
        variables: {
            ids: [id],
        },
    });
    return (
			<Details 
				{...props} 
				character={ get(data,"charactersByIds[0]",null) }
			/>
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
