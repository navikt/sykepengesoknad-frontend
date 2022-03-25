import './personvern-les-mer.less'

import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { MouseEvent, useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>

const PersonvernLesMer = () => {
    const [ aapen, setAapen ] = useState<boolean>(false)
    const { valgtSoknad } = useAppStore()

    if (!valgtSoknad) {
        return null
    }

    const handleAapen = (event: Event) => {
        event.preventDefault()
        setAapen(true)
    }

    return (
        <div className="personvern-les-mer">
            <Button variant="tertiary" onClick={handleAapen}>
                {tekst('sykepengesoknad.soknad-intro.personvern-les-mer')}
            </Button>
            <Modal className="personvern-modal" onClose={() => setAapen(false)}
                open={aapen}
            >
                <Modal.Content>
                    <Heading size="medium" level="3" className="modal__tittel">
                        {tekst('sykepengesoknad.soknad-intro.personvern-modal-header')}
                    </Heading>
                    {parser(tekst('sykepengesoknad.soknad-intro.personvern-modal-innhold'))}

                    <div className="lukk-wrapper">
                        <button type="button" className="no-border navds-link" onClick={() => setAapen(false)}>
                            <BodyShort as="span">Lukk</BodyShort>
                        </button>
                    </div>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default PersonvernLesMer
