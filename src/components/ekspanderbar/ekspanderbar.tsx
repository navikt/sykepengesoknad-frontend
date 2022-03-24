import './ekspanderbar.less'

import { Accordion, BodyShort, Label } from '@navikt/ds-react'
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
                    type="button"
                    onClick={() => {
                        if (!expanded && amplitudeProps) {
                            logEvent('panel åpnet', amplitudeProps)
                        }
                        setExpanded((prev) => !prev)
                    }}
                >
                    <Label>{title}</Label>
                </Accordion.Header>
                <Accordion.Content>
                    {typeof children === 'string' ? <BodyShort>{children}</BodyShort> : children}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

