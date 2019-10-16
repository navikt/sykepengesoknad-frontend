import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import tekster from './opplysninger-tekster';

const ArbeidsgiverInfo = () => {
    const { valgtSykmelding } = useAppStore();

    if (valgtSykmelding === undefined) {
        return null;
    }

    return (
        <div className="avsnitt">
            <EtikettLiten tag="h3" className="avsnitt-hode">{tekster['arbeidsgiver.tittel']}</EtikettLiten>
            <Normaltekst>{valgtSykmelding.arbeidsgiver}</Normaltekst>
        </div>
    );
};

export default ArbeidsgiverInfo;
