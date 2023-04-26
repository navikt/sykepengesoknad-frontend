import { BodyLong, Heading, Label, Modal, ReadMore } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import { getLedetekst, tekst } from '../../utils/tekster'

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

            <Modal
                onClose={() => setAapen(false)}
                open={aapen}
                aria-labelledby="fremtidige-soknader-modal"
                shouldCloseOnOverlayClick={true}
            >
                <Modal.Content>
                    <Heading size="small" id="fremtidige-soknader-modal" level="1" className="mr-10 mt-1" spacing>
                        {tekst('soknader.teaser.fremtidig.modal.tittel')}
                    </Heading>
                    <BodyLong spacing>
                        {getLedetekst(tekst('soknader.teaser.fremtidig.modal.tekst'), {
                            '%DATO%': tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day')),
                        })}
                    </BodyLong>
                    <BodyLong spacing>{tekst('soknader.teaser.fremtidig.modal.tekst2')}</BodyLong>

                    <ReadMore header={<Label>{tekst('soknader.teaser.fremtidig.modal.utvidbar.tittel')}</Label>}>
                        <BodyLong spacing>{tekst('soknader.teaser.fremtidig.modal.utvidbar.tekst')}</BodyLong>
                    </ReadMore>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default FremtidigeSoknaderTeaser
