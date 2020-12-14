import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import { AppContextProvider } from './src/context';
import List from './src/List';
import DetailsScreen from './src/Details';
import { client } from './src/apollo-client';

export type RootStackParamList = {
    Home: undefined;
    Details: { id: string };
};
const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
    return (
        <AppContextProvider>
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
        </AppContextProvider>
    );
};

export default App;
