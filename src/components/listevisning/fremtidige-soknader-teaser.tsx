import { BodyLong, Modal, ReadMore } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { ClockDashedIcon } from '@navikt/aksel-icons'

import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
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
                header={{
                    heading: 'Du er litt tidlig ute',
                    closeButton: true,
                    icon: <ClockDashedIcon aria-hidden={true} />,
                }}
            >
                <Modal.Body>
                    <BodyLong spacing>
                        {`Du må vente med å søke om sykepenger til perioden er over ${tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day'))}. Vi sender deg en melding når søknaden er klar til å fylles ut.`}
                    </BodyLong>

                    <ReadMore header="Hvorfor kan jeg ikke søke nå?">
                        <BodyLong spacing>
                            Spørsmålene i søknaden handler om situasjonen din den siste perioden. Nav bruker svarene
                            dine til å beregne hvor mye sykepenger du kan få utbetalt. Derfor må du vente til perioden
                            er over med å fylle ut søknaden.
                        </BodyLong>
                    </ReadMore>
                </Modal.Body>
                <ModalFooterMedLukk setOpen={setAapen} />
            </Modal>
        </>
    )
}

export default FremtidigeSoknaderTeaser
