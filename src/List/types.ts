import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export interface NavigationProp {
    navigation: ProfileScreenNavigationProp;
}

export interface Character {
    id: string;
    name: string;
    image: string;
}

export interface Info {
    count: number;
    pages: number;
    next: number;
    prev: number;
}
export interface Response {
    characters: {
        info: Info;
        results: [Character];
    };
}

export interface Variables {
    name?: string;
    page?: number;
}

export interface InputProps {
    name?: string;
    page?: number;
}
