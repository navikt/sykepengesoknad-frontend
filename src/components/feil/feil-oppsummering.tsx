import './feil-oppsummering.less'

import { Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useRef } from 'react'

import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../types/types'
import { flattenSporsmal } from '../../utils/soknad-utils'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { SpmProps } from '../sporsmal/sporsmal-form/sporsmal-form'
import VisBlock from '../vis-block'

interface FeiloppsummeringProps {
    errors: any;
}

type FeilProps = FeiloppsummeringProps & SpmProps;

const FeilOppsummering = ({ errors, sporsmal }: FeilProps) => {
    const oppsummering = useRef<HTMLDivElement>(null)
    const { logEvent } = useAmplitudeInstance()
    const entries: any[] = Object.entries(errors)

    useEffect(() => {
        if (entries.length > 0) {
            oppsummering.current?.focus()
            logEvent('skjemavalidering feilet', { sporsmalstag: sporsmal.tag })
        }
        // eslint-disable-next-line
    }, [ errors ])

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

    return (
        <div aria-live="polite" role="alert">
            <VisBlock hvis={entries.length > 0}
                render={() =>
                    <div ref={oppsummering} tabIndex={0} role="region" className="feiloppsummering">
                        <Undertittel>{'Det er ' + entries.length + ' feil i skjemaet'}</Undertittel>
                        <ul className="feiloppsummering__liste">
                            {entries.sort(list => list[0][0]).map((list, index) => (
                                <li key={index}>
                                    <div role="link" className="lenke" tabIndex={0}
                                        onKeyDown={(e) => handleKeyDown(e, list)}
                                        onClick={() => handleClick(list)}
                                    >
                                        {list[1].message}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            />
        </div>
    )
}

export default FeilOppsummering
