import React from 'react';
import { getHtmlLedetekst } from '@navikt/digisyfo-npm';
import { IllustrertInnhold } from '../../kvittering/illustrert-innhold-gronn-hake';
import forsteSoknadIkon from './forste-soknad.svg';
import parser from 'html-react-parser';

const VidereSoknadIntro = () => {
    return (
        <IllustrertInnhold
            ikon={forsteSoknadIkon}
            ikonAlt="Din første digitale søknad om sykepenger"
            liten>
            <div className="redaksjonelt-innhold">
                {parser(getHtmlLedetekst('sykepengesoknad.soknad-intro.personvern'))}
            </div>
        </IllustrertInnhold>
    )
};

export default VidereSoknadIntro;
