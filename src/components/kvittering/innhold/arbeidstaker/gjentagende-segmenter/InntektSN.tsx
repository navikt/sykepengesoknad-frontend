import { BodyLong, Button } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { logEvent } from '../../../../amplitude/amplitude'

export function InntektSN() {
    useEffect(() => {
        logEvent('knapp vist', {
            tekst: 'Send inntektsopplysninger',
            component: 'Send inntektsopplysninger knapp',
        })
    }, [])
    return (
        <>
            <BodyLong spacing>
                Som selvstendig næringsdrivende må du sende inn inntektsopplysninger selv. Søknaden blir ikke behandlet
                før inntektsopplysningene er sendt inn.
            </BodyLong>
            <BodyLong spacing>Du trenger bare å sende inn skjemaet én gang per sykefravær.</BodyLong>
            <BodyLong spacing>
                Har du allerede sendt inn inntektsopplysninger for dette sykefraværet kan du se bort fra denne
                meldingen.
            </BodyLong>

            <Button
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
        </>
    )
}
