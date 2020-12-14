import * as React from 'react';
import { Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';

interface ComponentProps {
	newSearch: (s:string) => void;
	name: string;
}
type Props = ComponentProps;

export const SearchBox = (props: Props) => {
    const [query, setQuery] = React.useState<string>('');
    const { newSearch, name } = props;

    React.useEffect(() => {
			if(query!==name) newSearch(query)
    }, [query, newSearch]);

    return (
        <SearchBar
            placeholder="Search..."
            onChangeText={setQuery}
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
            showCancel={Platform.OS === 'ios' ? true : false}
            onCancel={() => setQuery("")}
            value={query}
        />
    );
};

export default SearchBox;
