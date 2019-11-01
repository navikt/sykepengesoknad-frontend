import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch from './rest/use-fetch';
import { Soknad, Sykmelding } from '../types/types';
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils';
import { useAppStore } from './stores/app-store';
import { RSSoknad } from '../types/rs-types/rs-soknad';
import { fixSykmeldingDatoer } from '../utils/dato-utils';
import { unleashKeys } from './mock/data/toggles';
import { SYFO_API_SOKNADER } from '../utils/constants';

export function DataFetcher(props: { children: any }) {

    const {setUnleash, setSoknader, setSykmeldinger} = useAppStore();

    const unleash = useFetch<{}>();
    const rssoknader = useFetch<RSSoknad[]>();
    const sykmeldinger = useFetch<Sykmelding[]>();

    useEffect(() => {
        if (isNotStarted(unleash)) {
            unleash.fetch('/syfounleash/', {
                method: 'POST',
                body: JSON.stringify(unleashKeys),
                headers: {'Content-Type': 'application/json'}
            }, (fetchState: FetchState<{}>) => {
                setUnleash(fetchState.data);
            })
        }
        if (isNotStarted(rssoknader)) {
            rssoknader.fetch(SYFO_API_SOKNADER, undefined, (fetchState: FetchState<RSSoknad[]>) => {
                setSoknader(fetchState.data!.map(soknad => {
                    return new Soknad(soknad);
                }));
            })
        }
        if (isNotStarted(sykmeldinger)) {
            sykmeldinger.fetch('/syforest/sykmeldinger', undefined, (fetchState: FetchState<Sykmelding[]>) => {
                if (hasData(fetchState)) {
                    setSykmeldinger(fetchState.data!.map(sykmelding => {
                        return fixSykmeldingDatoer(sykmelding);
                    }));
                }
            });
        }
        // eslint-disable-next-line
    }, []);


    if (isAnyNotStartedOrPending([unleash, rssoknader, sykmeldinger])) {
        return <Spinner />;

    } else if (hasAny401([unleash, rssoknader, sykmeldinger])) {
        window.location.href = `${hentLoginUrl()}?redirect=${window.location.origin}/sykepengesoknad`;

    } else if (hasAnyFailed([unleash, rssoknader, sykmeldinger])) {
        return (
            <AlertStripeFeil>
                Vi får akkurat nå ikke hentet alle data.
                Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }

    return props.children;
}

export const hentLoginUrl = () => {
    window.localStorage.setItem('REDIRECT_ETTER_LOGIN', window.location.href);
    if (window.location.href.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://loginservice.nav.no/login';
    } else if (window.location.href.indexOf('localhost') > -1) {
        // Lokalt
        return 'http://localhost:8080/syfoapi/local/cookie';
    }
    // Preprod
    return 'https://loginservice-q.nav.no/login';
};
