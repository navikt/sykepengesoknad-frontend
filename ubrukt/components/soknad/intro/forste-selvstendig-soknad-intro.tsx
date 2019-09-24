import React from 'react';
import { getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import { IllustrertInnhold } from '../../kvittering/illustrert-innhold-gronn-hake';
import { Innholdstittel } from 'nav-frontend-typografi';
import parser from 'html-react-parser';
import forsteSoknadIkon from './forste-soknad.svg';

const ForsteSelvstendigeSoknadIntro = () => {
    return (
        <div className="blokk">
            <div className="blokk--s">
                <IllustrertInnhold
                    ikon={forsteSoknadIkon}
                    ikonAlt="Din første digitale søknad om sykepenger"
                    liten>
                    <Innholdstittel className="panel__tittel sist">
                        {getLedetekst('sykepengesoknad.foerste-selvstendig-soknad.tittel')}
                    </Innholdstittel>
                </IllustrertInnhold>
            </div>
            <div className="redaksjonelt-innhold">
                {parser(getHtmlLedetekst('sykepengesoknad.foerste-selvstendig-soknad.mer'))}
            </div>
        </div>
    );
};

export default ForsteSelvstendigeSoknadIntro;
