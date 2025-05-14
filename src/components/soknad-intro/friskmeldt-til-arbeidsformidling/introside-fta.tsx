import React from 'react'
import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react'

import { lagrerUnderveisTekst, lagrerUnderveisTittel } from '../intro-accordion'
import { huskAaSokeTekst } from '../for-du-soker'
import { IntroGuideFriskmelding } from '../intro-guide'

export function IntrosideFta() {
    return (
        <>
            <IntroGuideFriskmelding />
            <Heading size="small" level="2" spacing>
                Før du søker
            </Heading>
            <BodyLong spacing>
                I denne søknaden får du spørsmål om situasjonen din har endret seg den siste perioden. Nav bruker
                svarene dine til å beregne hvor mye sykepenger du kan få. I tillegg trenger vi å vite om du fortsatt vil
                være friskmeldt til arbeidsformidling fremover.
            </BodyLong>

            <Heading size="small" level="2" spacing>
                Sykmelding fra legen
            </Heading>
            <BodyLong spacing>
                Du trenger ikke sykmelding mens du er friskmeldt til arbeidsformidling, med mindre du blir syk
                underveis. Da må du ta kontakt med legen din.
            </BodyLong>
            <Heading size="small" level="2" spacing>
                {lagrerUnderveisTittel}
            </Heading>
            <BodyLong spacing>{lagrerUnderveisTekst}</BodyLong>
            <Heading size="small" level="2" spacing>
                Frist for å søke
            </Heading>
            <BodyLong spacing>{huskAaSokeTekst}</BodyLong>
            <Heading size="small" level="2" spacing>
                Har du spørsmål?
            </Heading>
            <BodyLong spacing>
                <SkrivTilOssLenke tekst="Ta kontakt med Nav" />
            </BodyLong>
            <Accordion className="my-8">
                <Accordion.Item>
                    <Accordion.Header>For deg som studerer</Accordion.Header>
                    <Accordion.Content>
                        {
                            'I utgangspunktet får du ikke sykepenger mens du studerer. Har du begynt å studere, eller skal studere mer enn før, må du '
                        }
                        <BeskjedSykepengerLenke tekst="ta kontakt med Nav" />
                        {' så vi kan vurdere saken din.'}
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>Varetekt, soning eller forvaring</Accordion.Header>
                    <Accordion.Content>
                        {
                            'I utgangspunktet får du ikke sykepenger når du sitter i varetekt, soner straff eller er under forvaring. Du kan ha rett til sykepenger hvis du jobber mens du soner straff. '
                        }
                        <BeskjedSykepengerLenke tekst="Ta kontakt med Nav" />
                        {' så vi kan vurdere saken din. '}
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
            <BodyLong spacing>
                <Link href="https://www.nav.no/endringer" rel="noopener noreferrer" target="_blank">
                    Les mer om viktigheten av å gi riktige opplysninger
                </Link>
            </BodyLong>
        </>
    )
}

const SkrivTilOssLenke = ({ tekst }: { tekst: string }) => (
    <Link href="https://innboks.nav.no/s/skriv-til-oss?category=Helse" rel="noopener noreferrer" target="_blank">
        {tekst}
    </Link>
)

const BeskjedSykepengerLenke = ({ tekst }: { tekst: string }) => (
    <Link
        href="https://innboks.nav.no/s/beskjed-til-oss?category=Beskjed-sykepenger"
        rel="noopener noreferrer"
        target="_blank"
    >
        {tekst}
    </Link>
)
