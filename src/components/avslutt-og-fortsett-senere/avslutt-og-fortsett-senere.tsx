import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { minSideUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import useSoknad from '../../hooks/useSoknad'
import { RouteParams } from '../../app'

const AvsluttOgFortsettSenere = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const [aapen, setAapen] = useState<boolean>(false)

    if (!valgtSoknad) return null

    return (
        <>
            <Button
                variant="tertiary"
                className="block px-0"
                data-cy="avslutt-og-fortsett-senere"
                onClick={(e) => {
                    logEvent('modal åpnet', {
                        component: tekst('avslutt.popup.tittel'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId!,
                    })
                    setAapen(true)
                    e.preventDefault()
                }}
            >
                {tekst('avslutt.popup.tittel')}
            </Button>
            <Modal
                open={aapen}
                aria-labelledby="avslutt-og-fortsett-senere"
                onClose={() => {
                    setAapen(false)
                    logEvent('modal lukket', {
                        component: tekst('avslutt.popup.tittel'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId!,
                    })
                }}
            >
                <Modal.Content>
                    <Heading size="small" id="avslutt-og-fortsett-senere" level="1" className="mr-10 mt-1" spacing>
                        {tekst('avslutt.popup.tittel')}
                    </Heading>
                    <BodyShort spacing>{tekst('avslutt.popup.innhold')}</BodyShort>
                    <BodyShort spacing>{tekst('avslutt.popup.sporsmal')}</BodyShort>
                    <Button
                        variant="primary"
                        className="ml-auto mr-auto block"
                        onClick={() => {
                            logEvent('knapp klikket', {
                                tekst: tekst('avslutt.popup.ja'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: tekst('avslutt.popup.tittel'),
                                steg: stegId!,
                            })
                            // Må sikre at amplitude får logget ferdig
                            window.setTimeout(() => {
                                window.location.href = minSideUrl()
                            }, 200)
                        }}
                    >
                        {tekst('avslutt.popup.ja')}
                    </Button>
                    <Button
                        variant="secondary"
                        className="ml-auto mr-auto mt-4 block"
                        onClick={() => {
                            setAapen(false)
                            logEvent('knapp klikket', {
                                tekst: tekst('avslutt.popup.nei'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: tekst('avslutt.popup.tittel'),
                                steg: stegId!,
                            })
                        }}
                    >
                        {tekst('avslutt.popup.nei')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default AvsluttOgFortsettSenere
