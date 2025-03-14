import { Alert, BodyShort, Button, Modal } from '@navikt/ds-react'
import React from 'react'

import { logEvent } from '../amplitude/amplitude'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'
import { ModalFooterMedLukk } from '../modal-footer-med-lukk'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { useKorriger } from '../../hooks/useKorriger'

import { EndreknappTekster } from './endreknapp-tekster'

const EndreModal = ({ aapen, setAapen }: { aapen: boolean; setAapen: (p: boolean) => void }) => {
    const { valgtSoknad } = useSoknadMedDetaljer()
    const { mutate: korrigerMutation, isPending: korrigerer, error: korrigeringError } = useKorriger()

    if (!valgtSoknad) return null
    const endreKnappTekst = EndreknappTekster['kvittering.knapp.endre']

    return (
        <>
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
                            <LenkeMedIkon
                                href="https://innboks.nav.no/s/beskjed-til-oss?category=Beskjed-sykepenger"
                                text={EndreknappTekster.sto}
                            />
                            .
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

export default EndreModal
