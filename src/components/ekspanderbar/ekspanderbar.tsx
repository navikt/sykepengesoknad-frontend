import { Accordion, BodyShort, Label } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { logEvent } from '../amplitude/amplitude'

interface EkspanderbarProps {
    title: string
    className?: string
    amplitudeProps?: Record<string, string | boolean>
    children: any
    sporsmalId: string
    logVedVisning?: string
}

export const Ekspanderbar = ({
    title,
    className,
    children,
    amplitudeProps,
    sporsmalId,
    logVedVisning,
}: EkspanderbarProps) => {
    const [expanded, setExpanded] = useState<boolean>(false)

    // Lukker mellom hvert spørsmål
    useEffect(() => {
        setExpanded(false)
        if (logVedVisning) {
            logEvent('accordion åpnet', {
                tekst: logVedVisning,
                type: 'hjelpetekst',
            })
        }
        // eslint-disable-next-line
    }, [sporsmalId])

    return (
        <Accordion>
            <Accordion.Item className={`ekspanderbar ${className}`}>
                <Accordion.Header
                    type="button"
                    onClick={() => {
                        if (!expanded && amplitudeProps) {
                            logEvent('accordion åpnet', amplitudeProps)
                        }
                        setExpanded((prev) => !prev)
                    }}
                >
                    <Label as="h2">{title}</Label>
                </Accordion.Header>
                <Accordion.Content>
                    {typeof children === 'string' ? <BodyShort>{children}</BodyShort> : children}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}
