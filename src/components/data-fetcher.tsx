import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch from '../rest/use-fetch';
import { Ledetekster, Soknad } from '../types/types';
import { setLedetekster } from '@navikt/digisyfo-npm';
import { hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import { useAppStore } from '../stores/app-store';

export function DataFetcher(props: { children: any }) {
    const { setSoknader } = useAppStore();
    const ledetekster = useFetch<Ledetekster>();
    const soknader = useFetch<Soknad[]>();

    useEffect(() => {
        if (isNotStarted(ledetekster)) {
            ledetekster.fetch('/syfotekster/api/tekster');
        }
        if (isNotStarted(soknader)) {
            soknader.fetch('/syfoapi/syfosoknad/api/soknader')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isAnyNotStartedOrPending([ledetekster])) {
        return <Spinner/>;

    } else if (hasAnyFailed([ledetekster])) {
        return (
            <AlertStripeFeil>
                Det oppnås for tiden ikke kontakt med alle baksystemer.
                Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }
    setLedetekster(ledetekster.data);
    if (hasData(soknader)) {
        setSoknader(soknader.data);
    }

    return props.children;
}

