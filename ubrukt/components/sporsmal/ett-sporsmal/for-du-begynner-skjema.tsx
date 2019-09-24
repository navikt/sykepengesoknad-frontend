import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { hentSporsmalForDenneSiden } from './ett-sporsmal-per-side-utils';
import { Soknad } from '../../../../src/types/types';
import { skjemanavnFraSoknad } from '../../../../src/utils/skjemanavn-fra-soknad';
import OppdaterFeiletFeilstripe from './oppdater-feilet-feilstripe';
import KnapperadEttSporsmalPerSide from './knapperad-ett-sporsmal-per-side';
import AvbrytSoknad from '../../avbryt-soknad/avbryt-soknad';
import CheckboxComp from '../checkbox-comp';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';

interface ForDuBegynnerSkjemaProps {
    soknad: Soknad,
    sidenummer: number,
}

const ForDuBegynnerSkjema = (props: ForDuBegynnerSkjemaProps) => {
    const { soknad, sidenummer } = props;
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer);

    return (
        <form className="soknadskjema" id="ett-sporsmal-per-side">
            <FeilOppsummering skjemanavn={skjemanavnFraSoknad(soknad)} visFeilliste={true}/>
            <div className="redaksjonelt-innhold">
                <p className="blokk">{getLedetekst('sykepengesoknad.bekreft-ansvar.introtekst')}</p>
                <CheckboxComp name={sporsmal.tag} soknad={soknad}/>
            </div>
            <OppdaterFeiletFeilstripe soknad={soknad} oppdaterSoknadFeiletOk={() => 'SOKNAD_FEILET'}/>
            <KnapperadEttSporsmalPerSide />
            <AvbrytSoknad soknad={soknad}/>
        </form>
    );
};

export default ForDuBegynnerSkjema;
