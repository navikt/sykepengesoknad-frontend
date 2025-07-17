import { Alert, BodyLong, Button, Modal, Skeleton } from '@navikt/ds-react'
import React, { useState } from 'react'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { EndringUtenEndringModal } from '../sporsmal/endring-uten-endring/endring-uten-endring-modal'
import { useAvbryt } from '../../hooks/useAvbryt'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { cn } from '../../utils/tw-utils'
import { tekstMedHtml } from '../../utils/html-react-parser-utils'

const AvbrytKorrigering = () => {
    const { valgtSoknad, stegId } = useSoknadMedDetaljer()

    const [aapen, setAapen] = useState<boolean>(false)
    const { logEvent } = useAvbryt()

    if (!valgtSoknad) return null

    return (
        <>
            <Button
                variant="tertiary"
                as={Button}
                type="button"
                className={cn('text-surface-danger hover:bg-red-50 hover:text-surface-danger', {
                    '-ml-5': valgtSoknad,
                })}
                onClick={() => {
                    logEvent('modal åpnet', {
                        component: tekst('avbryt.korrigering.knapp'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId!,
                    })
                    setAapen(true)
                }}
            >
                {tekst('avbryt.korrigering.knapp')}
            </Button>
            <EndringUtenEndringModal aapen={aapen} setAapen={setAapen} />
        </>
    )
}

const AvbrytSoknadModal = () => {
    const { valgtSoknad, stegId } = useSoknadMedDetaljer()

    const { mutate: avbrytMutation, isPending: avbryter, error: avbrytError } = useAvbryt()

    const [aapen, setAapen] = useState<boolean>(false)

    if (valgtSoknad?.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
        return <AvbrytKorrigering />
    }

    return (
        <>
            <Button variant="danger">Danger</Button>

            <Button
                variant="tertiary"
                type="button"
                as={valgtSoknad ? Button : Skeleton}
                className={cn('text-surface-danger hover:bg-red-50 hover:text-surface-danger', {
                    '-ml-5': valgtSoknad,
                })}
                data-cy="avbryt-soknad"
                onClick={() => {
                    setAapen(true)
                    logEvent('modal åpnet', {
                        component: tekst('avbryt.popup.tittel'),
                        soknadstype: valgtSoknad?.soknadstype,
                        steg: stegId,
                    })
                }}
            >
                {tekst('avbryt.popup.tittel')}
            </Button>
            <Modal
                open={aapen}
                header={{ heading: tekst('avbryt.popup.tittel') }}
                onClose={() => {
                    setAapen(false)
                    logEvent('modal lukket', {
                        component: tekst('avbryt.popup.tittel'),
                        soknadstype: valgtSoknad?.soknadstype,
                        steg: stegId!,
                    })
                }}
            >
                <Modal.Body>
                    <BodyLong spacing size="medium">
                        {tekstMedHtml(tekst('avbryt.popup.sporsmal'))}
                    </BodyLong>
                    {avbrytError && (
                        <Alert variant="error" className="mt-4">
                            {tekst('avbryt.feilet')}
                        </Alert>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        type="button"
                        className="mr-4 mt-4"
                        loading={avbryter}
                        onClick={() => {
                            logEvent('knapp klikket', {
                                tekst: tekst('avbryt.popup.ja'),
                                soknadstype: valgtSoknad?.soknadstype,
                                component: tekst('avbryt.popup.tittel'),
                                steg: stegId,
                            })
                            if (valgtSoknad)
                                avbrytMutation({
                                    valgtSoknad: valgtSoknad,
                                    onSuccess: () => {
                                        setAapen(false)
                                    },
                                })
                        }}
                    >
                        {tekst('avbryt.popup.ja')}
                    </Button>
                    <Button
                        variant="secondary"
                        type="button"
                        className="mt-4"
                        onClick={() => {
                            logEvent('knapp klikket', {
                                tekst: tekst('avbryt.popup.nei'),
                                soknadstype: valgtSoknad?.soknadstype,
                                component: tekst('avbryt.popup.tittel'),
                                steg: stegId!,
                            })
                            setAapen(false)
                        }}
                    >
                        {tekst('avbryt.popup.nei')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AvbrytSoknadModal
