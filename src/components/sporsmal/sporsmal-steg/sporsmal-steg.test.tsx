import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect'
import { screen, waitForElement } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import SporsmalSteg from './sporsmal-steg';
import StoreProvider from '../../../data/stores/store-provider';
import { BrowserRouter } from 'react-router-dom';
import { useAppStore } from '../../../data/stores/app-store';
import { soknader} from '../../../data/mock/data/soknader-felles';

xit('Rendrer sporsmal-steg', async () => {
    const { result } = renderHook(() => useAppStore());
    const div = document.createElement('div');

    act(() => {
        result.current.setValgtSoknad(soknader[0]);
    });

    ReactDOM.render(
        <BrowserRouter basename={'/nysykepengesoknad'}>
            <StoreProvider>
                <SporsmalSteg />
            </StoreProvider>
        </BrowserRouter>, div
    );

    await waitForElement(() => {
        expect(screen.getByText('1 av 7')).toBeInTheDocument();
    });
});
