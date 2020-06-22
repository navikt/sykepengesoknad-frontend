import './ettersending.less'

import Alertstripe from 'nav-frontend-alertstriper'
import { Knapp } from 'nav-frontend-knapper'
import ModalWrapper from 'nav-frontend-modal'
import React, { useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'

interface EttersendingProps {
    gjelder: string;
}

const Ettersending = ({ gjelder }: EttersendingProps) => {
    const { valgtSoknad, setEttersend } = useAppStore()
    const [ vilEttersende, setVilEttersende ] = useState<boolean>(false)

    const hentTekst = (text: string) => {
        const tilSuffix = (gjelder === 'nav') ? '-nav' : '-arbeidsgiver'
        const ettersendingSuffix = (gjelder === 'nav')
            ? (valgtSoknad?.sendtTilNAVDato ? '-ettersending' : '')
            : (valgtSoknad?.sendtTilArbeidsgiverDato ? '-ettersending' : '')

        return tekst(`${text}${tilSuffix}${ettersendingSuffix}`)
    }

    return (<>
        <Knapp mini type='standard' onClick={() => {
            setVilEttersende(true)
        }}>
            {tekst(`kvittering.knapp.send-${gjelder}`)}
        </Knapp>

        <ModalWrapper onRequestClose={() => setVilEttersende(false)}
            className='ettersending'
            contentLabel='ettersending'
            isOpen={vilEttersende}
        >
            <h3 className="modal__tittel">{hentTekst('kvittering.tittel.send-til')}</h3>
            <Alertstripe type="info">{hentTekst('kvittering.info.send-til')}</Alertstripe>
            <div className="blokk-xs">
                <button className="knapp knapp--hoved lenke" onClick={() => {
                    setEttersend({
                        type: gjelder,
                        dato: new Date()
                    })
                    setVilEttersende(false)
                }}>
                    {hentTekst('kvittering.knapp.bekreft.send-til')}
                </button>
            </div>
            <button className="lenke" onClick={() => setVilEttersende(false)}>
                {tekst('kvittering.knapp.angre')}
            </button>
        </ModalWrapper>
    </>)
}

export default Ettersending
