import { Alert, BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { tekst } from '../../utils/tekster'
import { parserWithReplace } from '../../utils/html-react-parser-utils'
import { useEttersendNav } from '../../hooks/useEttersendNav'
import Vis from '../vis'
import { useEttersendArbeidsgiver } from '../../hooks/useEttersendArbeidsgiver'

interface EttersendingProps {
    gjelder: 'nav' | 'arbeidsgiver'
}

const Ettersending = ({ gjelder }: EttersendingProps) => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { mutate: ettersendNavMutation, isLoading: ettersenderNav, error: ettersendNavError } = useEttersendNav()
    const {
        mutate: ettersendArbeidsgiverMutation,
        isLoading: ettersenderArbeidsgiver,
        error: ettersendArbeidsgiverError,
    } = useEttersendArbeidsgiver()

    const [vilEttersende, setVilEttersende] = useState<boolean>(false)
    const knappeTekst = tekst(`kvittering.knapp.send-${gjelder}` as any)

    const hentTekst = (text: string) => {
        const tilSuffix = gjelder === 'nav' ? '-nav' : '-arbeidsgiver'
        return tekst(`${text}${tilSuffix}` as any)
    }

    const ettersend = () => {
        if (ettersenderNav || ettersenderArbeidsgiver) {
            return
        }

        if (gjelder === 'nav') {
            ettersendNavMutation({
                id: id,
                onSuccess: () => {
                    setVilEttersende(false)
                },
            })
        } else if (gjelder === 'arbeidsgiver') {
            ettersendArbeidsgiverMutation({
                id: id,
                onSuccess: () => {
                    setVilEttersende(false)
                },
            })
        }
    }

    return (
        <>
            <Button
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
                aria-labelledby="ettersending-modal"
                className="w-96"
            >
                <Modal.Body>
                    <Heading size="small" id="ettersending-modal" level="1" className="mr-10 mt-1" spacing>
                        {knappeTekst}
                    </Heading>
                    <BodyShort spacing>{parserWithReplace(hentTekst('kvittering.info.send-til'))}</BodyShort>
                    <Vis
                        hvis={ettersendNavError || ettersendArbeidsgiverError}
                        render={() => <Alert variant="error">Beklager, klarte ikke ettersende søknaden din</Alert>}
                    />
                    <Button
                        size="small"
                        variant="primary"
                        loading={ettersenderNav || ettersenderArbeidsgiver}
                        onClick={ettersend}
                        className="ml-auto mr-auto mt-8 block"
                    >
                        {hentTekst('kvittering.knapp.bekreft.send-til')}
                    </Button>
                    <Button
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
