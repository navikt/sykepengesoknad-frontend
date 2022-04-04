import './endring-uten-endring.less'

import { BodyShort, Button, Modal } from '@navikt/ds-react'
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

                    <BodyShort>{tekst('endring-uten-endring.popup.innhold')}</BodyShort>

                    <div className={'knapperad'}>
                        <Button variant="primary" className="midtstilt-knapp"
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
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}


