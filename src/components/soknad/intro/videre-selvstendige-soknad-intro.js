import React from 'react';
import { getHtmlLedetekst } from '@navikt/digisyfo-npm';
import { IllustrertInnhold } from '../../kvittering/illustrert-innhold-gronn-hake';
import parser from 'html-react-parser';
import forsteSoknadIkon from './forste-soknad.svg';

const VidereSelvstendigeSoknadIntro = () => {
    return (
        <IllustrertInnhold
            ikon={forsteSoknadIkon}
            ikonAlt="Din første digitale søknad om sykepenger"
            liten>
            <div className="redaksjonelt-innhold">
                {parser(getHtmlLedetekst('sykepengesoknad.soknad-intro-selvstendig.personvern'))}
            </div>
        </IllustrertInnhold>
    )
};

export default VidereSelvstendigeSoknadIntro;
