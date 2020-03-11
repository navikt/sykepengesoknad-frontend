import React, { useEffect } from 'react';
import { useAppStore } from './data/stores/app-store';
import { soknader } from './data/mock/data/soknader';
import { RSSoknad } from './types/rs-types/rs-soknad';
import { Soknad, Sykmelding } from './types/types';
import { sykmeldinger } from './data/mock/data/sykmeldinger';
import { fixSykmeldingDatoer } from './utils/dato-utils';
import { unleashToggles } from './data/mock/data/toggles';
import { MemoryRouter } from 'react-router-dom';
import StoreProvider from './data/stores/store-provider';
import { Amplitude } from './components/amplitude/amplitudeProvider';

interface TestProps {
    children: React.ReactElement;
}

export const TestData = ({ children }: TestProps) => {
    const { setUnleash, setSoknader, setSykmeldinger } = useAppStore();

    useEffect(() => {
        setSoknader(soknader!.map((soknad: RSSoknad) => {
            return new Soknad(soknad);
        }));

        setSykmeldinger(sykmeldinger!.map((sykmelding: Sykmelding) => {
            return fixSykmeldingDatoer(sykmelding);
        }));

        setUnleash(unleashToggles);
    }, []);

    return (
        <>{children}</>
    )
};

export const TestProvider = ({ children }: TestProps) => {
    return (
        <MemoryRouter initialEntries={[ '/' ]}>
            <StoreProvider>
                <TestData>
                    <Amplitude>
                        {children}
                    </Amplitude>
                </TestData>
            </StoreProvider>
        </MemoryRouter>
    )
};

/*
* Hva bør testes?
* Render - at det rendrer
* Output - at det riktige kommer ut
* --------
* State  - tilstand som forventet
* Events - action som forventet
* Grenseverdier - virker som forventet
*   array med 0
*   array med 1
*   max/min
*   osv.
*/
