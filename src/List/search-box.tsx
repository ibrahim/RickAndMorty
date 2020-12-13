import * as React from 'react'
import { Platform } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { useSharedState } from '../shared-state'

export const SearchBox = () => {
	const [query, setQuery] = React.useState<string>('')
	const { name, setName} = useSharedState()
    return (
      <SearchBar
        placeholder="Search..."
        onChangeText={setQuery}
				platform={ Platform.OS === "ios" ? "ios" : "android" }
				showCancel={ Platform.OS === "ios" ? true : false }
        value={query}
      />
    );
}

