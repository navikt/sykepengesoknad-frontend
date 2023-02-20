import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { minSideUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import useSoknad from '../../hooks/useSoknad'

const AvsluttOgFortsettSenere = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const [aapen, setAapen] = useState<boolean>(false)

    if (!valgtSoknad) return null

    return (
        <>
            <Button
                variant="tertiary"
                onClick={(e) => {
                    logEvent('modal åpnet', {
                        component: tekst('avslutt.popup.tittel'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId,
                    })
                    setAapen(true)
                    e.preventDefault()
                }}
            >
                {tekst('avslutt.popup.tittel')}
            </Button>
            <Modal
                className="modal__avslutt_fortsett_popup"
                onClose={() => {
                    setAapen(false)
                    logEvent('modal lukket', {
                        component: tekst('avslutt.popup.tittel'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId,
                    })
                }}
                open={aapen}
                aria-labelledby="modal-tittel"
            >
                <Modal.Content>
                    <Heading size="small" level="1" className="modal__tittel" id="modal-tittel">
                        {tekst('avslutt.popup.tittel')}
                    </Heading>
                    <BodyShort>{tekst('avslutt.popup.innhold')}</BodyShort>
                    <BodyShort>{tekst('avslutt.popup.sporsmal')}</BodyShort>
                    <Button
                        variant="primary"
                        className="midtstilt-knapp"
                        onClick={() => {
                            logEvent('knapp klikket', {
                                tekst: tekst('avslutt.popup.ja'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: tekst('avslutt.popup.tittel'),
                                steg: stegId,
                            })
                            // Må sikre at amplitude får logget ferdig
                            window.setTimeout(() => {
                                window.location.href = minSideUrl()
                            }, 200)
                        }}
                    >
                        {tekst('avslutt.popup.ja')}
                    </Button>
                    <Button
                        variant="secondary"
                        className="midtstilt-knapp"
                        onClick={() => {
                            setAapen(false)
                            logEvent('knapp klikket', {
                                tekst: tekst('avslutt.popup.nei'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: tekst('avslutt.popup.tittel'),
                                steg: stegId,
                            })
                        }}
                    >
                        {tekst('avslutt.popup.nei')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default AvsluttOgFortsettSenere
