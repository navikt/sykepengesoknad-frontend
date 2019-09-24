import React from 'react';
import { Soknad } from '../../../../src/types/types';
import { RSSoknadstype } from '../../../../src/types/rs-types/rs-soknadstype';
import { erSisteSide, hentTittel } from './ett-sporsmal-per-side-utils';
import SoknadIntro from '../../soknad/intro/soknad-intro';
import SoknadSkjema from './soknad-skjema';
import { ArbeidstakerOppsummering } from '../../soknad/arbeidstaker/arbeidstaker-oppsummering';
import SelvstendigeOppsummering from '../../soknad/selvstendige/selvstendige-oppsummering';
import ForDuBegynnerSkjema from './for-du-begynner-skjema';
import { GenereltEttSporsmalPerSideSkjema } from './generelt-ett-sporsmal-per-side-skjema';

export const hentSporsmalsvisning = (soknad: Soknad, sidenummer: number) => {
    return erSisteSide(soknad, sidenummer)
        ? (
            soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE
                ? ArbeidstakerOppsummering
                : SelvstendigeOppsummering
        )
        : sidenummer === 1
            ? ForDuBegynnerSkjema
            : GenereltEttSporsmalPerSideSkjema;
};

interface EttSporsmalPerSideProps {
    soknad: Soknad,
    sidenummer: number,
}

const EttSporsmalPerSide = ({ soknad, sidenummer }: EttSporsmalPerSideProps) => {
    const Sporsmalsvisning = hentSporsmalsvisning(soknad, sidenummer);
    const intro = sidenummer === 1 ? <SoknadIntro soknad={soknad} erForsteSoknad={true}/> : null;
    const scroll = sidenummer !== 1 && !erSisteSide(soknad, sidenummer);

    return (
        <SoknadSkjema
            scroll={scroll}
            sidenummer={sidenummer}
            tittel={hentTittel(soknad, sidenummer)}
            intro={intro}
            soknad={soknad}>
            <Sporsmalsvisning
                soknad={soknad}
                sidenummer={sidenummer}
            />
        </SoknadSkjema>
    );
};

export default EttSporsmalPerSide;

