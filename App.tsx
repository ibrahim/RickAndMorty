import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import List from './src/List';
import { client } from './src/apollo-client';
import { SharedState } from './src/shared-state';

function DetailsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
        </View>
    );
}

export type RootStackParamList = {
    Home: undefined;
    Details: { id: string };
};
const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
    const [page, setPage] = React.useState<number>(1);
    const [name, setName] = React.useState<string>('');
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
    return (
        <SharedState.Provider value={{ page, setPage, name, setName,refreshing,setRefreshing,errorMessages,setErrorMessages }}>
            <ApolloProvider client={client}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" options={{ title: 'Overview' }}>
                            {(props) => <List {...props} />}
                        </Stack.Screen>
                        <Stack.Screen name="Details" component={DetailsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ApolloProvider>
        </SharedState.Provider>
    );
};

export default App;
