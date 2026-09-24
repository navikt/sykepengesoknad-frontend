import { BodyLong, Box, Button, Heading, VStack } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { logEvent } from '../../umami/umami'

export function SendInntektsopplysningerForSelvstendigNæringsdrivende() {
    useEffect(() => {
        logEvent('knapp vist', {
            tekst: 'Send inntektsopplysninger',
            component: 'Send inntektsopplysninger knapp',
        })
    }, [])
    return (
        <>
            <VStack gap="space-16" align="start" className="border-b-2 border-b-ax-neutral-300 pb-2">
                <Box className="mb-6">
                    <Heading size="small" level="3">
                        Innsending av inntektsopplysninger
                    </Heading>
                </Box>
                <BodyLong spacing>
                    Som selvstendig næringsdrivende må du sende inn inntektsopplysninger selv. Søknaden blir ikke
                    behandlet før inntektsopplysningene er sendt inn.
                </BodyLong>
                <BodyLong spacing>Du trenger bare å sende inn skjemaet én gang per sykefravær.</BodyLong>
                <BodyLong spacing>
                    Har du allerede sendt inn inntektsopplysninger for dette sykefraværet kan du se bort fra denne
                    meldingen.
                </BodyLong>
                <Button
                    type="button"
                    iconPosition="right"
                    variant="secondary"
                    icon={<ExternalLinkIcon aria-hidden />}
                    as="a"
                    href="https://www.nav.no/fyllut/nav083501"
                    className="mb-8"
                    onClick={() => {
                        logEvent('knapp klikket', {
                            tekst: 'Send inntektsopplysninger',
                            component: 'Send inntektsopplysninger knapp',
                        })
                    }}
                >
                    Send inntektsopplysninger
                </Button>
            </VStack>
        </>
    )
}
