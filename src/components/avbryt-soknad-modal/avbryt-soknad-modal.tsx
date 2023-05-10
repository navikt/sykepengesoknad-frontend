import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { EndringUtenEndringModal } from '../sporsmal/endring-uten-endring/endring-uten-endring-modal'
import useSoknad from '../../hooks/useSoknad'
import useSoknader from '../../hooks/useSoknader'
import { RouteParams } from '../../app'

import { avbrytSoknad } from './avbryt-soknad'

const AvbrytKorrigering = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const [aapen, setAapen] = useState<boolean>(false)

    if (!valgtSoknad) return null

    return (
        <div>
            <Button
                variant="tertiary"
                className={'px-0 text-surface-danger'}
                onClick={(e) => {
                    logEvent('modal åpnet', {
                        component: tekst('avbryt.korrigering.knapp'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId!,
                    })
                    setAapen(true)
                    e.preventDefault()
                }}
            >
                {tekst('avbryt.korrigering.knapp')}
            </Button>
            <EndringUtenEndringModal aapen={aapen} setAapen={setAapen} />
        </div>
    )
}

const AvbrytSoknadModal = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [aapen, setAapen] = useState<boolean>(false)
    const { setFeilmeldingTekst } = useAppStore()

    if (!valgtSoknad || !soknader) {
        return null
    }
    if (valgtSoknad.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
        return <AvbrytKorrigering />
    }

    return (
        <div>
            <Button
                variant="tertiary"
                className={'px-0 text-surface-danger'}
                onClick={(e) => {
                    logEvent('modal åpnet', {
                        component: tekst('avbryt.popup.tittel'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId!,
                    })
                    setAapen(true)
                    e.preventDefault()
                }}
            >
                {tekst('avbryt.popup.tittel')}
            </Button>
            <Modal
                open={aapen}
                aria-labelledby="avbryt-soknad"
                onClose={() => {
                    setAapen(false)
                    logEvent('modal lukket', {
                        component: tekst('avbryt.popup.tittel'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId!,
                    })
                }}
            >
                <Modal.Content>
                    <Heading size="small" id="avbryt-soknad" level="1" className="mr-10 mt-1" spacing>
                        {tekst('avbryt.popup.tittel')}
                    </Heading>

                    <BodyLong spacing size="medium">
                        {tekst('avbryt.popup.sporsmal')}
                    </BodyLong>

                    <Button
                        variant="danger"
                        className="ml-auto mr-auto block"
                        onClick={() => {
                            logEvent('knapp klikket', {
                                tekst: tekst('avbryt.popup.ja'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: tekst('avbryt.popup.tittel'),
                                steg: stegId!,
                            })
                            avbrytSoknad({
                                valgtSoknad: valgtSoknad,
                                soknader: soknader,
                                queryClient: queryClient,
                                navigate: navigate,
                                setFeilmeldingTekst: setFeilmeldingTekst,
                            })
                        }}
                    >
                        {tekst('avbryt.popup.ja')}
                    </Button>
                    <Button
                        variant="secondary"
                        className="ml-auto mr-auto mt-4 block"
                        onClick={() => {
                            setAapen(false)
                            logEvent('knapp klikket', {
                                tekst: tekst('avbryt.popup.nei'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: tekst('avbryt.popup.tittel'),
                                steg: stegId!,
                            })
                        }}
                    >
                        {tekst('avbryt.popup.nei')}
                    </Button>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default AvbrytSoknadModal
