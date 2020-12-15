import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CharactersFlatList, CharactersFlatListProps } from '../characters-list';
import { ErrorMessage, getFooter, renderItem, keyExtractor } from '../helpers';
import { characters, info, eventData } from '../fixtures';
import { styles } from '../styles';

describe('Character Flat List', () => {
    let onEndReached: jest.Mock;
    let navigate: jest.Mock;
    let props: CharactersFlatListProps;
    beforeEach(() => {
        navigate = jest.fn();
        onEndReached = jest.fn();
        props = {
            keyExtractor,
            hasError: false,
            characters,
            renderItemWithNavigation: renderItem(navigate),
            Footer: getFooter(info),
            ErrorMessage,
            errorMessages: [],
            onEndReached,
            styles,
        };
    });
    test('Scroll to the bottom of the list load more items', async () => {
        const { getByTestId } = render(<CharactersFlatList {...props} onEndReached={onEndReached} />);
        fireEvent.scroll(getByTestId('flat-list'), eventData);
        await waitFor(() => expect(onEndReached).toHaveBeenCalled());
    });
});
