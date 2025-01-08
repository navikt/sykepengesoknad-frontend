import { Alert, BodyShort, Button, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'
import { tekstMedHtml } from '../../utils/html-react-parser-utils'
import { useEttersendArbeidsgiver } from '../../hooks/useEttersendArbeidsgiver'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

interface EttersendingProps {
    gjelder: 'arbeidsgiver'
}

const Ettersending = ({ gjelder }: EttersendingProps) => {
    const { soknadId } = useSoknadMedDetaljer()
    const {
        mutate: ettersendArbeidsgiverMutation,
        isPending: ettersenderArbeidsgiver,
        error: ettersendArbeidsgiverError,
    } = useEttersendArbeidsgiver()

    const [vilEttersende, setVilEttersende] = useState<boolean>(false)
    if (!soknadId) {
        return null
    }
    const knappeTekst = tekst(`kvittering.knapp.send-${gjelder}` as any)

    const ettersend = () => {
        if (ettersenderArbeidsgiver) {
            return
        }

        if (gjelder === 'arbeidsgiver') {
            ettersendArbeidsgiverMutation({
                id: soknadId,
                onSuccess: () => {
                    setVilEttersende(false)
                },
            })
        }
    }

    return (
        <>
            <Button
                type="button"
                variant="tertiary"
                className="-ml-5 mt-4 block"
                onClick={() => {
                    setVilEttersende(true)
                }}
            >
                {knappeTekst}
            </Button>

            <Modal
                onClose={() => setVilEttersende(false)}
                open={vilEttersende}
                className="w-96"
                header={{ heading: knappeTekst, size: 'small' }}
            >
                <Modal.Body>
                    <BodyShort spacing>{tekstMedHtml(tekst('kvittering.info.send-til-arbeidsgiver'))}</BodyShort>
                    {ettersendArbeidsgiverError && (
                        <Alert variant="error">Beklager, klarte ikke ettersende søknaden din</Alert>
                    )}
                    <Button
                        type="button"
                        size="small"
                        variant="primary"
                        loading={ettersenderArbeidsgiver}
                        onClick={ettersend}
                        className="ml-auto mr-auto mt-8 block"
                    >
                        {tekst('kvittering.knapp.bekreft.send-til-arbeidsgiver')}
                    </Button>
                    <Button
                        type="button"
                        className="ml-auto mr-auto mt-4 block"
                        variant="tertiary"
                        onClick={() => setVilEttersende(false)}
                    >
                        {tekst('kvittering.knapp.angre')}
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Ettersending
