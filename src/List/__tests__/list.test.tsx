import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import List, { Props } from '../list';
import { NOT_FOUND, NOT_FOUND_MESSAGE } from '../helpers';
import { characters, eventData, info } from '../fixtures';

describe('Characters List', () => {
    let onEndReached: jest.Mock;
    let navigate: jest.Mock;
    let props: Props;
    beforeEach(() => {
        onEndReached = jest.fn();
        navigate = jest.fn();
        props = {
            navigate,
            errorMessages: [],
            info,
            characters,
            onEndReached,
        };
    });
    describe('Press on list character item', () => {
        beforeEach(async () => {
            const { getByTestId } = render(<List {...props} />);
            const item = await getByTestId('character-1');
            fireEvent(item, 'press');
        });
        test('should fire navigate', async () => {
            expect(navigate).toHaveBeenCalled();
        });
        test('should pass character id', async () => {
            expect(navigate).toHaveBeenCalledWith('1');
        });
    });
    describe('list infinite scroll', () => {
        test('Items are rendered accordingly', async () => {
            const { findAllByText } = render(<List {...props} />);
            const items = await findAllByText(/character/i);
            expect(items.length).toEqual(20);
        });
        test('Display loading spinner until characters are not empty', async () => {
            const { getByA11yLabel } = render(<List {...props} characters={[]} />);
            const loading = getByA11yLabel('loading');
            expect(loading).toBeTruthy();
        });
        test('Display error message when results are not found', async () => {
            const { findByText } = render(<List {...props} errorMessages={[NOT_FOUND]} />);
            const errorMessage = await findByText(NOT_FOUND_MESSAGE);
            expect(errorMessage).toBeTruthy();
        });
        test('Scroll to the bottom of the list load more items', async () => {
            const { getByTestId } = render(<List {...props} />);
            const list = getByTestId('flat-list');
            fireEvent.scroll(list, eventData);
            await waitFor(() => expect(props.onEndReached).toHaveBeenCalled());
        });
    });
});
