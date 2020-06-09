import './ettersending.less'

import Alertstripe from 'nav-frontend-alertstriper'
import { Knapp } from 'nav-frontend-knapper'
import ModalWrapper from 'nav-frontend-modal'
import React, { useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'

interface EttersendingProps {
    gjelder: string;
}

const Ettersending = ({ gjelder }: EttersendingProps) => {
    const [ vilEttersende, setVilEttersende ] = useState<boolean>(false)
    const { valgtSoknad, setFeilmeldingTekst } = useAppStore()

    ModalWrapper.setAppElement('#root')

    const ettersend = () => {
        if (gjelder === 'nav') ettersendNav()
        else if (gjelder === 'arbeidsgiver') ettersendArbeidsgiver()
        setVilEttersende(false)
    }

    const ettersendNav = () => {
        fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/ettersendTilNav`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res: Response) => {
            if (res.ok) {
                setFeilmeldingTekst('')
            } else {
                logger.error('Feil ved ettersending til NAV', res)
                setFeilmeldingTekst(tekst('kvittering.ettersending.feilet'))
            }
        })
    }

    const ettersendArbeidsgiver = () => {
        fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/ettersendTilArbeidsgiver`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res: Response) => {
            if (res.ok) {
                setFeilmeldingTekst('')
            } else {
                logger.error('Feil ved ettersending til ARBEIDSGIVER', res)
                setFeilmeldingTekst(tekst('kvittering.ettersending.feilet'))
            }
        })
    }

    const hentTekst = (text: string) => {
        const tilSuffix = (gjelder === 'nav') ? '-nav' : '-arbeidsgiver'
        const ettersendingSuffix = (gjelder === 'nav')
            ? (valgtSoknad!.sendtTilNAVDato !== undefined) ? '-ettersending' : ''
            : (valgtSoknad!.sendtTilArbeidsgiverDato !== undefined) ? '-ettersending' : ''

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
                <button className="knapp knapp--hoved lenke" onClick={() => ettersend()}>
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
