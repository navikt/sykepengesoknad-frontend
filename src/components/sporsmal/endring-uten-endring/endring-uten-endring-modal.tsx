import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import { avbrytSoknad } from '../../avbryt-soknad-modal/avbryt-soknad'

interface EndringUtenEndringModalProps {
    aapen: boolean
    setAapen: (p: boolean) => void
}

export const EndringUtenEndringModal = (
    props: EndringUtenEndringModalProps
) => {
    const { logEvent } = useAmplitudeInstance()

    const {
        valgtSoknad,
        soknader,
        setSoknader,
        setValgtSoknad,
        setFeilmeldingTekst,
    } = useAppStore()
    const history = useHistory()

    return (
        <>
            <Modal
                className="modal__endring-uten-endring_popup"
                onClose={() => {
                    props.setAapen(false)
                }}
                open={props.aapen}
                aria-labelledby="modal-tittel"
            >
                <Modal.Content>
                    <Heading size="small" level="1" id="modal-tittel" spacing>
                        {tekst('endring-uten-endring.popup.tittel')}
                    </Heading>

                    <BodyShort>
                        {tekst('endring-uten-endring.popup.innhold')}
                    </BodyShort>

                    <Button
                        variant="primary"
                        className="midtstilt-knapp"
                        onClick={() => {
                            props.setAapen(false)
                            logEvent('knapp klikket', {
                                tekst: tekst('endring-uten-endring.popup.ok'),
                                soknadstype: valgtSoknad?.soknadstype,
                                component: 'endring-uten-endring-modal',
                            })
                            avbrytSoknad({
                                valgtSoknad: valgtSoknad!,
                                setSoknader: setSoknader,
                                soknader: soknader,
                                setValgtSoknad: setValgtSoknad,
                                history: history,
                                setFeilmeldingTekst: setFeilmeldingTekst,
                            })
                        }}
                    >
                        {tekst('endring-uten-endring.popup.ok')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}
