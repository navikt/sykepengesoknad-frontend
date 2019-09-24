import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { Normaltekst } from 'nav-frontend-typografi';
import { Soknad } from '../../../../src/types/types';
import { RSSoknadstatus } from '../../../../src/types/rs-types/rs-soknadstatus';
import { IllustrertInnhold } from '../../kvittering/illustrert-innhold-gronn-hake';

interface TidligSoknadProps {
    soknad: Soknad
}

const TidligSoknad = ({ soknad }: TidligSoknadProps) => {
    const now = new Date();
    return soknad.status === RSSoknadstatus.NY && soknad.tom! > now ? (
        <div className="panel panel--komprimert blokk">
            <IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/snomannen.svg`} ikonAlt="Tidlig søknad">
                <Normaltekst className="sykepenger__tidligSoknad">{getLedetekst('sykepengesoknad.tidlig-soknad')}</Normaltekst>
            </IllustrertInnhold>
        </div>
    ) : null;
};

export default TidligSoknad;
