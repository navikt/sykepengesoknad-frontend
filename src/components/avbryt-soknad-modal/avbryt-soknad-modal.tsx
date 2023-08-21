import { Alert, BodyLong, Button, Skeleton } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { EndringUtenEndringModal } from '../sporsmal/endring-uten-endring/endring-uten-endring-modal'
import useSoknad from '../../hooks/useSoknad'
import { FlexModal } from '../flex-modal'
import { useAvbryt } from '../../hooks/useAvbryt'
import { UseSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { cn } from '../../utils/tw-utils'

const AvbrytKorrigering = () => {
    const router = useRouter()
    const { id, stegId } = router.query as { id: string; stegId: string }
    const { data: valgtSoknad } = useSoknad(id)
    const [aapen, setAapen] = useState<boolean>(false)

    if (!valgtSoknad) return null

    return (
        <>
            <Button
                variant="tertiary"
                as={valgtSoknad ? Button : Skeleton}
                className={cn('text-surface-danger hover:bg-red-50 hover:text-surface-danger', {
                    '-ml-5': valgtSoknad,
                })}
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
        </>
    )
}

const AvbrytSoknadModal = () => {
    const { valgtSoknad, stegId } = UseSoknadMedDetaljer()

    const { mutate: avbrytMutation, isLoading: avbryter, error: avbrytError } = useAvbryt()

    const [aapen, setAapen] = useState<boolean>(false)

    if (valgtSoknad?.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
        return <AvbrytKorrigering />
    }

    return (
        <>
            <Button
                variant="tertiary"
                as={valgtSoknad ? Button : Skeleton}
                className={cn('text-surface-danger hover:bg-red-50 hover:text-surface-danger', {
                    '-ml-5': valgtSoknad,
                })}
                data-cy="avbryt-soknad"
                onClick={(e) => {
                    logEvent('modal åpnet', {
                        component: tekst('avbryt.popup.tittel'),
                        soknadstype: valgtSoknad?.soknadstype,
                        steg: stegId,
                    })
                    setAapen(true)
                    e.preventDefault()
                }}
            >
                {tekst('avbryt.popup.tittel')}
            </Button>

            <FlexModal
                open={aapen}
                setOpen={setAapen}
                headerId="avbryt-soknad"
                header={tekst('avbryt.popup.tittel')}
                onClose={() => {
                    logEvent('modal lukket', {
                        component: tekst('avbryt.popup.tittel'),
                        soknadstype: valgtSoknad?.soknadstype,
                        steg: stegId!,
                    })
                }}
            >
                <BodyLong spacing size="medium">
                    {tekst('avbryt.popup.sporsmal')}
                </BodyLong>

                <Button
                    variant="danger"
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
                {avbrytError && (
                    <Alert variant="error" className="mt-4">
                        {tekst('avbryt.feilet')}
                    </Alert>
                )}
            </FlexModal>
        </>
    )
}

export default AvbrytSoknadModal
