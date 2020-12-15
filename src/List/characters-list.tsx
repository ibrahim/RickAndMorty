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
        data={hasError ? [] : characters}
        renderItem={renderItemWithNavigation}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        keyExtractor={keyExtractor}
        ListFooterComponent={Footer}
        ListFooterComponentStyle={{ padding: 80 }}
        ListEmptyComponent={<ErrorMessage errorMessages={errorMessages} />}
        contentContainerStyle={styles.content}
        maxToRenderPerBatch={20}
        /* updateCellsBatchingPeriod={50} */
        /* getItemLayout={getItemLayout} */
    />
);
export default CharactersFlatList;
