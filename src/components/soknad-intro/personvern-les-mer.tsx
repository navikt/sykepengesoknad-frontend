import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { MouseEvent, useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>

const PersonvernLesMer = () => {
    const [aapen, setAapen] = useState<boolean>(false)
    const { valgtSoknad } = useAppStore()
    const { logEvent } = useAmplitudeInstance()

    if (!valgtSoknad) {
        return null
    }

    const handleAapen = (event: Event) => {
        event.preventDefault()
        setAapen(true)
        logEvent('knapp klikket', {
            tekst: tekst('sykepengesoknad.soknad-intro.personvern-les-mer'),
            soknadstype: valgtSoknad?.soknadstype,
        })
    }
    const amplitudeLukketPopup = () => {
        logEvent('modal lukket', {
            component: tekst('sykepengesoknad.soknad-intro.personvern-les-mer'),
        })
    }

    return (
        <div className="personvern-les-mer">
            <Button variant="tertiary" onClick={handleAapen}>
                {tekst('sykepengesoknad.soknad-intro.personvern-les-mer')}
            </Button>
            <Modal
                className="personvern-modal"
                onClose={() => {
                    setAapen(false)
                    amplitudeLukketPopup()
                }}
                open={aapen}
                aria-labelledby="modal-tittel"
            >
                <Modal.Content>
                    <Heading
                        size="medium"
                        level="1"
                        className="modal__tittel"
                        id="modal-tittel"
                    >
                        {tekst(
                            'sykepengesoknad.soknad-intro.personvern-modal-header'
                        )}
                    </Heading>
                    {parser(tekst('sykepengesoknad.soknad-intro.personvern-modal-innhold'))}

                    <div className="lukk-wrapper">
                        <button
                            type="button"
                            className="no-border navds-link"
                            onClick={() => {
                                setAapen(false)
                                amplitudeLukketPopup()
                            }}
                        >
                            <BodyShort as="span">Lukk</BodyShort>
                        </button>
                    </div>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default PersonvernLesMer
