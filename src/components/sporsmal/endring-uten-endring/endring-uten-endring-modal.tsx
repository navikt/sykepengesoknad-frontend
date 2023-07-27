import { Alert, BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import { tekst } from '../../../utils/tekster'
import useSoknad from '../../../hooks/useSoknad'
import useSoknader from '../../../hooks/useSoknader'
import { logEvent } from '../../amplitude/amplitude'
import { useAvbryt } from '../../../hooks/useAvbryt'

interface EndringUtenEndringModalProps {
    aapen: boolean
    setAapen: (p: boolean) => void
}

export const EndringUtenEndringModal = (props: EndringUtenEndringModalProps) => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const { mutate: avbrytMutation, isLoading: avbryter, error: avbrytError } = useAvbryt()

    if (!valgtSoknad || !soknader) return null

    return (
        <>
            <Modal
                className="modal__endring-uten-endring_popup"
                onClose={() => {
                    props.setAapen(false)
                }}
                open={props.aapen}
                aria-labelledby="endring-uten-endring"
            >
                <Modal.Content>
                    <Heading size="small" id="endring-uten-endring" level="1" spacing>
                        {tekst('endring-uten-endring.popup.tittel')}
                    </Heading>

                    <BodyShort spacing>{tekst('endring-uten-endring.popup.innhold')}</BodyShort>

                    <Button
                        variant="primary"
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
                </Modal.Content>
            </Modal>
        </>
    )
}
