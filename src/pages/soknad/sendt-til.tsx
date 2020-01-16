import React from 'react';
import { useAppStore } from '../../data/stores/app-store';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import tekster from './soknaden-tekster';
import { getLedetekst } from '../../utils/utils';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import Vis from '../../components/vis';
import parser from 'html-react-parser';
import './sendt-til.less';

const SendtTil = () => {
    const { valgtSoknad, sendTil } = useAppStore();
    const erSiste = valgtSoknad.status === RSSoknadstatus.SENDT;
    const mottaker = sendTil.sort().reverse().join('-').toLowerCase();

    const nokkel = erSiste
        ? `sykepengesoknad.kvittering.til-${mottaker}.tekst`
        : `sykepengesoknad.oppsummering.${mottaker}-som-mottaker`;
    const className = erSiste ? 'bottom_line kvittering' : 'bottom_line';

    return (
        <div className={className}>
            <Vis hvis={erSiste}>
                <Systemtittel tag="h2">
                    {tekster['sykepengesoknad.kvittering.tittel']}
                </Systemtittel>
            </Vis>
            <Normaltekst tag="div">
                {valgtSoknad.arbeidsgiver !== undefined
                    ? parser(getLedetekst(tekster[nokkel], {
                        '%ARBEIDSGIVER%': valgtSoknad.arbeidsgiver.navn,
                    }))
                    : parser(tekster[nokkel])
                }
            </Normaltekst>
        </div>
    )
};

export default SendtTil;
