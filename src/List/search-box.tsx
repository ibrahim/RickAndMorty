import * as React from 'react';
import { Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useAppContext, withHooks } from '../context';

interface ComponentProps {
    name: string;
    cancelSearch: () => void;
    newSearch: (s:string) => void;
}
type Props = ComponentProps;
export const SearchBox = (props: Props) => {
    const [query, setQuery] = React.useState<string>('');
    const { name, cancelSearch, newSearch } = props;

    React.useEffect(() => {
        if (name !== query) newSearch(query);
    }, [query, name, newSearch]);

    return (
        <SearchBar
            placeholder="Search..."
            onChangeText={setQuery}
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
            showCancel={Platform.OS === 'ios' ? true : false}
            onCancel={() => cancelSearch()}
            value={query}
        />
    );
};
const useHooksToProps = () => {
    const { getName, cancelSearch, newSearch } = useAppContext();

    return {
        name: getName(),
        cancelSearch,
        newSearch,
    };
};

export default withHooks(useHooksToProps)(SearchBox);
