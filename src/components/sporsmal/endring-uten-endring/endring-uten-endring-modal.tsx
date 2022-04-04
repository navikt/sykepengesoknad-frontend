import './endring-uten-endring.less'

import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { avbrytSoknad } from '../../avbryt-soknad-modal/avbryt-soknad'

interface EndringUtenEndringModalProps {
    aapen: boolean
    setAapen: (p: boolean) => void
}

export const EndringUtenEndringModal = (props: EndringUtenEndringModalProps) => {
    const { valgtSoknad, soknader, setSoknader, setValgtSoknad, setFeilmeldingTekst } = useAppStore()
    const history = useHistory()

    return (
        <>
            <Modal className="modal__endring-uten-endring_popup"
                onClose={() => {
                    props.setAapen(false)
                }}
                open={props.aapen}
            >
                <Modal.Content>
                    <Heading size="small" level="3" className="modal__tittel">
                        {tekst('endring-uten-endring.popup.tittel')}
                    </Heading>
                    <BodyShort>{tekst('endring-uten-endring.popup.innhold')}</BodyShort>

                    <Button variant="primary" className="hoyre-knapp"
                        onClick={() => {
                            props.setAapen(false)
                            avbrytSoknad({
                                valgtSoknad: valgtSoknad!,
                                setSoknader: setSoknader,
                                soknader: soknader,
                                setValgtSoknad: setValgtSoknad,
                                history: history,
                                setFeilmeldingTekst: setFeilmeldingTekst
                            })
                        }}>
                        {tekst('endring-uten-endring.popup.ok')}
                    </Button>
                    <Button variant="secondary" className="hoyre-knapp" onClick={
                        () => {
                            props.setAapen(false)
                        }
                    }>
                        {tekst('endring-uten-endring.popup.tilbake')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}


