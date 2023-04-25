import { Alert, Heading, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'
import { parserWithReplace } from '../../utils/html-react-parser-utils'

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
                onClose={() => setAapen(false)}
                open={aapen}
                aria-labelledby="utgått-soknad-modal"
                shouldCloseOnOverlayClick={false}
            >
                <Modal.Content>
                    <Heading size="medium" id="utgått-soknad-modal" level="1" className="mr-10 mt-1" spacing>
                        {tekst('soknad.teaser.utgaatt.popup.header')}
                    </Heading>
                    <Alert variant="info">{parserWithReplace(tekst('soknad.teaser.utgaatt.popup.innhold'))}</Alert>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default UtgaattSoknaderTeaser
