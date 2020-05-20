import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import dayjs from 'dayjs';
import { tekst } from '../../../utils/tekster';

const SykmeldingDato = () => {
    const { valgtSykmelding } = useAppStore();

    if (valgtSykmelding === undefined) {
        return null;
    }

    return (
        <div className='avsnitt'>
            <EtikettLiten tag='h3' className='avsnitt-hode'>{tekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet')}</EtikettLiten>
            <Normaltekst>{dayjs(valgtSykmelding.startLegemeldtFravaer).format('D. MMM YYYY')}</Normaltekst>
        </div>
    );
};

export default SykmeldingDato;
