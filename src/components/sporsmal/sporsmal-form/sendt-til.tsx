import React from 'react';
import { useAppStore } from '../../../data/stores/app-store';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { getLedetekst, tekst } from '../../../utils/tekster';
import parser from 'html-react-parser';
import './sendt-til.less';

const SendtTil = () => {
    const { valgtSoknad, sendTil } = useAppStore();
    const erSiste = valgtSoknad!.status === RSSoknadstatus.SENDT;
    const mottaker = sendTil && sendTil.length > 0 ? sendTil.sort().reverse().join('-').toLowerCase() : undefined;
    const nokkel = `sykepengesoknad.kvittering.til-${mottaker}.tekst`;

    return (
        <div className="bottom_line">
            <Systemtittel tag='h2'>
                {tekst('sykepengesoknad.kvittering.tittel')}
            </Systemtittel>
            {mottaker !== undefined ?
                <Normaltekst tag='div'>
                    {valgtSoknad!.arbeidsgiver !== undefined
                        ? parser(getLedetekst(tekst(nokkel), {
                            '%ARBEIDSGIVER%': valgtSoknad!.arbeidsgiver.navn,
                        }))
                        : parser(tekst(nokkel))
                    }
                </Normaltekst> : null
            }
        </div>
    )
};

export default SendtTil;
