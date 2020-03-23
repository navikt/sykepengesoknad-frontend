import React, { useEffect } from 'react';
import { useAppStore } from './data/stores/app-store';
import { soknader } from './data/mock/data/soknader-felles';
import { sykmeldinger } from './data/mock/data/sykmeldinger-felles';
import { RSSoknad } from './types/rs-types/rs-soknad';
import { Soknad, Sykmelding } from './types/types';
import { fixSykmeldingDatoer } from './utils/dato-utils';
import { unleashToggles } from './data/mock/data/toggles';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import StoreProvider from './data/stores/store-provider';
import { Amplitude } from './components/amplitude/amplitudeProvider';
import Soknaden from './pages/soknad/soknaden';
import Soknader from './pages/soknader/soknader';
import Kvittering from './pages/kvittering/kvittering';

interface DataProps {
    children: React.ReactNode;
}

export const TestData = (props: DataProps) => {
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
        <>{ props.children }</>
    )
};

interface ProviderProps {
    path?: string;
}

export const TestProvider = ({ path }: ProviderProps) => {
    console.log('laster inn =>', path);
    return (
        <div id="root">
            <MemoryRouter initialEntries={[ path ]}>
                <StoreProvider>
                    <TestData>
                        <Amplitude>
                            <Switch>
                                <Route exact={true} path="/" component={Soknader} />
                                <Route path={'/soknader/:id/:stegId'} component={Soknaden} />
                                <Route path={'/soknader/:id'} component={Soknaden} />
                                <Route path={'/kvittering/:id'} component={Kvittering} />
                            </Switch>
                        </Amplitude>
                    </TestData>
                </StoreProvider>
            </MemoryRouter>
        </div>
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
