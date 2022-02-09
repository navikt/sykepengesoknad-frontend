import './avslutt-og-fortsett-senere.less'

import { Button } from '@navikt/ds-react'
import ModalWrapper from 'nav-frontend-modal'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import env from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'

const AvsluttOgFortsettSenere = () => {
    const { logEvent } = useAmplitudeInstance()
    const [ aapen, setAapen ] = useState<boolean>(false)
    const { stegId } = useParams<RouteParams>()
    const { valgtSoknad } = useAppStore()

    return (

        <div>
            <Button size="small" variant="tertiary"
                onClick={
                    (e) => {
                        logEvent('popup åpnet', {
                            'component': tekst('avslutt.popup.tittel'),
                            'soknadstype': valgtSoknad?.soknadstype,
                            'steg': stegId
                        })
                        setAapen(true)
                        e.preventDefault()
                    }}>
                {tekst('avslutt.popup.tittel')}
            </Button>
            <ModalWrapper className="modal__avslutt_fortsett_popup" onRequestClose={() => {

                setAapen(false)
                logEvent('popup lukket', {
                    'component': tekst('avslutt.popup.tittel'),
                    'soknadstype': valgtSoknad?.soknadstype,
                    'steg': stegId
                })
            }}
            contentLabel={tekst('avslutt.popup.tittel')}
            isOpen={aapen}
            >
                <Element tag="h3" className="modal__tittel">
                    {tekst('avslutt.popup.tittel')}
                </Element>
                <Normaltekst>{tekst('avslutt.popup.innhold')}</Normaltekst>
                <Normaltekst>{tekst('avslutt.popup.sporsmal')}</Normaltekst>
                <Button size="small" variant="primary" className="midtstilt-knapp" onClick={
                    () => {
                        logEvent('knapp klikket', {
                            'tekst': tekst('avslutt.popup.ja'),
                            'soknadstype': valgtSoknad?.soknadstype,
                            'component': tekst('avslutt.popup.tittel'),
                            'steg': stegId
                        })
                        // Må sikre at amplitude får logget ferdig
                        window.setTimeout(() => {
                            window.location.href = env.dittNavUrl()
                        }, 200)

                    }
                }>
                    {tekst('avslutt.popup.ja')}
                </Button>
                <Button size="small" variant="secondary" className="midtstilt-knapp"
                    onClick={() => {
                        setAapen(false)
                        logEvent('knapp klikket', {
                            'tekst':tekst('avslutt.popup.nei'),
                            'soknadstype': valgtSoknad?.soknadstype,
                            'component': tekst('avslutt.popup.tittel'),
                            'steg': stegId
                        })
                    }}>
                    {tekst('avslutt.popup.nei')}
                </Button>

            </ModalWrapper>
        </div>
    )
}

export default AvsluttOgFortsettSenere
