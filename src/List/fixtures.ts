import { Character } from './types';

/* eslint-disable-next-line */
export const characters: Character[] = Array.from({ length: 10 }, (c, i) => ({
    id: String(i),
    name: 'character ' + String(i),
    image: `https://rickandmortyapi.com/api/character/avatar/${String(i)}.jpeg`,
}));

export const info = {
    next: 1,
    prev: null,
    pages: 5,
    count: 84,
};

export const eventData = {
    nativeEvent: {
        contentOffset: {
            y: 500,
        },
        contentSize: {
            height: 500,
            width: 100,
        },
        layoutMeasurement: {
            height: 100,
            width: 100,
        },
    },
};
