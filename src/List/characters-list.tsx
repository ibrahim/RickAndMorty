import * as React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
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
const Loading = () => (
    <View style={styles.loading} accessibilityLabel="loading">
        <ActivityIndicator size="large" color="#666" />
    </View>
);
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
        ListEmptyComponent={hasError ? <ErrorMessage errorMessages={errorMessages} /> : <Loading />}
        contentContainerStyle={styles.content}
        maxToRenderPerBatch={20}
        /* updateCellsBatchingPeriod={50} */
        /* getItemLayout={getItemLayout} */
    />
);
const styles = StyleSheet.create({
    loading: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
});
export default CharactersFlatList;
