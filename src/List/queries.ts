import { gql } from '@apollo/client';

export const CHARACTERS_QUERY = gql`
    query($page: Int = 1) {
        characters(page: $page) {
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
