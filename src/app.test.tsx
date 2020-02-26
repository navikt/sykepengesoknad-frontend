import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';

it('Rendrer søknadens startside', async () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <App/>
        </MemoryRouter>);

    expect(screen.queryAllByTitle('Søknad om sykepenger'));
});
