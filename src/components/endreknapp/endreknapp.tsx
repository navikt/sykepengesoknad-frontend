import { Alert, BodyShort, Button } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { logEvent } from '../amplitude/amplitude'
import useSoknad from '../../hooks/useSoknad'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'
import { FlexModal } from '../flex-modal'
import { useKorriger } from '../../hooks/useKorriger'
import { Soknad } from '../../types/types'

import { EndreknappTekster } from './endreknapp-tekster'

const Endreknapp = () => {
    const router = useRouter()
    const { id } = router.query as { id: string; stegId: string }
    const { data: valgtSoknad } = useSoknad(id)

    const [aapen, setAapen] = useState<boolean>(false)

    const endreKnappTekst = EndreknappTekster['kvittering.knapp.endre']
    if (!valgtSoknad) return null

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
                        component: 'Endre søknad popup',
                        soknadstype: valgtSoknad.soknadstype,
                    })
                }}
            >
                <ModalInnhold valgtSoknad={valgtSoknad} setAapen={setAapen} />
            </FlexModal>
        </>
    )
}

const ModalInnhold = ({
    valgtSoknad,
    setAapen,
}: {
    valgtSoknad: Soknad
    setAapen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { mutate: korrigerMutation, isLoading: korrigerer, error: korrigeringError } = useKorriger()

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

            {korrigeringError && <Alert variant="error">Beklager, klarte ikke endre søknaden din</Alert>}
        </>
    )
}

export default Endreknapp
