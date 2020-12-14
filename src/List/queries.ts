import { gql } from '@apollo/client';

export const CHARACTERS_QUERY = gql`
    query($page: Int = 1, $filter: FilterCharacter) {
        characters(page: $page, filter: $filter) {
            info {
                next
                prev
                pages
                count
            }
            results {
                id
                name
                image
            }
        }
    }
`;

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
