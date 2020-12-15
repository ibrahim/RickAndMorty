import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import List, { Props } from '../list';
import { characters, info } from '../fixtures';

describe('Characters List', () => {
    let onEndReached: jest.Mock;
    let fetchMore: jest.Mock;
    let setName: jest.Mock;
    let navigate: jest.Mock;
    let setErrorMessages: jest.Mock;
    let props: Props;
    beforeEach(() => {
        onEndReached = jest.fn();
        fetchMore = jest.fn();
        setName = jest.fn();
        navigate = jest.fn();
        setErrorMessages = jest.fn();
        props = {
            navigate,
            name: '',
            errorMessages: [],
            setName,
            characters,
            info,
            setErrorMessages,
            onEndReached,
            fetchMore,
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
        test('Scroll to the bottom of the list load more items', async () => {
            const { getByTestId } = render(<List {...props} />);
            const eventData = {
                nativeEvent: {
                    contentOffset: {
                        y: 500,
                    },
                    contentSize: {
                        // Dimensions of the scrollable content
                        height: 200,
                        width: 320,
                    },
                    layoutMeasurement: {
                        // Dimensions of the device
                        height: 100,
                        width: 320,
                    },
                },
            };

            const list = getByTestId('flat-list');
            fireEvent.scroll(list, eventData);
            await waitFor(() => expect(props.onEndReached).toHaveBeenCalled());
        });
    });
});
