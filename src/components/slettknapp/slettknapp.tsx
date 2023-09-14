import { Alert, Button, Modal } from '@navikt/ds-react'
import { TrashIcon } from '@navikt/aksel-icons'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { Kvittering, Sporsmal, svarverdiToKvittering } from '../../types/types'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { useSlettKvittering } from '../../hooks/useSlettKvittering'

interface SlettknappProps {
    sporsmal: Sporsmal
    kvittering: Kvittering
}

const Slettknapp = ({ sporsmal, kvittering }: SlettknappProps) => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { mutate: slettKvitteringMutation, isLoading: sletter, error: slettingError } = useSlettKvittering()

    const [vilSlette, setVilSlette] = useState<boolean>(false)

    const slettKvittering = async () => {
        if (sletter) {
            return
        }

        const svar = sporsmal?.svarliste.svar.find(
            (svar) => svarverdiToKvittering(svar?.verdi).blobId === kvittering?.blobId,
        )

        slettKvitteringMutation({
            soknadId: id,
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
                icon={<TrashIcon />}
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
