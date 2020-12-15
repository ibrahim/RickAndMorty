import * as React from 'react';
import { render } from '@testing-library/react-native';
import Episodes from '../episodes';
import { character } from '../fixtures';

describe('Episodes list', () => {
    test("display all character's episodes", async () => {
        const { getAllByA11yLabel } = render(<Episodes episodes={character.episode} />);
        const episodes = getAllByA11yLabel('episode');
        expect(episodes.length).toEqual(character.episode.length);
    });
    test('display episode name', async () => {
        const firstEpisode = character.episode[0];
        const { findByText } = render(<Episodes episodes={Array(firstEpisode)} />);
        const name = await findByText(firstEpisode.name);
        expect(name).toBeTruthy();
    });
    test('display episode air date', async () => {
        const firstEpisode = character.episode[0];
        const { findByText } = render(<Episodes episodes={Array(firstEpisode)} />);
        const airDate = await findByText(firstEpisode.air_date);
        expect(airDate).toBeTruthy();
    });
});
