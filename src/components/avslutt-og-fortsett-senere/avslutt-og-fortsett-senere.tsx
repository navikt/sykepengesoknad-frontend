import './avslutt-og-fortsett-senere.less'

import { Button } from '@navikt/ds-react'
import ModalWrapper from 'nav-frontend-modal'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
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
                        logEvent('panel åpnet', {
                            'component': 'Avbryt søknad',
                            'soknadstype': valgtSoknad?.soknadstype,
                            'steg': stegId
                        })
                        setAapen(true)
                        e.preventDefault()
                    }}>
                {tekst('avslutt.popup.tittel')}
            </Button>
            <ModalWrapper className="modal__avslutt_fortsett_popup" onRequestClose={() => setAapen(false)}
                contentLabel={'avslutt og fortsett senere'}
                isOpen={aapen}
            >
                <Element tag="h3" className="modal__tittel">
                    {tekst('avslutt.popup.tittel')}
                </Element>
                <Normaltekst>{tekst('avslutt.popup.innhold')}</Normaltekst>
                <Normaltekst>{tekst('avslutt.popup.sporsmal')}</Normaltekst>
                <Button size="small" variant="primary" className="midtstilt-knapp" onClick={
                    () => window.location.href = 'https://flex-dittnav-brukertest.labs.nais.io/person/dittnav/?testperson=soknad'}>
                    {tekst('avslutt.popup.ja')}
                </Button>
                <Button size="small" variant="secondary" className="midtstilt-knapp"
                    onClick={() => setAapen(false)}>
                    {tekst('avslutt.popup.nei')}
                </Button>

            </ModalWrapper>
        </div>
    )
}

export default AvsluttOgFortsettSenere
