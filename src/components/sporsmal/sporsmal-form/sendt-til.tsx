import React, { useEffect } from 'react';
import { useAppStore } from '../../../data/stores/app-store';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { getLedetekst, tekst } from '../../../utils/tekster';
import parser from 'html-react-parser';
import './sendt-til.less';

const SendtTil = () => {
    const { valgtSoknad, sendTil } = useAppStore();
    let mottaker;
    let nokkel = '';

    useEffect(() => {
        mottaker = sendTil && sendTil.length > 0 ? sendTil.sort().reverse().join('-').toLowerCase() : undefined;
        nokkel = `sykepengesoknad.kvittering.til-${mottaker}.tekst`;
    }, []);

    if (mottaker === undefined) {
        return null;
    }

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
