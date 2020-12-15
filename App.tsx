import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/apollo-client';
import AppNavigator from './src/app-navigator';

const App = (): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <AppNavigator />
        </ApolloProvider>
    );
};

export default App;
