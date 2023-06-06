import { BodyShort, Button } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { useAppStore } from '../../data/stores/app-store'
import { Soknad } from '../../types/types'
import { AuthenticationError, fetchJsonMedRequestId } from '../../utils/fetch'
import { logEvent } from '../amplitude/amplitude'
import { urlTilSoknad } from '../soknad/soknad-link'
import useSoknad from '../../hooks/useSoknad'
import { RouteParams } from '../../app'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'
import { FlexModal } from '../flex-modal'

import { EndreknappTekster } from './endreknapp-tekster'

const Endreknapp = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { setFeilmeldingTekst } = useAppStore()
    const [aapen, setAapen] = useState<boolean>(false)
    const [korrigerer, setKorrigerer] = useState<boolean>(false)

    const endreKnappTekst = EndreknappTekster['kvittering.knapp.endre']
    const endreSøknadPopup = 'Endre søknad popup'
    if (!valgtSoknad) return null
    const korriger = async () => {
        if (korrigerer) {
            return
        }
        setKorrigerer(true)
        setFeilmeldingTekst('')

        let data
        try {
            data = await fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/korriger`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                setFeilmeldingTekst(EndreknappTekster['kvittering.korrigering.feilet'])
                logger.warn(e)
            }
            return
        } finally {
            setFeilmeldingTekst('')
        }

        const soknad = new Soknad(data)
        queryClient.setQueriesData(['soknad', soknad.id], soknad)
        queryClient.invalidateQueries(['soknader'])
        setAapen(false)
        navigate(urlTilSoknad(soknad))
    }

    const ModalInnhold = () => {
        if (valgtSoknad.korrigeringsfristUtlopt) {
            return (
                <BodyShort spacing>
                    {EndreknappTekster.utlopt}
                    <LenkeMedIkon href="https://www.nav.no/skriv-til-oss" text={EndreknappTekster.sto} />
                </BodyShort>
            )
        }
        return (
            <>
                <BodyShort spacing>{EndreknappTekster['endre.modal.info']}</BodyShort>
                <Button
                    variant="primary"
                    className="mt-4"
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
                        korriger().catch((e: Error) => logger.error(e))
                    }}
                >
                    {EndreknappTekster['endre.modal.bekreft']}
                </Button>
            </>
        )
    }

    return (
        <>
            <Button
                variant="tertiary"
                className="mt-4 block px-0"
                loading={korrigerer}
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
