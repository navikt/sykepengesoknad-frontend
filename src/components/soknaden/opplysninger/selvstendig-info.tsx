import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { tekst } from '../../../utils/tekster';

const SelvstendigInfo = () => {
    const { valgtSoknad } = useAppStore();

    if (valgtSoknad.soknadstype !== RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE) return null;

    return (
        <div className='avsnitt'>
            <EtikettLiten tag='h3' className='avsnitt-hode'>{tekst('din-sykmelding.arbeidssituasjon.tittel.2')}</EtikettLiten>
            <Normaltekst>{tekst('din-sykmelding.arbeidssituasjon.alternativ.frilanser')}</Normaltekst>
        </div>
    );
};

export default SelvstendigInfo;
