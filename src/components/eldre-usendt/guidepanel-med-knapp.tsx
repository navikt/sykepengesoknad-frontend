import { BodyShort, Button, GuidePanel, Heading } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import { logEvent } from '../umami/umami'

interface GuidepanelMedKnappProps {
    heading: string
    innhold: string
    knappeTekst: string
    url: string
    komponent: string
}

export const GuidepanelMedKnapp = ({ heading, innhold, knappeTekst, url, komponent }: GuidepanelMedKnappProps) => {
    const router = useRouter()
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
                type="button"
                variant="primary"
                onClick={async () => {
                    logEvent('knapp klikket', {
                        tekst: knappeTekst,
                        komponent: komponent,
                    })
                    if (url.startsWith('/')) {
                        await router.push(url)
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
