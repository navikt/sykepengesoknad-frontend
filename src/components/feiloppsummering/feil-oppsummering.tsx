import './feil-oppsummering.less'

import { Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useRef } from 'react'

import { Sporsmal } from '../../types/types'
import { erSynligIViewport } from '../../utils/browser-utils'
import { flattenSporsmal } from '../../utils/soknad-utils'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { SpmProps } from '../sporsmal/sporsmal-form/sporsmal-form'
import Vis from '../vis'

interface FeiloppsummeringProps {
    settFokus?: boolean;
    errors: any;
}

type FeilProps = FeiloppsummeringProps & SpmProps;

const FeilOppsummering = (props: FeilProps) => {
    const oppsummering = useRef<HTMLDivElement>(null)
    const { logEvent } = useAmplitudeInstance()
    const { settFokus, errors, sporsmal } = props
    const entries: any[] = Object.entries(errors)

    useEffect(() => {
        if (Object.entries(errors).length > 0) {
            logEvent('skjemavalidering feilet', { sporsmalstag: sporsmal.tag })
        }
        // eslint-disable-next-line
    }, [ errors ]);

    useEffect(() => {
        let fokuser = settFokus
        if (fokuser === undefined) {
            fokuser = true
        }
        if (fokuser && oppsummering.current) {
            if (!erSynligIViewport(oppsummering.current)) {
                setTimeout(() => {
                    oppsummering.current?.focus()
                }, 300)
            } else {
                oppsummering.current?.focus()
            }
        }
    })

    const handleClick = (list: any) => {
        const id = `${list[0]}`
        const idarr = id.split('_')

        let detteSpm = flattenSporsmal(sporsmal.undersporsmal).filter((uspm: Sporsmal) => uspm.id === idarr[0])[0]
        if (!detteSpm) {
            detteSpm = sporsmal
        }

        let elmid
        if (id.includes('_')) {
            if(list[1].type === 'periode') {
                elmid = id + '_fom'
            } else {
                elmid = id + '_' + list[1].type
            }

        } else if (detteSpm.svartype.includes('JA_NEI')) {
            elmid = idarr[0] += '_0'

        } else if (detteSpm.svartype.includes('CHECK') || detteSpm.svartype.includes('RADIO') ||
            detteSpm.svartype.includes('TIMER') || detteSpm.svartype.includes('PROSENT')) {
            elmid = idarr[0]

        } else if (detteSpm.svartype.includes('DATO')) {
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
            <Vis hvis={entries.length > 0}>
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
            </Vis>
        </div>
    )
}

export default FeilOppsummering
