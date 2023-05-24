import { ErrorSummary } from '@navikt/ds-react'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../types/types'
import { flattenSporsmal } from '../../utils/soknad-utils'
import { logEvent } from '../amplitude/amplitude'
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
        } else if (
            detteSpm.svartype === RSSvartype.RADIO_GRUPPE_TIMER_PROSENT ||
            detteSpm.svartype === RSSvartype.CHECKBOX_GRUPPE
        ) {
            elmid = detteSpm.undersporsmal[0].id
        } else if (detteSpm.svartype.includes('CHECK') || detteSpm.svartype.includes('RADIO')) {
            elmid = idarr[0]
        } else if (detteSpm.svartype === RSSvartype.DATOER) {
            const kalender: any = document.querySelector('.dagerKalender')
            kalender.scrollIntoView()
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

    const klikk = () => {
        if (sendError?.status == 400) {
            window.location.href = `/syk/sykepengesoknad/soknader/${valgtSoknad.id}${window.location.search}`
        }
    }
    const handleKeyDownSendError = (e: any) => {
        if (e.key === 'Enter') {
            klikk()
        }
    }
    return (
        <div aria-live="polite" role="alert" data-cy="feil-oppsumering">
            <Vis
                hvis={antall > 0}
                render={() => {
                    const elements = entries
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
                        ))
                    if (sendError) {
                        elements.push(
                            <ErrorSummary.Item onKeyDown={(e) => handleKeyDownSendError(e)} onClick={() => klikk()}>
                                {sendError?.status == 400
                                    ? 'Vi har lagret dine svar, men du må laste inn siden på nytt før du kan sende søknaden. Klikk her for å laste inn siden på nytt.'
                                    : 'Beklager, det oppstod en teknisk feil.'}
                            </ErrorSummary.Item>,
                        )
                    }
                    const heading = sendError
                        ? 'Beklager, det oppstod en feil'
                        : 'Det er ' + antall + ' feil i skjemaet'
                    return (
                        <ErrorSummary ref={oppsummering} size="medium" heading={heading} className="mt-8">
                            {elements}
                        </ErrorSummary>
                    )
                }}
            />
        </div>
    )
}

export default FeilOppsummering
