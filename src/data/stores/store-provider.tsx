import React from 'react'

import { AppStoreProvider } from './app-store'

interface StoreProviderProps {
    children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
    return (
        <AppStoreProvider>
            {props.children}
        </AppStoreProvider>
    )
}

export default StoreProvider
