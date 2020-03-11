import { Knapp } from 'nav-frontend-knapper';
import tekster from './status-panel-tekster';
import Alertstripe from 'nav-frontend-alertstriper';
import React, { useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { useAppStore } from '../../../data/stores/app-store';
import './ettersending.less';
import env from '../../../utils/environment';

interface EttersendingProps {
    gjelder: string;
}

const Ettersending = ({ gjelder }: EttersendingProps) => {
    const [ vilEttersende, setVilEttersende ] = useState<boolean>(false);
    const { valgtSoknad } = useAppStore();

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
        });
    };

    const ettersendArbeidsgiver = () => {
        fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/ettersendTilArbeidsgiver`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
    };

    const hentTekst = (tekst: string) => {
        const tilSuffix = (gjelder === 'nav') ? '-nav' : '-arbeidsgiver';
        const ettersendingSuffix = (gjelder === 'nav')
            ? (valgtSoknad!.sendtTilNAVDato !== undefined) ? '-ettersending' : ''
            : (valgtSoknad!.sendtTilArbeidsgiverDato !== undefined) ? '-ettersending' : '';

        return tekster[`${tekst}${tilSuffix}${ettersendingSuffix}`];
    };

    return (<>
        <Knapp mini type='standard' onClick={() => {setVilEttersende(true)}}>
            {tekster[ `statuspanel.knapp.send-${gjelder}` ]}
        </Knapp>

        <ModalWrapper onRequestClose={() => { setVilEttersende(false) }} className='ettersending' contentLabel='ettersending' isOpen={vilEttersende} >
            <h3 className="modal__tittel">{hentTekst('statuspanel.tittel.send-til')}</h3>
            <Alertstripe type="info">{hentTekst('statuspanel.info.send-til')}</Alertstripe>
            <div className="blokk-xs">
                <a className="knapp knapp--hoved lenke" onClick={() => ettersend()}>{hentTekst('statuspanel.knapp.bekreft.send-til')}</a>
            </div>
            <a className="lenke" onClick={() => {setVilEttersende(false)}}>{tekster[ 'statuspanel.knapp.angre' ]}</a>
        </ModalWrapper>
    </>);
};

export default Ettersending;
