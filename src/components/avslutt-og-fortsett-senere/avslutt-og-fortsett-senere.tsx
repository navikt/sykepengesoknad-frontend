import { BodyShort, Button, Skeleton } from '@navikt/ds-react'
import React, { useState } from 'react'

import { minSideUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { FlexModal } from '../flex-modal'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { cn } from '../../utils/tw-utils'

const AvsluttOgFortsettSenere = () => {
    const { valgtSoknad, stegId } = useSoknadMedDetaljer()

    const [aapen, setAapen] = useState<boolean>(false)

    return (
        <>
            <Button
                className={cn('block', { '-ml-5': valgtSoknad })}
                variant="tertiary"
                type="button"
                as={valgtSoknad ? Button : Skeleton}
                data-cy="avslutt-og-fortsett-senere"
                onClick={(e) => {
                    logEvent('modal åpnet', {
                        component: tekst('avslutt.popup.tittel'),
                        soknadstype: valgtSoknad?.soknadstype,
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
                        soknadstype: valgtSoknad?.soknadstype,
                        steg: stegId!,
                    })
                }}
            >
                <BodyShort spacing>{tekst('avslutt.popup.innhold')}</BodyShort>
                <BodyShort spacing>{tekst('avslutt.popup.sporsmal')}</BodyShort>
                <Button
                    variant="primary"
                    type="button"
                    className="mr-4 mt-4"
                    onClick={() => {
                        if (valgtSoknad) {
                            logEvent('knapp klikket', {
                                tekst: tekst('avslutt.popup.ja'),
                                soknadstype: valgtSoknad.soknadstype,
                                component: tekst('avslutt.popup.tittel'),
                                steg: stegId!,
                            })
                        }
                        window.location.href = minSideUrl()
                    }}
                >
                    {tekst('avslutt.popup.ja')}
                </Button>
                <Button
                    variant="secondary"
                    type="button"
                    className="mt-4"
                    onClick={() => {
                        setAapen(false)
                        logEvent('knapp klikket', {
                            tekst: tekst('avslutt.popup.nei'),
                            soknadstype: valgtSoknad?.soknadstype,
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
