/* eslint-disable no-console */
import { Alert, Button, Heading, Modal } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import { TrashIcon } from '@navikt/aksel-icons'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { Kvittering, Sporsmal, svarverdiToKvittering } from '../../types/types'
import fetchMedRequestId, { AuthenticationError } from '../../utils/fetch'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import useSoknad from '../../hooks/useSoknad'
import { RouteParams } from '../../app'

interface SlettknappProps {
    sporsmal: Sporsmal
    kvittering: Kvittering
}

const Slettknapp = ({ sporsmal, kvittering }: SlettknappProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const queryClient = useQueryClient()

    const [vilSlette, setVilSlette] = useState<boolean>(false)
    const [sletter, setSletter] = useState<boolean>(false)
    const [feilmelding, setFeilmelding] = useState<string>()

    const nullstillFeilmelding = () => {
        setFeilmelding(undefined)
    }

    const slettKvittering = async () => {
        if (sletter) {
            return
        } else {
            setSletter(true)
        }

        const svar = sporsmal?.svarliste.svar.find(
            (svar) => svarverdiToKvittering(svar?.verdi).blobId === kvittering?.blobId,
        )

        try {
            await fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad?.id}/sporsmal/${sporsmal?.id}/svar/${svar?.id}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                },
            )
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
                setFeilmelding(tekst('opplasting_modal.slett.feilmelding'))
            }
            setSletter(false)
            return
        }
        await queryClient.invalidateQueries(['soknad', valgtSoknad!.id])

        setSletter(false)
        setVilSlette(false)
    }

    return (
        <>
            <Button
                variant="tertiary"
                icon={<TrashIcon />}
                iconPosition="right"
                onClick={(e) => {
                    setVilSlette(true)
                    nullstillFeilmelding()
                    e.preventDefault()
                }}
            >
                {tekst('opplasting_modal.slett')}
            </Button>

            <Modal onClose={() => setVilSlette(false)} open={vilSlette} aria-labelledby="slett-modal">
                <Modal.Content>
                    <Heading size="small" id="slett-modal" level="1" className="mr-10 mt-1" spacing>
                        {tekst('opplasting_modal.vil-slette')}
                    </Heading>
                    <Button
                        className="mt-4 block"
                        variant="danger"
                        loading={sletter}
                        type="button"
                        onClick={slettKvittering}
                    >
                        {tekst('opplasting_modal.vil-slette.ja')}
                    </Button>
                    <div aria-live="polite">
                        <Vis
                            hvis={feilmelding}
                            render={() => (
                                <Alert className="mt-4" variant="error">
                                    {feilmelding}
                                </Alert>
                            )}
                        />
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default Slettknapp
