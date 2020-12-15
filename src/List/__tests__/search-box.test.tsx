import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBox } from '../search-box';

describe('SearchBox', () => {
    test('Input onChangeText initiate new search', () => {
        const mockFn = jest.fn();
        const { getByA11yLabel } = render(<SearchBox newSearch={mockFn} name={''} />);
        const searchbar = getByA11yLabel('search');
        const name = 'rick';
        fireEvent.changeText(searchbar, name);
        expect(mockFn).toBeCalledWith(name);
    });
});
