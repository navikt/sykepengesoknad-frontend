import { BodyShort } from '@navikt/ds-react'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'
import { FlexModal } from '../flex-modal'

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
            <FlexModal
                open={aapen}
                lukkKnapp={true}
                headerId="utgått-soknad-modal"
                setOpen={setAapen}
                header={tekst('soknad.teaser.utgaatt.popup.header')}
            >
                <BodyShort spacing>Du får ikke åpnet denne søknaden fordi den ikke ble sendt innen fristen.</BodyShort>
                <BodyShort spacing>
                    Det kan gjøres unntak fra fristen dersom du ikke har vært i stand til å søke, eller dersom NAV har
                    gitt misvisende opplysninger. Hvis du mener dette gjelder deg, ber vi deg kontakte NAV.
                </BodyShort>
            </FlexModal>
        </>
    )
}

export default UtgaattSoknaderTeaser
