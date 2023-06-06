import { Button } from '@navikt/ds-react'
import React, { MouseEvent, useState } from 'react'

import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { RSSoknadstypeType } from '../../types/rs-types/rs-soknadstype'
import { parserWithReplace } from '../../utils/html-react-parser-utils'
import { FlexModal } from '../flex-modal'

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
            <Button variant="tertiary" onClick={handleAapen} className="px-0 text-left">
                {tekst('sykepengesoknad.soknad-intro.personvern-les-mer')}
            </Button>
            <FlexModal
                open={aapen}
                setOpen={setAapen}
                headerId="Personvern-modal"
                header={tekst('sykepengesoknad.soknad-intro.personvern-modal-header')}
                onClose={() => {
                    amplitudeLukketPopup()
                }}
                lukkKnapp={true}
            >
                {parserWithReplace(tekst('sykepengesoknad.soknad-intro.personvern-modal-innhold'))}
            </FlexModal>
        </>
    )
}

export default PersonvernLesMer
