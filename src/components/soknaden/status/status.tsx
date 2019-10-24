import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import tekster from './status-panel-tekster'
import { getLedetekst } from '../../../utils/utils';
import dayjs from 'dayjs';

const Status = () => {
    const { valgtSoknad } = useAppStore();

    return (
        <div className="avsnitt">
            <EtikettLiten tag="h3" className="avsnitt-hode">{tekster['statuspanel.status']}</EtikettLiten>
            <Normaltekst>{
                getLedetekst(tekster['soknad.teaser.status.SENDT.til-nav'], {
                    '%DATO%': dayjs(valgtSoknad.sendtTilNAVDato).format('DD.MM.YYYY'),
                })}
            </Normaltekst>
        </div>
    );
};

export default Status;
