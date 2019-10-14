import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import tekster from './opplysninger-tekster';
import dayjs from 'dayjs';

const SykmeldingDato = () => {
    const { sykmelding } = useAppStore();

    return (
        <div className="avsnitt">
            <EtikettLiten tag="h3" className="avsnitt-hode">{tekster['sykmelding-dato.tittel']}</EtikettLiten>
            <Normaltekst>{dayjs(sykmelding.startLegemeldtFravaer).format('D. MMM YYYY')}</Normaltekst>
        </div>
    );
};

export default SykmeldingDato;
