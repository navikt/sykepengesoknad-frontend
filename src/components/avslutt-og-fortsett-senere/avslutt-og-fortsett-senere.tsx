import './avslutt-og-fortsett-senere.less'

import { Knapp } from 'nav-frontend-knapper'
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
            <button className="lenke" onClick={(e) => {
                logEvent('panel åpnet', {
                    'component': 'Avbryt søknad',
                    'soknadstype': valgtSoknad?.soknadstype,
                    'steg': stegId
                })
                setAapen(true)
                e.preventDefault()
            }}>
                <Normaltekst tag="span">{tekst('avslutt.popup.tittel')}</Normaltekst>
            </button>
            <ModalWrapper className="modal__avslutt_fortsett_popup" onRequestClose={() => setAapen(false)}
                contentLabel={'avslutt og fortsett senere'}
                isOpen={aapen}
            >
                <Element tag="h3" className="modal__tittel">
                    {tekst('avslutt.popup.tittel')}
                </Element>
                <Normaltekst>{tekst('avslutt.popup.innhold')}</Normaltekst>
                <Normaltekst>{tekst('avslutt.popup.sporsmal')}</Normaltekst>
                <Knapp mini type="hoved" className="knapp" onClick={
                    () => window.location.href = 'https://flex-dittnav-brukertest.labs.nais.io/person/dittnav/?testperson=soknad'}>
                    {tekst('avslutt.popup.ja')}
                </Knapp>
                <Knapp mini type="standard" className="knapp" onClick={() => setAapen(false)}>
                    {tekst('avslutt.popup.nei')}
                </Knapp>

            </ModalWrapper>
        </div>
    )
}

export default AvsluttOgFortsettSenere
