import { BodyLong, BodyShort, GuidePanel, Heading, Link } from '@navikt/ds-react'
import React from 'react'

export const IntroGuide = () => {
    return (
        <GuidePanel poster className="mb-8">
            <Heading size="medium" level="2">
                Hei!
            </Heading>
            <BodyLong spacing>
                Sykepenger skal erstatte inntekten din når du ikke kan jobbe på grunn av din egen sykdom eller skade.
            </BodyLong>
            <BodyShort>
                For å lese mer om sykepenger, gå til <Link href="https://www.nav.no/sykepenger">nav.no/sykepenger</Link>
            </BodyShort>
        </GuidePanel>
    )
}
