import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import tekster from './opplysninger-tekster';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';

const SelvstendigInfo = () => {
    const { valgtSoknad } = useAppStore();

    if (valgtSoknad.soknadstype !== RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE) return null;

    return (
        <div className="avsnitt">
            <EtikettLiten tag="h3" className="avsnitt-hode">{tekster['selvstendig.tittel']}</EtikettLiten>
            <Normaltekst>{tekster['arbeidssituasjon.selvstendig']}</Normaltekst>
        </div>
    );
};

export default SelvstendigInfo;
