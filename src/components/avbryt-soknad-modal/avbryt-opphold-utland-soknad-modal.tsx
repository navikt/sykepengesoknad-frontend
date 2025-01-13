import { Alert, BodyLong, Button, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { EndringUtenEndringModal } from '../sporsmal/endring-uten-endring/endring-uten-endring-modal'
import { useAvbryt } from '../../hooks/useAvbryt'
import { Soknad } from '../../types/types'
import { sykefravaerUrl } from '../../utils/environment'
import { tekstMedHtml } from '../../utils/html-react-parser-utils'

interface SoknadProps {
    soknad?: Soknad
}

const AvbrytKorrigeringOppholdutland = ({ soknad }: SoknadProps) => {
    const [aapen, setAapen] = useState<boolean>(false)

    if (!soknad) return null

    return (
        <>
            <Button
                variant="tertiary"
                as={Button}
                type="button"
                className="text-surface-danger hover:bg-red-50 hover:text-surface-danger -ml-5"
                onClick={() => {
                    logEvent('modal åpnet', {
                        component: tekst('avbryt.korrigering.knapp'),
                        soknadstype: soknad.soknadstype,
                        steg: '0',
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

const AvbrytOppholdUtlandSoknadModal = ({ soknad }: SoknadProps) => {
    const { mutate: avbrytMutation, isPending: avbryter, error: avbrytError } = useAvbryt()

    const [aapen, setAapen] = useState<boolean>(false)

    if (soknad?.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
        return <AvbrytKorrigeringOppholdutland soknad={soknad} />
    }

    return (
        <>
            <Button
                variant="tertiary"
                type="button"
                as={Button}
                className="text-surface-danger hover:bg-red-50 hover:text-surface-danger -ml-5"
                data-cy="avbryt-soknad"
                onClick={() => {
                    setAapen(true)
                    logEvent('modal åpnet', {
                        component: tekst('avbryt.popup.tittel'),
                        soknadstype: soknad?.soknadstype,
                        steg: '0',
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
                        soknadstype: soknad?.soknadstype,
                        steg: '0',
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
                                soknadstype: soknad?.soknadstype,
                                component: tekst('avbryt.popup.tittel'),
                                steg: '0',
                            })
                            if (soknad) {
                                avbrytMutation({
                                    valgtSoknad: soknad,
                                    onSuccess: () => {
                                        setAapen(false)
                                    },
                                })
                            } else {
                                window.location.replace(sykefravaerUrl())
                            }
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
                                soknadstype: soknad?.soknadstype,
                                component: tekst('avbryt.popup.tittel'),
                                steg: '0',
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

export default AvbrytOppholdUtlandSoknadModal
