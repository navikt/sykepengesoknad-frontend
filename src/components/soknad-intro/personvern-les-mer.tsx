import { Button, Heading, Modal } from '@navikt/ds-react'
import React, { MouseEvent, useState } from 'react'

import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { RSSoknadstypeType } from '../../types/rs-types/rs-soknadstype'
import { parserWithReplace } from '../../utils/html-react-parser-utils'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>

export interface PersonvernLesMerProps {
    soknadstype: RSSoknadstypeType
}

const PersonvernLesMer = ({ soknadstype }: PersonvernLesMerProps) => {
    const [aapen, setAapen] = useState<boolean>(false)

    const handleAapen = (event: Event) => {
        event.preventDefault()
        setAapen(true)
        logEvent('knapp klikket', {
            tekst: tekst('sykepengesoknad.soknad-intro.personvern-les-mer'),
            soknadstype: soknadstype,
        })
    }
    const amplitudeLukketPopup = () => {
        logEvent('modal lukket', {
            component: tekst('sykepengesoknad.soknad-intro.personvern-les-mer'),
        })
    }

    return (
        <>
            <Button variant="tertiary" onClick={handleAapen} className={'px-0 text-left'}>
                {tekst('sykepengesoknad.soknad-intro.personvern-les-mer')}
            </Button>
            <Modal
                open={aapen}
                aria-labelledby="Personvern-modal"
                onClose={() => {
                    setAapen(false)
                    amplitudeLukketPopup()
                }}
            >
                <Modal.Content>
                    <Heading size="medium" id="Personvern-modal" level="1" spacing>
                        {tekst('sykepengesoknad.soknad-intro.personvern-modal-header')}
                    </Heading>
                    {parserWithReplace(tekst('sykepengesoknad.soknad-intro.personvern-modal-innhold'))}
                </Modal.Content>
            </Modal>
        </>
    )
}

export default PersonvernLesMer
