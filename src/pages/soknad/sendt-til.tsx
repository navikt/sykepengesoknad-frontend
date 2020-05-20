import React from 'react';
import { useAppStore } from '../../data/stores/app-store';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { getLedetekst, tekst } from '../../utils/tekster';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import Vis from '../../components/vis';
import parser from 'html-react-parser';
import './sendt-til.less';

const SendtTil = () => {
    const { valgtSoknad, sendTil } = useAppStore();
    const erSiste = valgtSoknad.status === RSSoknadstatus.SENDT;
    const mottaker = sendTil && sendTil.length > 0 ? sendTil.sort().reverse().join('-').toLowerCase() : undefined;

    const nokkel = erSiste
        ? `sykepengesoknad.kvittering.til-${mottaker}.tekst`
        : `sykepengesoknad.oppsummering.${mottaker}-som-mottaker`;

    const className = erSiste ? 'bottom_line kvittering' : 'bottom_line';

    return (
        <div className={className}>
            <Vis hvis={erSiste}>
                <Systemtittel tag='h2'>
                    {tekst('sykepengesoknad.kvittering.tittel')}
                </Systemtittel>
            </Vis>
            {mottaker !== undefined ?
                <Normaltekst tag='div'>
                    {valgtSoknad.arbeidsgiver !== undefined
                        ? parser(getLedetekst(tekst(nokkel), {
                            '%ARBEIDSGIVER%': valgtSoknad.arbeidsgiver.navn,
                        }))
                        : parser(tekst(nokkel))
                    }
                </Normaltekst> : null
            }
        </div>
    )
};

export default SendtTil;
