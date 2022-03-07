import './ekspanderbar.less'

import { Collapse,Expand } from '@navikt/ds-icons'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useState } from 'react'

import { useAmplitudeInstance } from '../amplitude/amplitude'
import Vis from '../vis'

interface EkspanderbarProps {
    title: string
    amplitudeProps?: object
    children: any
    sporsmalId: string
}

export const Ekspanderbar = ({ title, children, amplitudeProps, sporsmalId }: EkspanderbarProps) => {
    const [ expanded, setExpanded ] = useState<boolean>(false)
    const { logEvent } = useAmplitudeInstance()

    // Lukker mellom hvert spørsmål
    useEffect(() => setExpanded(false), [ sporsmalId ])


    return (
        <div className="ekspanderbar">
            <button
                type="button"
                aria-expanded={expanded}
                onClick={() => {
                    if (!expanded && amplitudeProps) {
                        logEvent('panel åpnet', amplitudeProps)
                    }
                    setExpanded((prev) => !prev)
                }}
                className="ekspanderbar__toggle"
            >
                <Element className="toggle-text">{title}</Element>
                <Vis hvis={expanded} render={()=>
                    <Collapse />
                } />
                <Vis hvis={!expanded} render={()=>
                    <Expand />
                } />
            </button>
            <div style={{ display: expanded ? '' : 'none' }} aria-hidden={!expanded} className="ekspanderbar__content">
                {typeof children === 'string' ? <Normaltekst>{children}</Normaltekst> : children}
            </div>
        </div>
    )
}

