import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import { avbrytSoknad } from '../../avbryt-soknad-modal/avbryt-soknad'
import useSoknad from '../../../hooks/useSoknad'
import { RouteParams } from '../../../app'
import useSoknader from '../../../hooks/useSoknader'

import { harLikeSvar } from './har-like-svar'

interface EndringUtenEndringModalProps {
    aapen: boolean
    setAapen: (p: boolean) => void
    erSiste: boolean
}

export const EndringUtenEndringModal = (props: EndringUtenEndringModalProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { data: korrigerer } = useSoknad(valgtSoknad?.korrigerer, valgtSoknad?.korrigerer !== undefined)
    const { data: soknader } = useSoknader()
    const queryClient = useQueryClient()

    const { logEvent } = useAmplitudeInstance()
    const { setFeilmeldingTekst } = useAppStore()
    const history = useHistory()

    // Følger med på endring av svar
    useEffect(() => {
        if (!valgtSoknad) {
            return
        }
        if (!korrigerer) {
            props.setAapen(false)
            return
        }
        props.setAapen(harLikeSvar(korrigerer, valgtSoknad))
        // eslint-disable-next-line
    }, [valgtSoknad, korrigerer])

    if (!valgtSoknad || !soknader || !korrigerer || !props.erSiste) return null

    const lukkDersomUlikeSvar = () => {
        if (props.aapen) {
            if (!harLikeSvar(korrigerer, valgtSoknad)) {
                props.setAapen(false)
                return true
            }
        }
        return false
    }

    // TODO: test om dette funker
    if (lukkDersomUlikeSvar()) return null

    return (
        <>
            <Modal
                className="modal__endring-uten-endring_popup"
                onClose={() => {
                    props.setAapen(false)
                }}
                open={props.aapen}
                aria-labelledby="modal-tittel"
            >
                <Modal.Content>
                    <Heading size="small" level="1" id="modal-tittel" spacing>
                        {tekst('endring-uten-endring.popup.tittel')}
                    </Heading>

                    <BodyShort>{tekst('endring-uten-endring.popup.innhold')}</BodyShort>

                    <Button
                        variant="primary"
                        className="midtstilt-knapp"
                        onClick={() => {
                            props.setAapen(false)
                            logEvent('knapp klikket', {
                                tekst: tekst('endring-uten-endring.popup.ok'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: 'endring-uten-endring-modal',
                            })
                            avbrytSoknad({
                                valgtSoknad: valgtSoknad,
                                soknader: soknader,
                                queryClient: queryClient,
                                history: history,
                                setFeilmeldingTekst: setFeilmeldingTekst,
                            })
                        }}
                    >
                        {tekst('endring-uten-endring.popup.ok')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}
