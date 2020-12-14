import React, { createContext, useContext, useState, useMemo, Dispatch, SetStateAction } from 'react';
import produce from 'immer';
import { debounce } from 'lodash';
import { withHooks } from './with-hooks';

export type AppState = {
    page: number;
    name: string;
    errorMessages: string[];
    refreshing: boolean;
};
export interface IContext {
    setErrorMessages: (s: string[]) => void;
    setPage: (s: number) => void;
    setName: (s: string) => void;
    setRefreshing: (s: boolean) => void;
    getErrorMessages: () => string[];
    getPage: () => number;
    getName: () => void;
    getRefreshing: () => boolean;
		cancelSearch: () => void;
		newSearch: (s:string) => void;
}

export const initialState: AppState = {
    name: '',
    page: 1,
    errorMessages: [],
    refreshing: false,
};

interface ReducerProps {
    state: AppState;
    setState: Dispatch<SetStateAction<AppState>>;
}

const useReducer = (props: ReducerProps) => {
    const { state, setState } = props;
    const setErrorMessages = (errorMessages: string[]) => {
        setState(
            produce((draft) => {
                draft.errorMessages = errorMessages;
            }),
        );
    };

    const setName = (name: string) => {
        setState(
            produce((draft) => {
                draft.name = name;
            }),
        );
    };
    const setPage = (page: number) => {
        setState(
            produce((draft) => {
                draft.page = page;
            }),
        );
    };
    const setRefreshing = (refreshing: boolean) => {
        setState(
            produce((draft) => {
                draft.refreshing = refreshing;
            }),
        );
    };

    const cancelSearch = () => {
        setState(
            produce((draft) => {
                draft.errorMessages = [];
								draft.page = 1;
								draft.name = ""
            }),
        );
    };
    const newSearch = debounce((name: string) => {
        setState(
            produce((draft) => {
                draft.errorMessages = [];
								draft.page = 1;
								draft.name = name
            }),
        );
    },500);
		
    const getPage = () => state.page;
    const getRefreshing = () => state.refreshing;
    const getName = () => state.name;
    const getErrorMessages = () => state.errorMessages;

    return {
        setName,
        setPage,
        setErrorMessages,
        setRefreshing,
        getName,
        getPage,
        getRefreshing,
        getErrorMessages,
				cancelSearch,
				newSearch,
    };
};
export type IReducer = typeof useReducer;

const useMemoizedStore = (reducer: IReducer, initialState: AppState) => {
    let [state, setState] = useState<AppState>(initialState);
    return useMemo(() => reducer({ state, setState }), [state, setState, reducer]);
};

const createStore = (reducer: IReducer, initialState: AppState) => {
    const AppContext = createContext<IContext | undefined>(undefined);

    const useAppContext = () => {
        const ctx = useContext(AppContext);
        if (!ctx) {
            throw new Error('useAppContext must be inside a Provider with a value');
        }
        return ctx;
    };
    const StoreProvider = (props: any) => {
        let store = useMemoizedStore(reducer, initialState);
        return <AppContext.Provider value={store}>{props.children}</AppContext.Provider>;
    };

    let useStore = () => {
        return useAppContext();
    };

    return [StoreProvider, useStore] as const;
};
let [AppContextProvider, useAppContext] = createStore(useReducer, initialState);

export { AppContextProvider, useAppContext, withHooks };
