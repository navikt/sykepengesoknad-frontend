/* eslint-disable no-console */
import { Alert, Button, Heading, Modal } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
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
    setOpenModal: (arg0: boolean) => void
    updateFilliste?: () => void
}

const Slettknapp = ({ sporsmal, kvittering, setOpenModal, updateFilliste }: SlettknappProps) => {
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

        const idx = sporsmal!.svarliste.svar.findIndex(
            (svar) => svarverdiToKvittering(svar?.verdi).blobId === kvittering?.blobId,
        )
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

        sporsmal.svarliste.svar.splice(idx, 1)
        valgtSoknad!.sporsmal[valgtSoknad!.sporsmal.findIndex((spm) => spm.id === sporsmal.id)] = sporsmal
        queryClient.setQueriesData(['soknad', valgtSoknad!.id], valgtSoknad)

        setOpenModal(false)
        setSletter(false)
        setVilSlette(false)
        if (updateFilliste) {
            updateFilliste()
        }
    }

    return (
        <>
            <Vis
                hvis={updateFilliste}
                render={() => (
                    <button
                        type="button"
                        className="slette-kvittering"
                        aria-label={tekst('opplasting_modal.slett')}
                        onClick={() => {
                            setVilSlette(true)
                            nullstillFeilmelding()
                        }}
                        title={tekst('opplasting_modal.slett')}
                    >
                        <img src="/syk/sykepengesoknad/static/slettknapp.svg" alt="" />
                    </button>
                )}
            />

            <Vis
                hvis={!updateFilliste}
                render={() => (
                    <Button
                        variant="danger"
                        type="button"
                        className="lagre-kvittering"
                        onClick={() => {
                            setVilSlette(true)
                            nullstillFeilmelding()
                        }}
                    >
                        {tekst('opplasting_modal.slett')}
                    </Button>
                )}
            />

            <Modal
                className="modal__teaser_popup"
                onClose={() => setVilSlette(false)}
                open={vilSlette}
                closeButton={false}
                aria-labelledby="modal-tittel"
            >
                <Modal.Content className="bekreft-dialog">
                    <Heading spacing size="small" level="1" id="modal-tittel">
                        {tekst('opplasting_modal.vil-slette')}
                    </Heading>
                    <Button variant="danger" loading={sletter} type="button" onClick={slettKvittering}>
                        {tekst('opplasting_modal.vil-slette.ja')}
                    </Button>
                    <div aria-live="polite">
                        <Vis hvis={feilmelding} render={() => <Alert variant="error">{feilmelding}</Alert>} />
                    </div>
                    <Button
                        variant="secondary"
                        className="lenkeknapp"
                        type="button"
                        onClick={() => setVilSlette(false)}
                    >
                        {tekst('opplasting_modal.vil-slette.lukk')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default Slettknapp
