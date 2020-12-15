import * as React from 'react';
import { render } from '@testing-library/react-native';
import Details from '../details';
import { character } from '../fixtures';

describe('Details screen', () => {
    describe('display character details', () => {
        test('display character name', async () => {
            const { findByText } = render(<Details character={character} />);
            const name = await findByText(/rick sanchez/i);
            expect(name).toBeTruthy();
        });
        test('display character gender', async () => {
            const { findByText } = render(<Details character={character} />);
            const gender = await findByText(/male/i);
            expect(gender).toBeTruthy();
        });
        test('display character species', async () => {
            const { findByText } = render(<Details character={character} />);
            const species = await findByText(/human/i);
            expect(species).toBeTruthy();
        });
        test('display character avatar', async () => {
            const { getByA11yLabel } = render(<Details character={character} />);
            const avatar = await getByA11yLabel('avatar');
            expect(avatar).toBeTruthy();
        });
        test.only('display character avatar with character image', async () => {
            const { getByA11yLabel } = render(<Details character={character} />);
            const avatar = await getByA11yLabel('avatar');
            const image = avatar['_fiber'].memoizedProps.source.uri;
            expect(image).toEqual(character.image);
        });
    });
});
