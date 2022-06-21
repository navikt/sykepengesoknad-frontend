import { Alert, Button, Heading, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

import { redirectTilLoginHvis401 } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { Kvittering, Sporsmal, svarverdiToKvittering } from '../../types/types'
import { backendApp, flexGatewayRoot } from '../../utils/environment'
import fetcher from '../../utils/fetcher'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

interface SlettknappProps {
    sporsmal: Sporsmal
    kvittering: Kvittering
    update?: () => void
}

const Slettknapp = ({ sporsmal, kvittering, update }: SlettknappProps) => {
    const {
        valgtSoknad,
        setValgtSoknad,
        feilmeldingTekst,
        setFeilmeldingTekst,
        setOpenModal,
    } = useAppStore()
    const [vilSlette, setVilSlette] = useState<boolean>(false)
    const [sletter, setSletter] = useState<boolean>(false)

    const nullstillFeilmelding = () => {
        setFeilmeldingTekst('')
    }

    const slettKvittering = async () => {
        let feilVedSletting = false
        try {
            if (sletter) return
            setSletter(true)

            const idx = sporsmal!.svarliste.svar.findIndex(
                (svar) =>
                    svarverdiToKvittering(svar?.verdi).blobId ===
                    kvittering?.blobId
            )
            const svar = sporsmal?.svarliste.svar.find(
                (svar) =>
                    svarverdiToKvittering(svar?.verdi).blobId ===
                    kvittering?.blobId
            )

            const res = await fetcher(
                `${flexGatewayRoot()}/${backendApp()}/api/soknader/${
                    valgtSoknad?.id
                }/sporsmal/${sporsmal?.id}/svar/${svar?.id}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            )

            if (res.ok) {
                sporsmal.svarliste.svar.splice(idx, 1)
                valgtSoknad!.sporsmal[
                    valgtSoknad!.sporsmal.findIndex(
                        (spm) => spm.id === sporsmal.id
                    )
                ] = sporsmal
                setValgtSoknad(valgtSoknad)
                setOpenModal(false)
            } else if (redirectTilLoginHvis401(res)) {
                return null
            } else {
                feilVedSletting = true
                setFeilmeldingTekst(tekst('opplasting_modal.slett.feilmelding'))
                return null
            }
        } finally {
            setSletter(false)
            setVilSlette(feilVedSletting)
            if (update) update()
        }
    }

    return (
        <>
            <Vis
                hvis={update}
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
                        <img
                            src="/syk/sykepengesoknad/static/slettknapp.svg"
                            alt=""
                        />
                    </button>
                )}
            />

            <Vis
                hvis={!update}
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
            >
                <Modal.Content className="bekreft-dialog">
                    <Heading spacing size="small" level="3">
                        {tekst('opplasting_modal.vil-slette')}
                    </Heading>
                    <Button
                        variant="danger"
                        loading={sletter}
                        type="button"
                        onClick={slettKvittering}
                    >
                        {tekst('opplasting_modal.vil-slette.ja')}
                    </Button>
                    <div aria-live="polite">
                        <Vis
                            hvis={feilmeldingTekst}
                            render={() => (
                                <Alert variant="error">
                                    {feilmeldingTekst}
                                </Alert>
                            )}
                        />
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
