import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './List';
import DetailsScreen from './Details';

export type RootStackParamList = {
    Home: undefined;
    Details: { id: string };
};
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = (): JSX.Element => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ title: 'Rick And Morty' }}>
                    {(props) => <List {...props} />}
                </Stack.Screen>
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
