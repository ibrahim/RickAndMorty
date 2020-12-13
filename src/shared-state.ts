import { createContext, useContext,Dispatch, SetStateAction } from 'react';

export type IContext = {
    page?: number;
		name?: string;
    setPage: Dispatch<SetStateAction<number>>;
    setName: Dispatch<SetStateAction<string>>;
}

export const SharedState = createContext<IContext>({setName: name => console.warn('no provider'),setPage: page => console.warn('no provider')});
export const useSharedState = () => useContext(SharedState);

