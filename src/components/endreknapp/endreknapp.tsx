import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

import { useAppStore } from '../../data/stores/app-store'
import { Soknad } from '../../types/types'
import { FetchError, fetchJsonMedRequestId } from '../../utils/fetch'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { urlTilSoknad } from '../soknad/soknad-link'

const Endreknapp = () => {
    const { valgtSoknad, soknader, setSoknader, setFeilmeldingTekst } = useAppStore()
    const history = useHistory()
    const { logEvent } = useAmplitudeInstance()
    const [aapen, setAapen] = useState<boolean>(false)

    const [korrigerer, setKorrigerer] = useState<boolean>(false)
    const endreKnappTekst = tekst('kvittering.knapp.endre')

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
                }
            )
        } catch (e: any) {
            if (e instanceof FetchError) {
                setFeilmeldingTekst(tekst('kvittering.korrigering.feilet'))
                logger.error(e)
            }
            return
        } finally {
            setFeilmeldingTekst('')
        }

        const soknad = new Soknad(data)
        if (!soknader.find((sok) => sok.id === soknad.id)) {
            soknader.push(soknad)
            setSoknader(soknader)
        }
        setAapen(false)
        history.push(urlTilSoknad(soknad))
    }

    const endreSøknadPopup = 'Endre søknad popup'

    return (
        <>
            <Button
                variant="tertiary"
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
                className="modal__endre_popup"
                onClose={() => {
                    setAapen(false)
                    logEvent('modal lukket', {
                        component: endreSøknadPopup,
                        soknadstype: valgtSoknad?.soknadstype,
                    })
                }}
                open={aapen}
                aria-labelledby="modal-tittel"
            >
                <Modal.Content>
                    <Heading size="small" level="1" id="modal-tittel" spacing>
                        {endreKnappTekst}
                    </Heading>

                    <BodyShort>{tekst('endre.modal.info')}</BodyShort>

                    <Button
                        size="small"
                        variant="primary"
                        className="midtstilt-knapp"
                        onClick={(e) => {
                            e.preventDefault()
                            logEvent('knapp klikket', {
                                tekst: tekst('endre.modal.bekreft'),
                                soknadstype: valgtSoknad?.soknadstype,
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
