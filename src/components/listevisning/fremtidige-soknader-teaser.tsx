import { BodyShort, Label, ReadMore } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import { getLedetekst, tekst } from '../../utils/tekster'
import { FlexModal } from '../flex-modal'

import { SykepengesoknadTeaserProps } from './teaser-util'
import { ListevisningLenkepanel } from './listevisning-lenkepanel'

const FremtidigeSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
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
                headerId="fremtidige-soknader-modal"
                setOpen={setAapen}
                header={tekst('soknader.teaser.fremtidig.modal.tittel')}
            >
                <BodyShort spacing>
                    {getLedetekst(tekst('soknader.teaser.fremtidig.modal.tekst'), {
                        '%DATO%': tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day')),
                    })}
                </BodyShort>
                <BodyShort spacing>{tekst('soknader.teaser.fremtidig.modal.tekst2')}</BodyShort>

                <ReadMore header={<Label>{tekst('soknader.teaser.fremtidig.modal.utvidbar.tittel')}</Label>}>
                    <BodyShort spacing>{tekst('soknader.teaser.fremtidig.modal.utvidbar.tekst')}</BodyShort>
                </ReadMore>
            </FlexModal>
        </>
    )
}

export default FremtidigeSoknaderTeaser
