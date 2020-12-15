import { Character } from './types';

/* eslint-disable-next-line */
export const characters: Character[] = Array.from({ length: 100 }, (c, i) => ({
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
