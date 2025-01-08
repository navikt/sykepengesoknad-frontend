import { Alert, BodyShort, Button, Modal } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import useSoknader from '../../../hooks/useSoknader'
import { logEvent } from '../../amplitude/amplitude'
import { useAvbryt } from '../../../hooks/useAvbryt'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

interface EndringUtenEndringModalProps {
    aapen: boolean
    setAapen: (p: boolean) => void
}

export const EndringUtenEndringModal = (props: EndringUtenEndringModalProps) => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const { data: soknader } = useSoknader()
    const { mutate: avbrytMutation, isPending: avbryter, error: avbrytError } = useAvbryt()

    if (!valgtSoknad || !soknader) return null

    return (
        <>
            <Modal
                onClose={() => {
                    props.setAapen(false)
                }}
                open={props.aapen}
                header={{ heading: tekst('endring-uten-endring.popup.tittel') }}
            >
                <Modal.Body>
                    <BodyShort spacing>{tekst('endring-uten-endring.popup.innhold')}</BodyShort>

                    <Button
                        variant="primary"
                        type="button"
                        className="ml-auto mr-auto block"
                        loading={avbryter}
                        onClick={() => {
                            logEvent('knapp klikket', {
                                tekst: tekst('endring-uten-endring.popup.ok'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: 'endring-uten-endring-modal',
                            })
                            avbrytMutation({
                                valgtSoknad: valgtSoknad,
                                onSuccess: () => {
                                    props.setAapen(false)
                                },
                            })
                        }}
                    >
                        {tekst('endring-uten-endring.popup.ok')}
                    </Button>
                    {avbrytError && (
                        <Alert variant="error" className="mt-4">
                            {tekst('avbryt.feilet')}
                        </Alert>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}
