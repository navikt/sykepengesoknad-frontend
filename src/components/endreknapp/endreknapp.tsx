import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { useAppStore } from '../../data/stores/app-store'
import { Soknad } from '../../types/types'
import { AuthenticationError, fetchJsonMedRequestId } from '../../utils/fetch'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { urlTilSoknad } from '../soknad/soknad-link'
import useSoknad from '../../hooks/useSoknad'
import { RouteParams } from '../../app'

const Endreknapp = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { setFeilmeldingTekst } = useAppStore()
    const [aapen, setAapen] = useState<boolean>(false)
    const [korrigerer, setKorrigerer] = useState<boolean>(false)

    const endreKnappTekst = tekst('kvittering.knapp.endre')
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
                setFeilmeldingTekst(tekst('kvittering.korrigering.feilet'))
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
            <Modal
                open={aapen}
                aria-labelledby="endre-modal"
                onClose={() => {
                    setAapen(false)
                    logEvent('modal lukket', {
                        component: endreSøknadPopup,
                        soknadstype: valgtSoknad.soknadstype,
                    })
                }}
            >
                <Modal.Content>
                    <Heading size="small" level="1" id="endre-modal" className="mr-10 mt-1" spacing>
                        {endreKnappTekst}
                    </Heading>

                    <BodyShort spacing>{tekst('endre.modal.info')}</BodyShort>

                    <Button
                        size="small"
                        variant="primary"
                        className="ml-auto mr-auto block"
                        onClick={(e) => {
                            e.preventDefault()
                            logEvent('knapp klikket', {
                                tekst: tekst('endre.modal.bekreft'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: endreSøknadPopup,
                            })
                            korriger().catch((e: Error) => logger.error(e))
                        }}
                    >
                        {tekst('endre.modal.bekreft')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default Endreknapp
