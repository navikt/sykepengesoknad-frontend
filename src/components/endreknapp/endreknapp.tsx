import { Alert, BodyShort, Button, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

import { logEvent } from '../amplitude/amplitude'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'
import { useKorriger } from '../../hooks/useKorriger'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { ModalFooterMedLukk } from '../modal-footer-med-lukk'

import { EndreknappTekster } from './endreknapp-tekster'

const Endreknapp = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()
    const { mutate: korrigerMutation, isLoading: korrigerer, error: korrigeringError } = useKorriger()

    const [aapen, setAapen] = useState<boolean>(false)

    const endreKnappTekst = EndreknappTekster['kvittering.knapp.endre']
    if (!valgtSoknad) return null

    return (
        <>
            <Button
                type="button"
                variant="secondary"
                className="mt-4 block"
                onClick={() => {
                    logEvent('knapp klikket', {
                        tekst: endreKnappTekst,
                    })
                    setAapen(true)
                }}
            >
                {endreKnappTekst}
            </Button>
            <Modal
                open={aapen}
                header={{ heading: endreKnappTekst, closeButton: !valgtSoknad.korrigeringsfristUtlopt }}
                onClose={() => {
                    logEvent('modal lukket', {
                        component: 'Endre søknad popup',
                        soknadstype: valgtSoknad.soknadstype,
                    })
                    setAapen(false)
                }}
            >
                <Modal.Body>
                    {valgtSoknad.korrigeringsfristUtlopt && (
                        <BodyShort spacing>
                            {EndreknappTekster.utlopt}
                            <LenkeMedIkon href="https://www.nav.no/skriv-til-oss" text={EndreknappTekster.sto} />.
                        </BodyShort>
                    )}
                    {!valgtSoknad.korrigeringsfristUtlopt && (
                        <>
                            <BodyShort spacing>{EndreknappTekster['endre.modal.info']}</BodyShort>

                            {korrigeringError && (
                                <Alert variant="error">Beklager, klarte ikke endre søknaden din</Alert>
                            )}
                        </>
                    )}
                </Modal.Body>
                {!valgtSoknad.korrigeringsfristUtlopt && (
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            type="button"
                            className="mt-4"
                            loading={korrigerer}
                            onClick={(e) => {
                                e.preventDefault()
                                logEvent('knapp klikket', {
                                    tekst: EndreknappTekster['endre.modal.bekreft'],
                                    soknadstype: valgtSoknad.soknadstype,
                                    component: 'Endre søknad popup',
                                })
                                korrigerMutation({
                                    id: valgtSoknad.id,
                                    onSuccess: () => {
                                        setAapen(false)
                                    },
                                })
                            }}
                        >
                            {EndreknappTekster['endre.modal.bekreft']}
                        </Button>
                    </Modal.Footer>
                )}
                {valgtSoknad.korrigeringsfristUtlopt && <ModalFooterMedLukk setOpen={setAapen} />}
            </Modal>
        </>
    )
}

export default Endreknapp
