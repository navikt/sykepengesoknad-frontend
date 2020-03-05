import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import tekster from './opplysninger-tekster';
import Vis from '../../vis';

const ArbeidsgiverInfo = () => {
    const { valgtSykmelding } = useAppStore();

    if (valgtSykmelding === undefined) {
        return null;
    }

    return (
        <div className='avsnitt'>
            <EtikettLiten tag='h3' className='avsnitt-hode'>
                {tekster['sykepengesoknad.sykmelding-utdrag.arbeidsgiver']}
            </EtikettLiten>
            <Vis hvis={valgtSykmelding.arbeidsgiver}>
                <Normaltekst>{valgtSykmelding.arbeidsgiver}</Normaltekst>
            </Vis>
        </div>
    );
};

export default ArbeidsgiverInfo;
