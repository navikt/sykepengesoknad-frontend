import React from 'react';
import { Soknad, Sykmelding } from '../../../types/types';
import AppSpinner from '../../app-spinner';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { erSisteSide, hentTittel } from './ett-sporsmal-per-side-utils';
import SoknadIntro from '../../soknad/intro/soknad-intro';
import SoknadSkjema from './soknad-skjema';

export const hentSporsmalsvisning = (soknad, sidenummer) => {
    return erSisteSide(soknad, sidenummer)
        ? (
            soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE
                ? SykepengesoknadArbeidstakerOppsummeringSkjema
                : SykepengesoknadSelvstendigOppsummeringSkjema
        )
        : sidenummer === 1
            ? ForDuBegynnerSkjema
            : GenereltEttSporsmalPerSideSkjema;
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
    const Sporsmalsvisning = hentSporsmalsvisning(soknad, sidenummer);
    const intro = sidenummer === 1 ? <SoknadIntro soknad={soknad}/> : null;
    const scroll = sidenummer !== 1 && !erSisteSide(soknad, sidenummer);

    return (<SoknadSkjema
        scroll={scroll}
        sidenummer={sidenummer}
        tittel={hentTittel(soknad, sidenummer)}
        intro={intro}
        soknad={soknad}>
        {
            oppdaterer
                ? <AppSpinner/>
                : <Sporsmalsvisning
                    soknad={soknad}
                    sykmelding={sykmelding}
                    handleSubmit={handleSubmit}
                    skjemasvar={skjemasvar}
                    sendingFeilet={sendingFeilet || hentingFeilet}
                    sender={sender}
                    actions={actions}
                    sidenummer={sidenummer}/>
        }
    </SoknadSkjema>);
};

export default EttSporsmalPerSide;

