import React from 'react';
import { useAppStore } from '../../data/stores/app-store';
import { Normaltekst } from 'nav-frontend-typografi';
import tekster from './soknaden-tekster';
import { getLedetekst } from '../../utils/utils';
import './sendt-til.less';

const SendtTil = () => {
    const { valgtSoknad, sendTil } = useAppStore();

    const mottaker = sendTil.sort().reverse().join('-').toLowerCase();
    const nokkel = `sykepengesoknad.oppsummering.${mottaker}-som-mottaker`;

    return (
        <Normaltekst className="bottom_line">
            {getLedetekst(tekster[nokkel], {
                '%ARBEIDSGIVER%': valgtSoknad.arbeidsgiver.navn,
            })}
        </Normaltekst>
    )
};

export default SendtTil;
