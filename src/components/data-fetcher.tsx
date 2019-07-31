import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch from '../rest/use-fetch';
import { Ledetekster, Soknad } from '../types/types';
import { setLedetekster } from '@navikt/digisyfo-npm';
import { lagHentLedeteksterInfo, lagHentSoknaderInfo } from '../rest/api';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';

export function DataFetcher(props: { children: any }) {
    const ledetekster = useFetch<Ledetekster>(lagHentLedeteksterInfo);
    const soknader = useFetch<Soknad[]>(lagHentSoknaderInfo);

    useEffect(() => {
        if (isNotStarted(ledetekster)) {
            ledetekster.fetch({});
        }
        if (isNotStarted(soknader)) {
            soknader.fetch({})
        }
    }, [ledetekster, soknader]);

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
    return props.children;
}
