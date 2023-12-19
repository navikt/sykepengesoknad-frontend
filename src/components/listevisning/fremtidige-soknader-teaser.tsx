import { BodyShort, Modal, ReadMore } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import { getLedetekst, tekst } from '../../utils/tekster'
import { ModalFooterMedLukk } from '../modal-footer-med-lukk'

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
                open={aapen}
                onClose={() => {
                    setAapen(false)
                }}
                header={{ heading: tekst('soknader.teaser.fremtidig.modal.tittel'), closeButton: true }}
            >
                <Modal.Body>
                    <BodyShort spacing>
                        {getLedetekst(tekst('soknader.teaser.fremtidig.modal.tekst'), {
                            '%DATO%': tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day')),
                        })}
                    </BodyShort>
                    <BodyShort spacing>{tekst('soknader.teaser.fremtidig.modal.tekst2')}</BodyShort>

                    <ReadMore
                        header={
                            <BodyShort weight="semibold">
                                {tekst('soknader.teaser.fremtidig.modal.utvidbar.tittel')}
                            </BodyShort>
                        }
                    >
                        <BodyShort spacing>{tekst('soknader.teaser.fremtidig.modal.utvidbar.tekst')}</BodyShort>
                    </ReadMore>
                </Modal.Body>
                <ModalFooterMedLukk setOpen={setAapen} />
            </Modal>
        </>
    )
}

export default FremtidigeSoknaderTeaser
