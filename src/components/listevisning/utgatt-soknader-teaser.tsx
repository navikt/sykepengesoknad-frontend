import { BodyShort, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'
import { ModalFooterMedLukk } from '../modal-footer-med-lukk'

import { SykepengesoknadTeaserProps } from './teaser-util'
import { ListevisningLenkepanel } from './listevisning-lenkepanel'

const UtgaattSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const [aapen, setAapen] = useState<boolean>(false)

    return (
        <>
            <ListevisningLenkepanel
                soknad={soknad}
                onClick={() => {
                    setAapen(!aapen)
                }}
            />
            <Modal
                open={aapen}
                onClose={() => {
                    setAapen(false)
                }}
                header={{ heading: tekst('soknad.teaser.utgaatt.popup.header') }}
            >
                <Modal.Body>
                    <BodyShort spacing>
                        Du får ikke åpnet denne søknaden fordi den ikke ble sendt innen fristen.
                    </BodyShort>
                    <BodyShort spacing>
                        Det kan gjøres unntak fra fristen dersom du ikke har vært i stand til å søke, eller dersom NAV
                        har gitt misvisende opplysninger. Hvis du mener dette gjelder deg, ber vi deg kontakte NAV.
                    </BodyShort>
                </Modal.Body>
                <ModalFooterMedLukk setOpen={setAapen} />
            </Modal>
        </>
    )
}

export default UtgaattSoknaderTeaser
