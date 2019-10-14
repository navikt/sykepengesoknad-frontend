import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import tekster from './opplysninger-tekster';

const ArbeidsgiverInfo = () => {
    const { sykmelding } = useAppStore();

    return (
        <div className="avsnitt">
            <EtikettLiten tag="h3" className="avsnitt-hode">{tekster['arbeidsgiver.tittel']}</EtikettLiten>
            <Normaltekst>{sykmelding.arbeidsgiver}</Normaltekst>
        </div>
    );
};

export default ArbeidsgiverInfo;
