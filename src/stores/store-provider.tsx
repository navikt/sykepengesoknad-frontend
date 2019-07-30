import React from 'react';
import { useFetchStore } from './fetch-store';

interface StoreProviderProps {
    children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
    return (
        <useFetchStore.Provider>
            {props.children}
        </useFetchStore.Provider>
    );
};

export default StoreProvider;
