import { BodyShort, Modal } from '@navikt/ds-react'
import React from 'react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import useSoknader from '../../hooks/useSoknader'
import { FlexjarSurvey } from '../flexjar/flexjar-survey'

interface GjenapneModalProps {
    aapen: boolean
    setAapen: (p: boolean) => void
    gjenAApne: () => void
}

export const GjenapneModal = (props: GjenapneModalProps) => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const { data: soknader } = useSoknader()

    if (!valgtSoknad || !soknader) return null

    const flexjarAlternativer = [
        'Jeg trengte mer tid og ville fortsette senere',
        'Jeg trykket feil',
        'Jeg fikk beskjed av veileder om å sende likevel',
        'Jeg fikk beskjed av arbeidsgiver om å sende søknaden',
        'Annet',
    ]

    return (
        <>
            <Modal
                onClose={() => {
                    props.setAapen(false)
                }}
                open={props.aapen}
                header={{ heading: 'Du er i ferd med å gjenåpne denne søknaden' }}
            >
                <Modal.Body>
                    <BodyShort spacing>
                        Vennligst gi tilbakemelding eller trykk på knappen nederst for å gjenåpne søknaden.
                    </BodyShort>

                    <FlexjarSurvey
                        surveySporsmal="Hvorfor ønsker du å gjenåpne denne søknaden?"
                        svarAlternativer={flexjarAlternativer}
                        onSubmit={() => {
                            if (valgtSoknad) props.gjenAApne
                            props.setAapen(false)
                        }}
                    ></FlexjarSurvey>
                </Modal.Body>
            </Modal>
        </>
    )
}
