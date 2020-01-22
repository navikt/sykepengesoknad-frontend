import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';

it('Rendrer søknadens startside', async () => {
    render(<App />);

    expect(screen.queryAllByTitle('Søknad om sykepenger'));
});
