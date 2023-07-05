import { BodyShort, Button } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { minSideUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import useSoknad from '../../hooks/useSoknad'
import { RouteParams } from '../../app'
import { FlexModal } from '../flex-modal'

const AvsluttOgFortsettSenere = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const [aapen, setAapen] = useState<boolean>(false)

    if (!valgtSoknad) return null

    return (
        <>
            <Button
                variant="tertiary"
                className="-ml-5 block"
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

            <FlexModal
                open={aapen}
                setOpen={setAapen}
                headerId="avslutt-og-fortsett-senere"
                header={tekst('avslutt.popup.tittel')}
                onClose={() => {
                    logEvent('modal lukket', {
                        component: tekst('avslutt.popup.tittel'),
                        soknadstype: valgtSoknad.soknadstype,
                        steg: stegId!,
                    })
                }}
            >
                <BodyShort spacing>{tekst('avslutt.popup.innhold')}</BodyShort>
                <BodyShort spacing>{tekst('avslutt.popup.sporsmal')}</BodyShort>
                <Button
                    variant="primary"
                    className="mr-4 mt-4"
                    onClick={() => {
                        logEvent('knapp klikket', {
                            tekst: tekst('avslutt.popup.ja'),
                            soknadstype: valgtSoknad.soknadstype,
                            component: tekst('avslutt.popup.tittel'),
                            steg: stegId!,
                        })

                        window.location.href = minSideUrl()
                    }}
                >
                    {tekst('avslutt.popup.ja')}
                </Button>
                <Button
                    variant="secondary"
                    className="mt-4"
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
            </FlexModal>
        </>
    )
}

export default AvsluttOgFortsettSenere
