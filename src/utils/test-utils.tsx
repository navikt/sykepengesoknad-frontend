import React from 'react';
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { MemoryHistory } from 'history/createMemoryHistory';
import App from '../app';

export const renderWithRouter = (route: string) => {
    const history: MemoryHistory<{}> = createMemoryHistory({ initialEntries: [ route ] });

    const Wrapper = () => (
        <Router history={history} />
    );
    return {
        ...render(<App />, { wrapper: Wrapper }), history
    }
};
