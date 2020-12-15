import * as React from 'react';
import { FlatList } from 'react-native';
import { Character, RenderItemProps } from './types';

export interface CharactersFlatListProps {
    keyExtractor: (s: Character) => string;
    hasError: boolean;
    characters: Character[];
    renderItemWithNavigation: (s: RenderItemProps) => JSX.Element;
    Footer: () => JSX.Element | null;
    ErrorMessage: ({ errorMessages }: { errorMessages: string[] }) => JSX.Element | null;
    errorMessages: string[];
    onEndReached: any;
    styles: any;
}
export const CharactersFlatList = ({
    keyExtractor,
    hasError,
    characters,
    renderItemWithNavigation,
    Footer,
    ErrorMessage,
    errorMessages,
    onEndReached,
    styles,
}: CharactersFlatListProps): JSX.Element => (
    <FlatList
        testID="flat-list"
        keyExtractor={keyExtractor}
        data={hasError ? [] : characters}
        renderItem={renderItemWithNavigation}
        ListFooterComponent={Footer}
        ListFooterComponentStyle={{ padding: 80 }}
        ListEmptyComponent={<ErrorMessage errorMessages={errorMessages} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.content}
        /* updateCellsBatchingPeriod={50} */
        /* getItemLayout={getItemLayout} */
        maxToRenderPerBatch={10}
    />
);
export default CharactersFlatList;
