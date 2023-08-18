import { BodyLong, Button } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { logEvent } from '../../../../amplitude/amplitude'

function InntektSN() {
    useEffect(() => {
        logEvent('knapp vist', {
            tekst: 'Send inntektsopplysninger',
            component: 'Send inntektsopplysninger knapp',
        })
    }, [])
    return (
        <>
            <BodyLong>
                Som selvstendig næringsdrivende må du sende inntektsopplysninger selv. Søknaden blir ikke behandlet før
                inntektsopplysningene er sendt inn.
            </BodyLong>

            <Button
                iconPosition="right"
                variant="secondary"
                icon={<ExternalLinkIcon aria-hidden />}
                as="a"
                href="https://www.nav.no/fyllut/nav083501"
                className="mb-8 mt-4"
                onClick={() => {
                    logEvent('knapp klikket', {
                        tekst: 'Send inntektsopplysninger',
                        component: 'Send inntektsopplysninger knapp',
                    })
                }}
            >
                Send inn inntektsopplysninger
            </Button>
        </>
    )
}

export default InntektSN
