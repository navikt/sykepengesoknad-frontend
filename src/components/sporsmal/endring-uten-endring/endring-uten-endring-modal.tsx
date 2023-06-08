import { Alert, BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { tekst } from '../../../utils/tekster'
import { avbrytSoknad } from '../../avbryt-soknad-modal/avbryt-soknad'
import useSoknad from '../../../hooks/useSoknad'
import useSoknader from '../../../hooks/useSoknader'
import { logEvent } from '../../amplitude/amplitude'
import { RouteParams } from '../../../app'

interface EndringUtenEndringModalProps {
    aapen: boolean
    setAapen: (p: boolean) => void
}

export const EndringUtenEndringModal = (props: EndringUtenEndringModalProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>()

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
                        onClick={() => {
                            setFeilmeldingTekst(undefined)
                            logEvent('knapp klikket', {
                                tekst: tekst('endring-uten-endring.popup.ok'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: 'endring-uten-endring-modal',
                            })
                            avbrytSoknad({
                                valgtSoknad: valgtSoknad,
                                soknader: soknader,
                                queryClient: queryClient,
                                navigate: navigate,
                                setFeilmeldingTekst,
                                onSuccess: () => {
                                    props.setAapen(false)
                                },
                            })
                        }}
                    >
                        {tekst('endring-uten-endring.popup.ok')}
                    </Button>
                    {feilmeldingTekst && (
                        <Alert variant="error" className="mt-4">
                            {feilmeldingTekst}
                        </Alert>
                    )}
                </Modal.Content>
            </Modal>
        </>
    )
}
