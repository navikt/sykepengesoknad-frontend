import './avbryt-soknad-modal.less'

import { BodyLong, Button, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { avbrytSoknad } from './avbryt-soknad'

const AvbrytSoknadModal = () => {
    const { logEvent } = useAmplitudeInstance()
    const [ aapen, setAapen ] = useState<boolean>(false)
    const { stegId } = useParams<RouteParams>()
    const { valgtSoknad, soknader, setSoknader, setValgtSoknad, setFeilmeldingTekst } = useAppStore()
    const history = useHistory()

    return (
        <>
            <Button size="small" variant="tertiary" className="avbryt_rødknapp"
                onClick={
                    (e) => {
                        logEvent('popup åpnet', {
                            'component': tekst('avbryt.popup.tittel'),
                            'soknadstype': valgtSoknad?.soknadstype,
                            'steg': stegId
                        })
                        setAapen(true)
                        e.preventDefault()
                    }}>
                {tekst('avbryt.popup.tittel')}
            </Button>
            <Modal className="modal__avbryt_popup"
                onClose={() => {
                    setAapen(false)
                    logEvent('popup lukket', {
                        'component': tekst('avbryt.popup.tittel'),
                        'soknadstype': valgtSoknad?.soknadstype,
                        'steg': stegId
                    })
                }}
                open={aapen}
            >
                <Modal.Content>
                    <BodyLong spacing size="medium" className="sporsmal">
                        {tekst('avbryt.popup.sporsmal')}
                    </BodyLong>

                    <Button size="small" variant="danger" className="midtstilt-knapp" onClick={
                        () => {
                            logEvent('knapp klikket', {
                                'tekst': tekst('avbryt.popup.ja'),
                                'soknadstype': valgtSoknad?.soknadstype,
                                'component': tekst('avbryt.popup.tittel'),
                                'steg': stegId
                            })
                            avbrytSoknad({
                                valgtSoknad: valgtSoknad!,
                                setSoknader: setSoknader,
                                soknader: soknader,
                                setValgtSoknad: setValgtSoknad,
                                history: history,
                                setFeilmeldingTekst: setFeilmeldingTekst
                            })

                        }
                    }>
                        {tekst('avbryt.popup.ja')}
                    </Button>
                    <Button size="small" variant="secondary" className="midtstilt-knapp"
                        onClick={() => {
                            setAapen(false)
                            logEvent('knapp klikket', {
                                'tekst': tekst('avbryt.popup.nei'),
                                'soknadstype': valgtSoknad?.soknadstype,
                                'component': tekst('avbryt.popup.tittel'),
                                'steg': stegId
                            })
                        }}>
                        {tekst('avbryt.popup.nei')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default AvbrytSoknadModal
