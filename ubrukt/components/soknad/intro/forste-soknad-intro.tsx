import React from 'react';
import { getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import { IllustrertInnhold } from '../../kvittering/illustrert-innhold-gronn-hake';
import { Innholdstittel } from 'nav-frontend-typografi';
import parser from 'html-react-parser';
import soknadImg from './forste-soknad.svg';

const ForsteSoknadIntro = () => {
    return (
        <div className="blokk">
            <div className="blokk--s">
                <IllustrertInnhold
                    ikon={soknadImg}
                    ikonAlt="Din første digitale søknad om sykepenger"
                    liten>
                    <Innholdstittel tag="h2" className="panel__tittel sist">
                        {getLedetekst('sykepengesoknad.foerste-soknad.tittel')}
                    </Innholdstittel>
                </IllustrertInnhold>
            </div>
            <div className="redaksjonelt-innhold">
                {parser(getHtmlLedetekst('sykepengesoknad.foerste-soknad.mer_v2'))}
            </div>
        </div>
    );
};

export default ForsteSoknadIntro;
