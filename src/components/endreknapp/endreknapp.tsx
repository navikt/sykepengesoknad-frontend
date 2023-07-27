import { Alert, BodyShort, Button } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { logEvent } from '../amplitude/amplitude'
import useSoknad from '../../hooks/useSoknad'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'
import { FlexModal } from '../flex-modal'
import { useKorriger } from '../../hooks/useKorriger'
import Vis from '../vis'

import { EndreknappTekster } from './endreknapp-tekster'

const Endreknapp = () => {
    const router = useRouter()
    const { id } = router.query as { id: string; stegId: string }
    const { data: valgtSoknad } = useSoknad(id)
    const { mutate: korrigerMutation, isLoading: korrigerer, error: korrigeringError } = useKorriger()

    const [aapen, setAapen] = useState<boolean>(false)

    const endreKnappTekst = EndreknappTekster['kvittering.knapp.endre']
    const endreSøknadPopup = 'Endre søknad popup'
    if (!valgtSoknad) return null

    const ModalInnhold = () => {
        if (valgtSoknad.korrigeringsfristUtlopt) {
            return (
                <BodyShort spacing>
                    {EndreknappTekster.utlopt}
                    <LenkeMedIkon href="https://www.nav.no/skriv-til-oss" text={EndreknappTekster.sto} />.
                </BodyShort>
            )
        }
        return (
            <>
                <BodyShort spacing>{EndreknappTekster['endre.modal.info']}</BodyShort>
                <Button
                    variant="primary"
                    className="mt-4"
                    loading={korrigerer}
                    onClick={(e) => {
                        e.preventDefault()
                        logEvent('knapp klikket', {
                            tekst: EndreknappTekster['endre.modal.bekreft'],
                            soknadstype: valgtSoknad.soknadstype,
                            component: endreSøknadPopup,
                        })
                        if (valgtSoknad.korrigeringsfristUtlopt) {
                            setAapen(false)
                            return
                        }
                        korrigerMutation({
                            id: id,
                            onSuccess: () => {
                                setAapen(false)
                            },
                        })
                    }}
                >
                    {EndreknappTekster['endre.modal.bekreft']}
                </Button>
                <Vis
                    hvis={korrigeringError}
                    render={() => <Alert variant="error">Beklager, klarte ikke endre søknaden din</Alert>}
                />
            </>
        )
    }

    return (
        <>
            <Button
                variant="tertiary"
                className="-ml-5 mt-4 block"
                onClick={() => {
                    logEvent('knapp klikket', {
                        tekst: endreKnappTekst,
                    })
                    setAapen(true)
                }}
            >
                {endreKnappTekst}
            </Button>
            <FlexModal
                open={aapen}
                setOpen={setAapen}
                headerId="endre-modal"
                header={endreKnappTekst}
                lukkKnapp={valgtSoknad.korrigeringsfristUtlopt}
                onClose={() => {
                    logEvent('modal lukket', {
                        component: endreSøknadPopup,
                        soknadstype: valgtSoknad.soknadstype,
                    })
                }}
            >
                <ModalInnhold />
            </FlexModal>
        </>
    )
}

export default Endreknapp
