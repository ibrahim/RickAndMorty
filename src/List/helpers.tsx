import * as React from 'react';
import { Text, View, Platform, ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { Character, Info, RenderItemProps } from './types';
import { styles } from './styles';

const NOT_FOUND = 'Error: 404: Not Found';
const human = (message: string) => {
    switch (message) {
        case NOT_FOUND:
            return 'No matching name was found.';
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

/* eslint-disable-next-line */
export const renderItem = (navigate: (s: string) => void) => ({ item }: RenderItemProps) => {
    return (
        <ListItem
            accessible={true}
            accessibilityLabel="character details"
            testID={'character-' + item.id}
            containerStyle={styles.listItem}
            bottomDivider
            onPress={() => navigate(item.id)}
        >
            {item.image && <Avatar title={item.name} source={{ uri: item.image }} />}
            <ListItem.Content style={{ flexGrow: 1, flex: 1 }}>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );
};
/* eslint-disable-next-line */
export const getFooter = (info: Info) => () => {
    if (!info) return null;
    const noMoreItems = info && !info.next;
    if (noMoreItems) return null;
    return <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 50} color="#555" />;
};
