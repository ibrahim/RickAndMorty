import React from 'react';
import { useQuery } from '@apollo/client';
import { get } from 'lodash';
import { RouteProp } from '@react-navigation/native';
import Details from './details';
import { Variables, Response } from './types';
import { CHARACTER_DETAIL } from './queries';
import { RootStackParamList } from '../../App';

//characters(page: 2, filter: { name: "rick" }) {

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface NavigationProp {
    route: DetailsScreenRouteProp;
}

type Props = NavigationProp;

export const DetailsContainer = (props: Props): JSX.Element => {
    const { route } = props;
    const { id } = route.params;
    const { data } = useQuery<Response, Variables>(CHARACTER_DETAIL, {
        variables: {
            ids: [id],
        },
    });
    return <Details {...props} character={get(data, 'charactersByIds[0]', null)} />;
};

export default DetailsContainer;
