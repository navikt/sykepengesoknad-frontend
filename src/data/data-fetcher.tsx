import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch from './rest/use-fetch';
import { Soknad, Sykmelding } from '../types/types';
import { FetchState, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils';
import { useAppStore } from './stores/app-store';
import { RSSoknad } from '../types/rs-types/rs-soknad';

export function DataFetcher(props: { children: any }) {
    const { setSoknader, setVisFeil, setSykmeldinger } = useAppStore();
    const rssoknader = useFetch<RSSoknad[]>();
    const sykmeldinger = useFetch<Sykmelding[]>();
    useEffect(() => {
        if (isNotStarted(rssoknader)) {
            rssoknader.fetch('/syfoapi/syfosoknad/api/soknader', undefined, (fetchState: FetchState<RSSoknad[]>) => {
                setSoknader(fetchState.data!.map(soknad => {
                    return new Soknad(soknad);
                }));
            })
        }
        if (isNotStarted(sykmeldinger)) {
            sykmeldinger.fetch('/syforest/sykmeldinger', undefined, (fetchState: FetchState<Sykmelding[]>) => {
                if (hasData(fetchState)) {
                    setSykmeldinger(fetchState.data);
                }
            });
        }
        // eslint-disable-next-line
    }, [rssoknader, sykmeldinger]);

    if (isAnyNotStartedOrPending([rssoknader, sykmeldinger])) {
        return <Spinner/>;

    } else if (hasAnyFailed([rssoknader, sykmeldinger])) {
        return (
            <AlertStripeFeil>
                Vi får akkurat nå ikke hentet alle data.
                Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }

    if (hasData(rssoknader) && hasData(sykmeldinger)) {
        setVisFeil(false);
    }

    return props.children;
}

