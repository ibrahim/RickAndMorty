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
