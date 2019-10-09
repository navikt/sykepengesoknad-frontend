import React from 'react';
import { useAppStore } from './app-store';

interface StoreProviderProps {
    children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
    return (
        <useAppStore.Provider>
            {props.children}
        </useAppStore.Provider>
    );
};

export default StoreProvider;
