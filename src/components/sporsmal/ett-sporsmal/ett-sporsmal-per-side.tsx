import React from 'react';
import {Soknad, Sykmelding} from '../../../types/types';
import AppSpinner from '../../app-spinner';
import {erSisteSide, hentTittel} from './ett-sporsmal-per-side-utils';
import SoknadSkjema from './soknad-skjema';

export const hentSporsmalsvisning = ({soknad, sidenummer}: { soknad: any, sidenummer: any }) => {
    return erSisteSide(soknad, sidenummer)
};

interface EttSporsmalPerSideProps {
    sykmelding: Sykmelding,
    soknad: Soknad,
    handleSubmit: () => void,
    lagreSoknad: () => void,
    sendSoknad: () => void,
    sidenummer: number,
    oppdaterer: boolean,
    skjemasvar: {},
    sendingFeilet: boolean,
    hentingFeilet: boolean,
    sender: boolean
}

const EttSporsmalPerSide = (
    {
        sykmelding, soknad, handleSubmit, lagreSoknad, sendSoknad,
        sidenummer, oppdaterer, skjemasvar, sendingFeilet, hentingFeilet, sender
    }: EttSporsmalPerSideProps) => {
    const Sporsmalsvisning = hentSporsmalsvisning({soknad: soknad, sidenummer: sidenummer});
    const intro = null;
    const scroll = sidenummer !== 1 && !erSisteSide(soknad, sidenummer);

    return (<SoknadSkjema
        scroll={scroll}
        sidenummer={sidenummer}
        tittel={hentTittel(soknad, sidenummer)}
        intro={intro}
        soknad={soknad}>
        {
            <AppSpinner/>
        }
    </SoknadSkjema>);
};

export default EttSporsmalPerSide;

