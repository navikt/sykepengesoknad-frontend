import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import Vis from '../../vis';
import { tekst } from '../../../utils/tekster';

const ArbeidsgiverInfo = () => {
    const { valgtSykmelding } = useAppStore();

    if (valgtSykmelding === undefined) {
        return null;
    }

    return (
        <div className='avsnitt'>
            <EtikettLiten tag='h3' className='avsnitt-hode'>
                {tekst('sykepengesoknad.sykmelding-utdrag.arbeidsgiver')}
            </EtikettLiten>
            <Vis hvis={valgtSykmelding.arbeidsgiver}>
                <Normaltekst>{valgtSykmelding.arbeidsgiver}</Normaltekst>
            </Vis>
        </div>
    );
};

export default ArbeidsgiverInfo;
