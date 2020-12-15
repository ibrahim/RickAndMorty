import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator';

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export interface NavigationProp {
    navigation: HomeScreenNavigationProp;
}

export interface RenderItemProps {
    item: Character;
}

export interface Character {
    id: string;
    name: string;
    image: string;
}

export interface Info {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
}
export interface Response {
    characters: {
        info: Info;
        results: [Character];
    };
}

export interface Variables {
    filter: {
        name: string;
    };
    page: number;
}

export interface InputProps {
    name: string;
    page: number;
}
