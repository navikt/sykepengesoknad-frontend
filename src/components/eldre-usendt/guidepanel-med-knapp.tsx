import { BodyShort, Button, GuidePanel, Heading } from '@navikt/ds-react'
import React from 'react'
import { useNavigate } from 'react-router'

import { logEvent } from '../amplitude/amplitude'

interface GuidepanelMedKnappProps {
    heading: string
    innhold: string
    knappeTekst: string
    url: string
    komponent: string
}

export const GuidepanelMedKnapp = ({ heading, innhold, knappeTekst, url, komponent }: GuidepanelMedKnappProps) => {
    const navigate = useNavigate()

    logEvent('guidepanel vist', {
        tekst: innhold,
        heading,
        komponent,
    })

    return (
        <GuidePanel>
            <Heading size="small" spacing>
                {heading}
            </Heading>
            <BodyShort size="small" spacing>
                {innhold}
            </BodyShort>
            <Button
                variant={'primary'}
                onClick={() => {
                    logEvent('knapp klikket', {
                        tekst: knappeTekst,
                        komponent: komponent,
                    })
                    if (url.startsWith('/')) {
                        navigate(url)
                    } else {
                        window.location.href = url
                    }
                }}
            >
                {knappeTekst}
            </Button>
        </GuidePanel>
    )
}
