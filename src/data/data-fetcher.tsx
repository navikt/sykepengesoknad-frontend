import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import useFetch from './rest/use-fetch';
import { Soknad, Sporsmal, Sykmelding } from '../types/types';
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils';
import { useAppStore } from './stores/app-store';
import { RSSoknad } from '../types/rs-types/rs-soknad';
import { fixSykmeldingDatoer } from '../utils/dato-utils';
import { unleashKeys } from './mock/data/toggles';
import IngenData from '../pages/feil/ingen-data';
import env from '../utils/environment';
import { UnleashToggles } from '../types/types';
import { sporsmalToRS } from '../types/rs-types/rs-sporsmal';
import { RSOppdaterSporsmalResponse } from '../types/rs-types/oppdatersporsmalresponse'

export function DataFetcher(props: { children: any }) {

    const { setUnleash, soknader, setSoknader, setSykmeldinger, valgtSoknad, setValgtSoknad, oppdaterSporsmalId } = useAppStore();

    const unleash = useFetch<{}>();
    const rssoknader = useFetch<RSSoknad[]>();
    const sykmeldinger = useFetch<Sykmelding[]>();
    const oppdaterSporsmal = useFetch<RSOppdaterSporsmalResponse>();

    useEffect(() => {
        if (isNotStarted(unleash)) {
            unleash.fetch(env.unleashUrl, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(unleashKeys),
                headers: { 'Content-Type': 'application/json' }
            }, (fetchState: FetchState<UnleashToggles>) => {
                setUnleash(fetchState.data);
            })
        }
        if (isNotStarted(rssoknader)) {
            rssoknader.fetch(env.syfoapiRoot + '/syfosoknad/api/soknader', {
                credentials: 'include',
            }, (fetchState: FetchState<RSSoknad[]>) => {
                if (hasData(fetchState)) {
                    setSoknader(fetchState.data!.map(soknad => {
                        return new Soknad(soknad);
                    }));
                }
            })
        }
        if (isNotStarted(sykmeldinger)) {
            sykmeldinger.fetch(env.syforestRoot + '/sykmeldinger', {
                credentials: 'include',
            }, (fetchState: FetchState<Sykmelding[]>) => {
                if (hasData(fetchState)) {
                    setSykmeldinger(fetchState.data!.map(sykmelding => {
                        return fixSykmeldingDatoer(sykmelding);
                    }));
                }
            });
        }
        // eslint-disable-next-line
    }, [ rssoknader ]);

    useEffect(() => {
        if (valgtSoknad && oppdaterSporsmalId >= 0) {
            let soknad = valgtSoknad;
            const sporsmal = valgtSoknad.sporsmal[oppdaterSporsmalId];

            oppdaterSporsmal.fetch( env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad.id}/sporsmal/${sporsmal.id}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(sporsmalToRS(sporsmal)),
                headers: { 'Content-Type': 'application/json' }
            }, (fetchState: FetchState<RSOppdaterSporsmalResponse>) => {
                if (hasData(fetchState)) {
                    if (fetchState.data.mutertSoknad) {
                        soknad = new Soknad(fetchState.data.mutertSoknad);
                    }
                    else {
                        const spm = fetchState.data.oppdatertSporsmal;
                        soknad.sporsmal[oppdaterSporsmalId] = new Sporsmal(spm, undefined, true);
                    }
                    soknader[soknader.findIndex(sok => sok.id === soknad.id)] = soknad;
                    setSoknader(soknader);
                    setValgtSoknad(soknad);
                }
                else {
                    // TODO: Brude håndtere dette med en feilmeldingskomponent, nå vises <IngenData/>
                    console.log('Feilmelding fra backend:', fetchState);
                }})
        }
        // eslint-disable-next-line
    }, [ oppdaterSporsmalId ]);

    if (isAnyNotStartedOrPending([ unleash, rssoknader, sykmeldinger ])) {
        return <Spinner />;

    } else if (hasAny401([ unleash, rssoknader, sykmeldinger, oppdaterSporsmal ])) {
        window.location.href = `${hentLoginUrl()}?redirect=${window.location.origin}/sykepengesok`;

    } else if (hasAnyFailed([ unleash, rssoknader, sykmeldinger, oppdaterSporsmal ])) {
        return <IngenData />;
    }

    return props.children;
}

export const hentLoginUrl = () => {
    window.localStorage.setItem('REDIRECT_ETTER_LOGIN', window.location.href);
    return env.loginServiceUrl
};
