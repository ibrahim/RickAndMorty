import { gql } from '@apollo/client';

export const CHARACTER_DETAIL = gql`
    query($ids: [ID!]!) {
        charactersByIds(ids: $ids) {
            name
            image
            species
            gender
            episode {
                name
                air_date
            }
        }
    }
`;
