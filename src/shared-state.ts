import { createContext, useContext,Dispatch, SetStateAction } from 'react';

export type IContext = {
    page: number;
		name: string;
		errorMessages: string[];
		refreshing: boolean;
    setPage: Dispatch<SetStateAction<number>>;
    setName: Dispatch<SetStateAction<string>>;
    setErrorMessages: Dispatch<SetStateAction<string[]>>;
    setRefreshing: Dispatch<SetStateAction<boolean>>;
}

export const SharedState = createContext<IContext>({
	name: '',
	page: 1,
	errorMessages: [],
	refreshing: false,
	setName: () => console.warn('no provider'),
	setPage: () => console.warn('no provider'),
	setErrorMessages: () => console.warn('no provider'),
	setRefreshing: () => console.warn('no provider'),
});
export const useSharedState = () => useContext(SharedState);

