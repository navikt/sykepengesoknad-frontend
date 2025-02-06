import { BodyLong, BodyShort, GuidePanel, Heading, Link } from '@navikt/ds-react'
import React from 'react'

export const IntroGuide = () => {
    return (
        <GuidePanel poster className="mb-8">
            <Heading size="medium" level="2" spacing>
                Hei!
            </Heading>
            <BodyLong spacing>
                Her kan du søke om sykepenger mens du er sykmeldt. Sykepenger skal erstatte inntekten din når du ikke
                kan jobbe som normalt, på grunn av din egen sykdom eller skade.
            </BodyLong>
            <BodyShort>
                For å lese mer om sykepenger, gå til <Link href="https://www.nav.no/sykepenger">nav.no/sykepenger</Link>
            </BodyShort>
        </GuidePanel>
    )
}

export const IntroGuideFriskmelding = () => {
    return (
        <GuidePanel poster className="mb-8">
            <Heading size="medium" level="2" spacing>
                Hei!
            </Heading>
            <BodyLong spacing>
                Med friskmelding til arbeidsformidling kan du få sykepenger mens du ser etter ny jobb. Da må du være
                registrert som arbeidssøker hos Nav og søke om sykepenger hver 14. dag.
            </BodyLong>
            <BodyShort>
                Les mer om <Link href="https://www.nav.no/sykepenger">friskmelding til arbeidsformidling.</Link>
            </BodyShort>
        </GuidePanel>
    )
}
