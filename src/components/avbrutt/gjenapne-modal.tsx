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
                    <BodyShort>
                        Vennligst gi tilbakemelding eller trykk på knappen nederst for å gjenåpne søknaden.
                    </BodyShort>
                </Modal.Body>
                <div className="flex flex-row-reverse flex-wrap gap-4 p-6 pt-4 -mt-12">
                    <FlexjarSurvey
                        feedbackId="sykpengesoknad-gjenapne-survey"
                        surveySporsmal="Hvorfor ønsker du å gjenåpne denne søknaden?"
                        svarAlternativer={flexjarAlternativer}
                        onSubmit={() => {
                            if (valgtSoknad) props.gjenAApne()
                        }}
                    ></FlexjarSurvey>
                </div>
            </Modal>
        </>
    )
}
