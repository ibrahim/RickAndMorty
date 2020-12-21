import React from 'react';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { Loading, ErrorMessage, keyExtractor, Footer } from './helpers';
import { Character, RenderItemProps, Info } from './types';
import { styles } from './styles';

export interface ComponentProps {
    navigate: (s: string) => void;
    characters: Character[];
    info: Info;
    onEndReached: any;
    errorMessages: string[];
}

export type Props = ComponentProps;

const CharactersList = (props: Props): JSX.Element => {
    const { navigate, characters, onEndReached, errorMessages, info } = props;

    const renderItem = React.useCallback(
        ({ item }: RenderItemProps) => {
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
        },
        [navigate],
    );

    const hasError = !isEmpty(errorMessages);
    return (
        <FlatList
            testID="flat-list"
            data={hasError ? [] : characters}
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.2}
            keyExtractor={keyExtractor}
            ListFooterComponent={<Footer info={info} />}
            ListFooterComponentStyle={{ padding: 80 }}
            ListEmptyComponent={hasError ? <ErrorMessage errorMessages={errorMessages} /> : <Loading />}
            contentContainerStyle={styles.content}
            maxToRenderPerBatch={20}
        />
    );
};

export default CharactersList;
