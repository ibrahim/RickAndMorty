import * as React from 'react';
import { Text, View, ActivityIndicator, Platform } from 'react-native';
import { isEmpty } from 'lodash';
import { Character, Info } from './types';
import { styles } from './styles';

export const NOT_FOUND = 'Error: 404: Not Found';
export const NOT_FOUND_MESSAGE = 'No matching name was found.';

const human = (message: string) => {
    switch (message) {
        case NOT_FOUND:
            return NOT_FOUND_MESSAGE;
    }
    return message;
};

export const keyExtractor = (item: Character): string => `${item.id}-${item.name}`;

export const ErrorMessage = ({ errorMessages }: { errorMessages: string[] }): JSX.Element | null => {
    if (isEmpty(errorMessages)) return null;
    return (
        <View style={styles.errorMessages}>
            {errorMessages &&
                errorMessages.map((msg, i) => (
                    <Text style={{ fontSize: 20 }} key={i}>
                        {human(String(msg))}
                    </Text>
                ))}
        </View>
    );
};
export const Footer = ({ info }: { info: Info }): JSX.Element | null => {
    if (!info) return null;
    const noMoreItems = info && !info.next;
    if (noMoreItems) return null;
    return <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 50} color="#555" />;
};

export const Loading = (): JSX.Element => (
    <View style={styles.loading} accessibilityLabel="loading">
        <ActivityIndicator size="large" color="#666" />
    </View>
);
