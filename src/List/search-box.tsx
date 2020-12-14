import * as React from 'react';
import { Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useSharedState } from '../shared-state';

export const SearchBox = () => {
    const [query, setQuery] = React.useState<string>('');
    const { name, setName, setPage, setErrorMessages } = useSharedState();

    React.useEffect(() => {
        if (name !== query) {
            console.log('Setting name', query, name);
            setErrorMessages([]);
            setPage(1);
            setName(query);
        }
    }, [query, name, setName, setPage, setErrorMessages]);

    const cancelSearch = React.useCallback(() => {
        setErrorMessages([]);
        setPage(1);
        setName('');
    }, [setErrorMessages, setPage, setName]);

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
