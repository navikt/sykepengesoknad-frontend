import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../data/stores/app-store';
import tekster from './status-panel-tekster'
import dayjs from 'dayjs';
import { SvarTil } from '../../../types/enums';
import { getLedetekst } from '../../../utils/utils';

const Status = () => {
    const { valgtSoknad, sendTil } = useAppStore();

    return (
        <div className="avsnitt">
            <EtikettLiten tag="h3" className="avsnitt-hode">{tekster['statuspanel.status']}</EtikettLiten>
            {sendTil.map((svar, idx) => {
                return (
                    <Normaltekst key={idx}>
                        {svar === SvarTil.NAV
                            ? getLedetekst(tekster['soknad.teaser.status.SENDT.til-nav'], {
                                '%DATO%': dayjs(valgtSoknad.sendtTilNAVDato).format('DD.MM.YYYY')
                            })
                            : getLedetekst(tekster['soknad.teaser.status.SENDT.til-arbeidsgiver'], {
                                '%DATO%': dayjs(valgtSoknad.sendtTilArbeidsgiverDato).format('DD.MM.YYYY'),
                                '%ARBEIDSGIVER%': valgtSoknad.arbeidsgiver ? valgtSoknad.arbeidsgiver.navn : ''
                            })
                        }
                    </Normaltekst>
                )
            })}
        </div>
    );
};

export default Status;
