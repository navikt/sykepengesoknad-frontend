import { BodyShort, Button } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { minSideUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import useSoknad from '../../hooks/useSoknad'
import { FlexModal } from '../flex-modal'

const AvsluttOgFortsettSenere = () => {
    const router = useRouter()
    const { id, stegId } = router.query as { id: string; stegId: string }
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
                    className="mt-4"
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
                    className="mt-4 block"
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
