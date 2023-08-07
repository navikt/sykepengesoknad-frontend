import { Button, BodyLong } from '@navikt/ds-react'
import React from 'react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { tekst } from '../../../../../utils/tekster'
import { logEvent } from '../../../../amplitude/amplitude'

function InntektSN() {
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
                href={tekst('kvittering.naeringsdrivende.lenke.url')}
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
