import { ErrorSummary } from '@navikt/ds-react'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../types/types'
import { flattenSporsmal } from '../../utils/soknad-utils'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Vis from '../vis'
import { FetchError } from '../../utils/fetch'

const FeilOppsummering = ({
    valgtSoknad,
    sporsmal,
    sendError,
}: {
    valgtSoknad: Soknad
    sporsmal: Sporsmal
    sendError: FetchError | null
}) => {
    const { formState } = useFormContext()
    const [entries, setEntries] = useState<any[]>([])
    const oppsummering = useRef<HTMLDivElement>(null)
    const { logEvent } = useAmplitudeInstance()

    useEffect(() => {
        setEntries(Object.entries(formState.errors))
        if (Object.entries(formState.errors).length > 0) {
            logEvent('skjema validering feilet', {
                sporsmalstag: sporsmal.tag,
                skjemanavn: 'sykepengesoknad',
            })
        }
        // eslint-disable-next-line
    }, [formState])

    const handleClick = (list: any) => {
        const id = `${list[0]}`
        const idarr = id.split('_')

        let detteSpm = flattenSporsmal(sporsmal.undersporsmal).find((uspm: Sporsmal) => uspm.id === idarr[0])
        if (!detteSpm) {
            detteSpm = sporsmal
        }

        let elmid
        if (id.includes('_')) {
            if (list[1].type === 'periode') {
                elmid = id + '_fom'
            } else {
                elmid = id + '_' + list[1].type
            }
        } else if (detteSpm.svartype === RSSvartype.JA_NEI) {
            elmid = idarr[0] += '_0'
        } else if (detteSpm.svartype === RSSvartype.RADIO_GRUPPE_TIMER_PROSENT) {
            elmid = detteSpm.undersporsmal[0].id
        } else if (detteSpm.svartype.includes('CHECK') || detteSpm.svartype.includes('RADIO')) {
            elmid = idarr[0]
        } else if (detteSpm.svartype === RSSvartype.DATOER) {
            const kalender: any = document.querySelector('.skjema__dager')
            kalender.focus()
        } else {
            elmid = id
        }

        const element = document.getElementById(elmid as any)
        if (element) {
            if (detteSpm.erHovedsporsmal && detteSpm.svartype.includes('JA_NEI')) {
                element!.parentElement!.classList.add('inputPanel--focused')
            }
            element.focus()
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleKeyDown = (e: any, list: any) => {
        if (e.key === 'Enter') {
            handleClick(list)
        }
    }

    const antall = entries.length + (sendError == null ? 0 : 1)

    return (
        <div aria-live="polite" role="alert">
            <Vis
                hvis={antall > 0}
                render={() => (
                    <ErrorSummary
                        ref={oppsummering}
                        size="medium"
                        heading={'Det er ' + antall + ' feil i skjemaet'}
                        className="feiloppsummering"
                    >
                        {entries
                            .sort((list) => list[0][0])
                            .map((list, index) => (
                                <ErrorSummary.Item
                                    key={index}
                                    tabIndex={0}
                                    onKeyDown={(e) => handleKeyDown(e, list)}
                                    onClick={() => handleClick(list)}
                                >
                                    {list[1].message}
                                </ErrorSummary.Item>
                            ))}
                        <Vis
                            hvis={sendError}
                            render={() => {
                                const message =
                                    sendError?.status == 400
                                        ? 'Beklager, det oppstod en feil. Klikk her for å laste inn søknaden på nytt.'
                                        : 'Beklager, det oppstod en teknisk feil.'
                                const klikk = () => {
                                    if (sendError?.status == 400) {
                                        window.location.href = `/syk/sykepengesoknad/soknader/${valgtSoknad.id}${window.location.search}`
                                    }
                                }
                                const handleKeyDown = (e: any) => {
                                    if (e.key === 'Enter') {
                                        klikk()
                                    }
                                }
                                return (
                                    <ErrorSummary.Item onKeyDown={(e) => handleKeyDown(e)} onClick={() => klikk()}>
                                        {message}
                                    </ErrorSummary.Item>
                                )
                            }}
                        ></Vis>
                    </ErrorSummary>
                )}
            />
        </div>
    )
}

export default FeilOppsummering
