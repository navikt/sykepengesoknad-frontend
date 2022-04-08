import { BodyLong, Button, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { EndringUtenEndringModal } from '../sporsmal/endring-uten-endring/endring-uten-endring-modal'
import { avbrytSoknad } from './avbryt-soknad'

const AvbrytKorrigering = () => {
    const { logEvent } = useAmplitudeInstance()

    const [ aapen, setAapen ] = useState<boolean>(false)
    const { valgtSoknad } = useAppStore()
    const { stegId } = useParams<RouteParams>()

    return <div>
        <Button variant="tertiary" className="avbryt_rødknapp"
            onClick={
                (e) => {
                    logEvent('popup åpnet', {
                        'component': tekst('avbryt.korrigering.knapp'),
                        'soknadstype': valgtSoknad?.soknadstype,
                        'steg': stegId
                    })
                    setAapen(true)
                    e.preventDefault()
                }}>
            {tekst('avbryt.korrigering.knapp')}
        </Button>
        <EndringUtenEndringModal aapen={aapen} setAapen={setAapen} />
    </div>
}

const AvbrytSoknadModal = () => {
    const { logEvent } = useAmplitudeInstance()
    const [ aapen, setAapen ] = useState<boolean>(false)
    const { stegId } = useParams<RouteParams>()
    const { valgtSoknad, soknader, setSoknader, setValgtSoknad, setFeilmeldingTekst } = useAppStore()
    const history = useHistory()

    if (!valgtSoknad) {
        return null
    }
    if (valgtSoknad.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
        return <AvbrytKorrigering />
    }

    return (
        <div>
            <Button variant="tertiary" className="avbryt_rødknapp"
                onClick={
                    (e) => {
                        logEvent('popup åpnet', {
                            'component': tekst('avbryt.popup.tittel'),
                            'soknadstype': valgtSoknad.soknadstype,
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
                        'soknadstype': valgtSoknad.soknadstype,
                        'steg': stegId
                    })
                }}
                closeButton={false}
                open={aapen}
            >
                <Modal.Content>
                    <BodyLong spacing size="medium">
                        {tekst('avbryt.popup.sporsmal')}
                    </BodyLong>

                    <Button variant="danger" className="midtstilt-knapp" onClick={
                        () => {
                            logEvent('knapp klikket', {
                                'tekst': tekst('avbryt.popup.ja'),
                                'soknadstype': valgtSoknad.soknadstype,
                                'component': tekst('avbryt.popup.tittel'),
                                'steg': stegId,
                            })
                            avbrytSoknad({
                                valgtSoknad: valgtSoknad,
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
                    <Button variant="secondary" className="midtstilt-knapp"
                        onClick={() => {
                            setAapen(false)
                            logEvent('knapp klikket', {
                                'tekst': tekst('avbryt.popup.nei'),
                                'soknadstype': valgtSoknad.soknadstype,
                                'component': tekst('avbryt.popup.tittel'),
                                'steg': stegId
                            })
                        }}>
                        {tekst('avbryt.popup.nei')}
                    </Button>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default AvbrytSoknadModal
