import { Alert, Button, Modal } from '@navikt/ds-react'
import { TrashIcon } from '@navikt/aksel-icons'
import React, { useState } from 'react'

import { Kvittering, Sporsmal, svarverdiToKvittering } from '../../types/types'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { useSlettKvittering } from '../../hooks/useSlettKvittering'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

interface SlettknappProps {
    sporsmal: Sporsmal
    kvittering: Kvittering
}

const Slettknapp = ({ sporsmal, kvittering }: SlettknappProps) => {
    const { soknadId } = useSoknadMedDetaljer()

    const { mutate: slettKvitteringMutation, isLoading: sletter, error: slettingError } = useSlettKvittering()

    const [vilSlette, setVilSlette] = useState<boolean>(false)
    if (!soknadId) {
        return null
    }
    const slettKvittering = async () => {
        if (sletter) {
            return
        }

        const svar = sporsmal?.svarliste.svar.find(
            (svar) => svarverdiToKvittering(svar?.verdi).blobId === kvittering?.blobId,
        )

        slettKvitteringMutation({
            soknadId: soknadId,
            sporsmalId: sporsmal.id,
            svarId: svar!.id!,
            onSuccess: () => {
                setVilSlette(false)
            },
        })
    }

    return (
        <>
            <Button
                type="button"
                variant="tertiary"
                icon={<TrashIcon aria-hidden={true} />}
                iconPosition="right"
                onClick={(e) => {
                    e.preventDefault()
                    setVilSlette(true)
                }}
            >
                {tekst('opplasting_modal.slett')}
            </Button>

            <Modal
                className="text-left"
                onClose={() => setVilSlette(false)}
                open={vilSlette}
                header={{ heading: tekst('opplasting_modal.vil-slette'), size: 'small', closeButton: false }}
            >
                <Modal.Body>
                    <div aria-live="polite">
                        <Vis
                            hvis={slettingError}
                            render={() => (
                                <Alert className="mt-4" variant="error">
                                    {tekst('opplasting_modal.slett.feilmelding')}
                                </Alert>
                            )}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" loading={sletter} type="button" onClick={slettKvittering}>
                        {tekst('opplasting_modal.vil-slette.ja')}
                    </Button>

                    <Button variant="secondary" type="button" onClick={() => setVilSlette(false)}>
                        Nei
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Slettknapp
