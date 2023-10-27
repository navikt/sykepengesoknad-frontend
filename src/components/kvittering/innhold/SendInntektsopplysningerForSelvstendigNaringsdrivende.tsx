import { BodyLong, Button, Heading } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { logEvent } from '../../../../amplitude/amplitude'
import GridItems from '../../../grid-items'

export function SendInntektsopplysningerForSelvstendigNæringsdrivende() {
    useEffect(() => {
        logEvent('knapp vist', {
            tekst: 'Send inntektsopplysninger',
            component: 'Send inntektsopplysninger knapp',
        })
    }, [])
    return (
        <>
            <GridItems>
                <Heading size="small" level="3">
                    Innsending av inntektsopplysninger
                </Heading>
            </GridItems>
            <GridItems>
                <>
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
                </>
            </GridItems>
            <div className="col-span-12 mx-4 mb-8 border-b-2 border-b-gray-200 pb-2" />
        </>
    )
}
