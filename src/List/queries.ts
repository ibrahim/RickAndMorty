import { gql } from '@apollo/client';

export const CHARACTERS_QUERY = gql`
    query {
        characters {
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
