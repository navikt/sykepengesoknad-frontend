import { Alert, BodyLong, Button } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { EndringUtenEndringModal } from '../sporsmal/endring-uten-endring/endring-uten-endring-modal'
import useSoknad from '../../hooks/useSoknad'
import useSoknader from '../../hooks/useSoknader'
import { FlexModal } from '../flex-modal'

import { avbrytSoknad } from './avbryt-soknad'

const AvbrytKorrigering = () => {
    const router = useRouter()
    const { id, stegId } = router.query as { id: string; stegId: string }
    const { data: valgtSoknad } = useSoknad(id)
    const [aapen, setAapen] = useState<boolean>(false)

    if (!valgtSoknad) return null

    return (
        <>
            <Button
                variant="tertiary"
                className="-ml-5 text-surface-danger hover:bg-red-50 hover:text-surface-danger"
                onClick={(e) => {
                    logEvent('modal åpnet', {
                        component: tekst('avbryt.korrigering.knapp'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId!,
                    })
                    setAapen(true)
                    e.preventDefault()
                }}
            >
                {tekst('avbryt.korrigering.knapp')}
            </Button>
            <EndringUtenEndringModal aapen={aapen} setAapen={setAapen} />
        </>
    )
}

const AvbrytSoknadModal = () => {
    const router = useRouter()
    const { id, stegId } = router.query as { id: string; stegId: string }
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const queryClient = useQueryClient()

    const [aapen, setAapen] = useState<boolean>(false)
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>()

    if (!valgtSoknad || !soknader) {
        return null
    }
    if (valgtSoknad.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
        return <AvbrytKorrigering />
    }

    return (
        <>
            <Button
                variant="tertiary"
                className="-ml-5 text-surface-danger hover:bg-red-50 hover:text-surface-danger"
                data-cy="avbryt-soknad"
                onClick={(e) => {
                    logEvent('modal åpnet', {
                        component: tekst('avbryt.popup.tittel'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId!,
                    })
                    setAapen(true)
                    e.preventDefault()
                }}
            >
                {tekst('avbryt.popup.tittel')}
            </Button>
            <FlexModal
                open={aapen}
                setOpen={setAapen}
                headerId="avbryt-soknad"
                header={tekst('avbryt.popup.tittel')}
                onClose={() => {
                    setFeilmeldingTekst(undefined)

                    logEvent('modal lukket', {
                        component: tekst('avbryt.popup.tittel'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId!,
                    })
                }}
            >
                <BodyLong spacing size="medium">
                    {tekst('avbryt.popup.sporsmal')}
                </BodyLong>

                <Button
                    variant="danger"
                    className="mr-4 mt-4"
                    onClick={() => {
                        setFeilmeldingTekst(undefined)

                        logEvent('knapp klikket', {
                            tekst: tekst('avbryt.popup.ja'),
                            soknadstype: valgtSoknad.soknadstype,
                            component: tekst('avbryt.popup.tittel'),
                            steg: stegId!,
                        })
                        avbrytSoknad({
                            valgtSoknad: valgtSoknad,
                            soknader: soknader,
                            queryClient: queryClient,
                            router: router,
                            setFeilmeldingTekst: setFeilmeldingTekst,
                        })
                    }}
                >
                    {tekst('avbryt.popup.ja')}
                </Button>
                <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => {
                        setFeilmeldingTekst(undefined)

                        setAapen(false)
                        logEvent('knapp klikket', {
                            tekst: tekst('avbryt.popup.nei'),
                            soknadstype: valgtSoknad.soknadstype,
                            component: tekst('avbryt.popup.tittel'),
                            steg: stegId!,
                        })
                    }}
                >
                    {tekst('avbryt.popup.nei')}
                </Button>
                {feilmeldingTekst && (
                    <Alert variant="error" className="mt-4">
                        {feilmeldingTekst}
                    </Alert>
                )}
            </FlexModal>
        </>
    )
}

export default AvbrytSoknadModal
