import './ekspanderbar.less'

import { Accordion } from '@navikt/ds-react'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAmplitudeInstance } from '../amplitude/amplitude'

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
        <Accordion>
            <Accordion.Item className="ekspanderbar" renderContentWhenClosed={true}>
                <Accordion.Header
                    onClick={(e) => {
                        e.preventDefault()
                        if (!expanded && amplitudeProps) {
                            logEvent('panel åpnet', amplitudeProps)
                        }
                        setExpanded((prev) => !prev)
                    }}
                >
                    <Element>{title}</Element>
                </Accordion.Header>
                <Accordion.Content>
                    {typeof children === 'string' ? <Normaltekst>{children}</Normaltekst> : children}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

