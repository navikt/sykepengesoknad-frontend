import { Knapp } from 'nav-frontend-knapper';
import tekster from './status-panel-tekster';
import Alertstripe from 'nav-frontend-alertstriper';
import React, { useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { useAppStore } from '../../../data/stores/app-store';
import env from '../../../utils/environment';
import './ettersending.less';

interface EttersendingProps {
    gjelder: string;
}

const Ettersending = ({ gjelder }: EttersendingProps) => {
    const [ vilEttersende, setVilEttersende ] = useState<boolean>(false);
    const { valgtSoknad, setFeilmeldingTekst } = useAppStore();

    ModalWrapper.setAppElement('#root');

    const ettersend = () => {
        if (gjelder === 'nav') ettersendNav();
        else if (gjelder === 'arbeidsgiver') ettersendArbeidsgiver();
        setVilEttersende(false);
    };

    const ettersendNav = () => {
        fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/ettersendTilNav`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res: Response) => {
            if (res.ok) {
                setFeilmeldingTekst('')
            } else {
                setFeilmeldingTekst(tekster[ 'statuspanel.ettersending.feilet' ])
            }
        });
    };

    const ettersendArbeidsgiver = () => {
        fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/ettersendTilArbeidsgiver`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res: Response) => {
            if (res.ok) {
                setFeilmeldingTekst('')
            } else {
                setFeilmeldingTekst(tekster[ 'statuspanel.ettersending.feilet' ])
            }
        });
    };

    const hentTekst = (tekst: string) => {
        const tilSuffix = (gjelder === 'nav') ? '-nav' : '-arbeidsgiver';
        const ettersendingSuffix = (gjelder === 'nav')
            ? (valgtSoknad!.sendtTilNAVDato !== undefined) ? '-ettersending' : ''
            : (valgtSoknad!.sendtTilArbeidsgiverDato !== undefined) ? '-ettersending' : '';

        return tekster[ `${tekst}${tilSuffix}${ettersendingSuffix}` ];
    };

    return (<>
        <Knapp mini type='standard' onClick={() => {
            setVilEttersende(true)
        }}>
            {tekster[ `statuspanel.knapp.send-${gjelder}` ]}
        </Knapp>

        <ModalWrapper onRequestClose={() => setVilEttersende(false)}
            className='ettersending'
            contentLabel='ettersending'
            isOpen={vilEttersende}
        >
            <h3 className="modal__tittel">{hentTekst('statuspanel.tittel.send-til')}</h3>
            <Alertstripe type="info">{hentTekst('statuspanel.info.send-til')}</Alertstripe>
            <div className="blokk-xs">
                <button className="knapp knapp--hoved lenke" onClick={() => ettersend()}>
                    {hentTekst('statuspanel.knapp.bekreft.send-til')}
                </button>
            </div>
            <button className="lenke" onClick={() => setVilEttersende(false)}>
                {tekster[ 'statuspanel.knapp.angre' ]}
            </button>
        </ModalWrapper>
    </>);
};

export default Ettersending;
