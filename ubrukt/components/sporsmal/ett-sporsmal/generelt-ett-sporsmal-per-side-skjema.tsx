import React from 'react';
import { Soknad } from '../../../../src/types/types';
import { hentSporsmalForDenneSiden } from './ett-sporsmal-per-side-utils';
import OppdaterFeiletFeilstripe from './oppdater-feilet-feilstripe';
import { skjemanavnFraSoknad } from '../../../../src/utils/skjemanavn-fra-soknad';
import SporsmalListe from '../sporsmal-liste';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';

interface GenereltEttSporsmalPerSideSkjemaProps {
    soknad: Soknad,
    sidenummer: number,
}

export const GenereltEttSporsmalPerSideSkjema = (props: GenereltEttSporsmalPerSideSkjemaProps) => {
    const { soknad, sidenummer } = props;
    const sporsmalsliste = hentSporsmalForDenneSiden(soknad, sidenummer);

    return (
        <form className="soknadskjema" id="ett-sporsmal-per-side">
            <FeilOppsummering skjemanavn={skjemanavnFraSoknad(soknad)} visFeilliste={true}/>
            <SporsmalListe sporsmal={sporsmalsliste} soknad={soknad}/>
            <OppdaterFeiletFeilstripe soknad={soknad} oppdaterSoknadFeiletOk={() => ''}/>
        </form>
    );
};


